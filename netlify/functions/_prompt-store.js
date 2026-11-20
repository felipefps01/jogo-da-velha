// Armazena o System Prompt Permanente editável (Netlify Blobs) com fallback em memória.
let cacheABLE = null;
let blobsDisponivel = null;
let getStoreFn = null;

function migrar() {
  if (blobsDisponivel !== null) return Promise.resolve(blobsDisponivel);
  return Promise.resolve()
    .then(() => {
      getStoreFn = require('@netlify/blobs').getStore;
      blobsDisponivel = true;
    })
    .catch(() => {
      blobsDisponivel = false;
    });
}

async function loja() {
  await migrar();
  if (!blobsDisponivel) return null;
  try {
    return getStoreFn({ name: 'plani-config', consistency: 'strong' });
  } catch (e) {
    blobsDisponivel = false;
    return null;
  }
}

async function lerPromptPadrao() {
  if (cacheABLE) return cacheABLE;
  const { DEFAULT_PROMPT } = require('./_prompto.js');
  return DEFAULT_PROMPT;
}

async function lerPrompt() {
  const store = await loja();
  if (store) {
    try {
      const salvo = await store.get('system-prompt');
      if (salvo && typeof salvo === 'string' && salvo.trim()) {
        cacheABLE = salvo;
        return salvo;
      }
    } catch (e) {
      /* segue para o padrão */
    }
  }
  return lerPromptPadrao();
}

async function salvarPrompt(texto) {
  cacheABLE = texto;
  const store = await loja();
  if (!store) {
    const err = new Error('Armazenamento persistente indisponível neste ambiente. Publique no Netlify (com Blobs ativado) para salvar permanentemente.');
    err.codigo = 'SEM_ARMAZENAMENTO';
    throw err;
  }
  await store.setJSON('system-prompt-meta', { atualizadoEm: new Date().toISOString() });
  await store.set('system-prompt', texto);
  return true;
}

async function restaurarPrompt() {
  cacheABLE = null;
  const store = await loja();
  if (store) {
    try { await store.remove('system-prompt'); } catch (e) { /* já ausente */ }
  }
  return lerPromptPadrao();
}

function compararSenha(a, b) {
  const x = String(a || '');
  const y = String(b || '');
  if (x.length !== y.length) return false;
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x.charCodeAt(i) ^ y.charCodeAt(i);
  return diff === 0 && x.length > 0;
}

module.exports = { lerPrompt, salvarPrompt, restaurarPrompt, compararSenha };
