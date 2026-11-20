// Lê ou salva o System Prompt Permanente. A senha NUNCA reside no frontend:
// é conferida aqui contra a variável de ambiente SENHA_PROMPT.
const { lerPrompt, salvarPrompt, restaurarPrompt, compararSenha } = require('./_prompt-store.js');

const json = (code, obj) => ({
  statusCode: code,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  body: JSON.stringify(obj)
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { erro: 'Método não permitido.' });
  }

  let dados;
  try {
    dados = JSON.parse(event.body || '{}');
  } catch (e) {
    return json(400, { erro: 'Requisição inválida.' });
  }

  const senhaEnv = process.env.SENHA_PROMPT;
  if (!senhaEnv) {
    return json(500, { erro: 'A variável de ambiente SENHA_PROMPT não está configurada no Netlify.' });
  }
  if (!compararSenha(dados.senha, senhaEnv)) {
    return json(401, { erro: 'Senha incorreta.' });
  }

  try {
    if (dados.acao === 'ler') {
      const prompt = await lerPrompt();
      return json(200, { prompt });
    }
    if (dados.acao === 'salvar') {
      if (typeof dados.prompt !== 'string' || dados.prompt.trim().length < 40) {
        return json(400, { erro: 'O System Prompt Permanente precisa ter ao menos 40 caracteres.' });
      }
      if (dados.prompt.length > 200000) {
        return json(400, { erro: 'O System Prompt Permanente excede o tamanho máximo (200.000 caracteres).' });
      }
      await salvarPrompt(dados.prompt);
      return json(200, { ok: true });
    }
    if (dados.acao === 'restaurar') {
      const padrao = await restaurarPrompt();
      return json(200, { ok: true, prompt: padrao });
    }
    return json(400, { erro: 'Ação desconhecida.' });
  } catch (e) {
    return json(500, { erro: e.message || 'Falha interna.' });
  }
};
