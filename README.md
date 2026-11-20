# PlaniEH · Planejamentos Lúdicos da Educação Infantil

App web para gerar **planejamentos mensais da Educação Infantil** (Grupos 1, 2 e 3) a partir do
mês selecionado e, opcionalmente, de um calendário escolar anexado (**PDF, imagem, TXT ou MD**).
A saída vem como tabela Markdown, exibida por padrão no modo **Renderizado**.

## Como funciona

- Frontend estático (`index.html`, `assets/`).
- Backend em Netlify Functions:
  - `generate` — monta o pedido, aplica o **System Prompt Permanente** (guardado só no servidor)
    e chama o modelo escolhido via **Google Gemini** (`GEMINI_API_KEY`), com reserva automática
    pela **OpenRouter** (`OPENROUTER_API_KEY`).
  - `system-prompt` — leitura/edição/restauração do System Prompt Permanente, protegida por senha
    conferida no servidor contra `SENHA_PROMPT`. A senha nunca aparece no frontend.
  - O prompt padrão (regras de formato + eixos/códigos/objetivos BNCC dos 4 bimestres) vive em
    `netlify/functions/_prompto.js` e só é acessível pelo servidor.
- Tema **Claro / Escuro / Sistema** com preferência salva no navegador.
- O anexo do calendário é **opcional**: sem anexo, o plano é gerado só pelo mês e grupo.

## Deploy no Netlify

1. Publique este repositório no Netlify (não é necessário build; `publish` já aponta para a raiz).
2. Em **Site settings → Environment variables**, cadastre:
   - `GEMINI_API_KEY`
   - `OPENROUTER_API_KEY`
   - `SENHA_PROMPT`
3. Netlify Blobs (usado para salvar o prompt permanente editado) funciona automaticamente em sites novas.
4. Opcional, para uso local: copie `.env.exemplo` para `.env` e rode com a CLI do Netlify
   (`netlify dev`), que injeta as variáveis do `.env` nas funções.

## Modelos disponíveis no seletor

`gemini-flash-latest` · `gemini-flash-lite-latest` **(padrão)** · `gemini-3-flash-preview` ·
`gemini-3.1-flash-lite` · `gemini-3.5-flash` · `gemini-3.6-flash` · `gemini-3.7-flash` ·
`gemini-3.8-flash` · `gemini-4-hydrogen`

## Estrutura

```
index.html                     interface (tema, upload, abas, modal protegido)
assets/styles.css              estilos (temas claro/escuro via [tema])
assets/app.js                  lógica (tema, arquivos, renderizador de tabela, geração)
netlify/functions/generate.js  chamada ao modelo (Gemini + reserva OpenRouter)
netlify/functions/system-prompt.js  leitura/salvamento/restauração protegido por senha
netlify/functions/_prompt-store.js  Netlify Blobs (prompt permanente) + senha
netlify/functions/_prompto.js  prompt padrão (4 bimestres BNCC)
.env.exemplo                   modelo de variáveis de ambiente
```
