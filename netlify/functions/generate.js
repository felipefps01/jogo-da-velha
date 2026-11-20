// Gera o planejamento mensal. Orquestra o modelo escolhido (Google Gemini ou OpenRouter como reserva).
const { lerPrompt } = require('./_prompt-store.js');

const json = (code, obj) => ({
  statusCode: code,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  body: JSON.stringify(obj)
});

const MODELOS_PERMITIDOS = new Set([
  'gemini-flash-latest',
  'gemini-flash-lite-latest',
  'gemini-3-flash-preview',
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.6-flash',
  'gemini-3.7-flash',
  'gemini-3.8-flash',
  'gemini-4-hydrogen'
]);

const PREFIXO_GRUPO = { '1': 'EI01', '2': 'EI02', '3': 'EI03' };
const NOME_GRUPO = { '1': 'GRUPO 1 (bebês)', '2': 'GRUPO 2 (crianças bem pequenas)', '3': 'GRUPO 3 (crianças pequenas)' };

function montarInstrucaoUsuario(mes, grupo, observacoes) {
  const num = String(grupo || '3');
  const prefixo = PREFIXO_GRUPO[num] || 'EI03';
  const linhas = [
    `Solicitação de geração de planejamento mensal.`,
    `MÊS SOLICITADO: ${mes}. Identifique o bimestre correspondente a esse mês e use exclusivamente os eixos temáticos, códigos e objetivos do bimestre correspondente descritos no system prompt.`,
    `GRUPO SELECIONADO: ${NOME_GRUPO[num] || NOME_GRUPO['3']}. Os códigos BNCC utilizados devem ter o prefixo ${prefixo} (adequando os códigos listados a esse grupo quando necessário).`,
    `Gere o planejamento completo do mês, dia a dia (todas as datas úteis do mês), seguindo à risca o modelo de tabela markdown.`
  ];
  if (observacoes && observacoes.trim()) {
    linhas.push(`OBSERVAÇÕES ADICIONAIS DO USUÁRIO: ${observacoes.trim()}`);
  }
  return linhas.join('\n');
}

function partesDeArquivos(arquivos) {
  const partes = [];
  for (const arq of arquivos || []) {
    if (!arq) continue;
    const tipo = String(arq.tipo || '').toLowerCase();
    if (arq.texto) {
      partes.push({
        text: `CALENDÁRIO ANEXADO (${arq.nome}) — conteúdo:\n\n${String(arq.texto).slice(0, 300000)}`
      });
    } else if (arq.dados && arq.dados.length < 15000000) {
      partes.push({ text: `CALENDÁRIO ANEXADO (${arq.nome}) — arquivo ${tipo} em anexo. Extraia as informações relevantes para o planejamento (feriados, recessos, eventos, semanas letivas).` });
      partes.push({ inline_data: { mime_type: tipo, data: arq.dados } });
    }
  }
  return partes;
}

async function chamarGemini(modelo, sistema, partesUsuario) {
  const chave = process.env.GEMINI_API_KEY;
  if (!chave) return null;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelo)}:generateContent`;
  const resposta = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-goog-api-key': chave },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: sistema }] },
      contents: [{ role: 'user', parts: partesUsuario }],
      generationConfig: { temperature: 0.65, maxOutputTokens: 16384 }
    })
  });
  if (!resposta.ok) {
    const detalhe = await resposta.text().catch(() => '');
    throw new Error(`Google (${resposta.status}): ${detalhe.slice(0, 400)}`);
  }
  const resultado = await resposta.json();
  const texto = (resultado.candidates?.[0]?.content?.parts || [])
    .map((p) => p.text || '')
    .join('')
    .trim();
  if (!texto) throw new Error('O modelo respondeu vazio. Tente novamente ou troque o modelo.');
  return texto;
}

async function chamarOpenRouter(modelo, sistema, partesUsuario) {
  const chave = process.env.OPENROUTER_API_KEY;
  if (!chave) return null;
  const conteudo = [];
  for (const parte of partesUsuario) {
    if (parte.inline_data) {
      if (String(parte.inline_data.mime_type).startsWith('image/')) {
        conteudo.push({ type: 'image_url', image_url: { url: `data:${parte.inline_data.mime_type};base64,${parte.inline_data.data}` } });
      } else {
        conteudo.push({ type: 'file', file: { filename: 'calendario.pdf', file_data: `data:application/pdf;base64,${parte.inline_data.data}` } });
      }
    } else if (parte.text) {
      conteudo.push({ type: 'text', text: parte.text });
    }
  }
  const resposta = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${chave}`,
      'HTTP-Referer': 'https://planilhafeliz.netlify.app',
      'X-Title': 'PlaniEH'
    },
    body: JSON.stringify({
      model: `google/${modelo}`,
      messages: [
        { role: 'system', content: sistema },
        { role: 'user', content: conteudo }
      ],
      max_tokens: 16384,
      temperature: 0.65
    })
  });
  if (!resposta.ok) {
    const detalhe = await resposta.text().catch(() => '');
    throw new Error(`OpenRouter (${resposta.status}): ${detalhe.slice(0, 400)}`);
  }
  const resultado = await resposta.json();
  const texto = (resultado.choices?.[0]?.message?.content || '').trim();
  if (!texto) throw new Error('O modelo respondeu vazio. Tente novamente ou troque o modelo.');
  return texto;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { erro: 'Método não permitido.' });

  let dados;
  try {
    dados = JSON.parse(event.body || '{}');
  } catch (e) {
    return json(400, { erro: 'Requisição inválida.' });
  }

  const mes = String(dados.mes || '').trim();
  if (!mes) return json(400, { erro: 'Informe o mês do planejamento.' });

  const modelo = MODELOS_PERMITIDOS.has(dados.modelo) ? dados.modelo : 'gemini-flash-lite-latest';

  if (!process.env.GEMINI_API_KEY && !process.env.OPENROUTER_API_KEY) {
    return json(500, { erro: 'Nenhuma chave de modelo configurada. Defina GEMINI_API_KEY ou OPENROUTER_API_KEY nas variáveis de ambiente do Netlify.' });
  }

  let sistema;
  try {
    sistema = await lerPrompt();
  } catch (e) {
    return json(500, { erro: 'Não foi possível carregar o System Prompt Permanente.' });
  }

  const partes = [...partesDeArquivos(dados.arquivos), { text: montarInstrucaoUsuario(mes, dados.grupo, dados.observacoes) }];

  try {
    let texto = await chamarGemini(modelo, sistema, partes);
    if (!texto) texto = await chamarOpenRouter(modelo, sistema, partes);
    if (!texto) return json(500, { erro: 'Nenhuma chave de modelo configurada. Defina GEMINI_API_KEY ou OPENROUTER_API_KEY no Netlify.' });
    return json(200, { texto, modelo });
  } catch (e) {
    try {
      const texto = await chamarOpenRouter(modelo, sistema, partes);
      if (texto) return json(200, { texto, modelo, via: 'openrouter' });
    } catch (e2) {
      return json(502, { erro: `Falha na geração. ${e.message} | Reserva: ${e2.message}` });
    }
    return json(502, { erro: `Falha na geração. ${e.message}` });
  }
};
