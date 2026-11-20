/* PlaniEH — lógica da interface */
(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  /* ---------- Tema: Claro / Escuro / Sistema ---------- */
  const raiz = document.documentElement;
  const radiosTema = Array.from(document.querySelectorAll('input[name="tema"]'));
  const CHAVE_TEMA = "plani.tema";

  const aplicarTema = (preferencia) => {
    const escuraSistema = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const efetiva = preferencia === "sistema" ? (escuraSistema ? "escuro" : "claro") : preferencia;
    raiz.setAttribute("tema", efetiva);
  };

  const iniciarTema = () => {
    let pref = localStorage.getItem(CHAVE_TEMA) || "sistema";
    if (!radiosTema.some((r) => r.value === pref)) pref = "sistema";
    const radio = radiosTema.find((r) => r.value === pref);
    if (radio) radio.checked = true;
    aplicarTema(pref);
    radiosTema.forEach((r) =>
      r.addEventListener("change", () => {
        if (!r.checked) return;
        localStorage.setItem(CHAVE_TEMA, r.value);
        aplicarTema(r.value);
      })
    );
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      const atual = localStorage.getItem(CHAVE_TEMA) || "sistema";
      if (atual === "sistema") aplicarTema("sistema");
    });
  };

  /* ---------- Toast ---------- */
  let timerToast = null;
  const toast = (mensagem) => {
    const el = $("toast");
    el.textContent = mensagem;
    el.hidden = false;
    clearTimeout(timerToast);
    timerToast = setTimeout(() => {
      el.classList.add("sair");
      setTimeout(() => { el.hidden = true; el.classList.remove("sair"); }, 280);
    }, 2600);
  };

  /* ---------- Arquivos anexos ---------- */
  let arquivos = [];
  const FORMATOS = {
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".txt": "text/plain",
    ".md": "text/markdown",
    ".markdown": "text/markdown"
  };

  const extDe = (nome) => {
    const ponto = nome.toLowerCase().lastIndexOf(".");
    return ponto === -1 ? "" : nome.slice(ponto);
  };

  const iconeDe = (ext) =>
    ext === ".pdf" ? "📕" : ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".webp" || ext === ".gif" ? "🖼️" : ext === ".txt" ? "📄" : "📝";

  const desenharArquivos = () => {
    const ul = $("lista-arquivos");
    ul.innerHTML = "";
    arquivos.forEach((arq, indice) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = `${arq.icone} ${arq.nome}`;
      const x = document.createElement("button");
      x.className = "ficha-x";
      x.type = "button";
      x.textContent = "×";
      x.setAttribute("aria-label", `Remover ${arq.nome}`);
      x.addEventListener("click", () => { arquivos.splice(indice, 1); desenharArquivos(); });
      li.append(span, x);
      ul.appendChild(li);
    });
  };

  const lerArquivo = (arquivo) =>
    new Promise((resolver) => {
      const ext = extDe(arquivo.name);
      const tipo = FORMATOS[ext] || arquivo.type || "text/plain";
      if (tipo.startsWith("text/")) {
        const fr = new FileReader();
        fr.onload = () => resolver({ nome: arquivo.name, tipo, texto: String(fr.result || "") });
        fr.onerror = () => resolver(null);
        fr.readAsText(arquivo);
      } else {
        const fr = new FileReader();
        fr.onload = () => {
          const dataurl = String(fr.result || "");
          resolver({ nome: arquivo.name, tipo, dados: dataurl.slice(dataurl.indexOf(",") + 1) });
        };
        fr.onerror = () => resolver(null);
        fr.readAsDataURL(arquivo);
      }
    });

  const adicionarArquivos = async (lista) => {
    for (const arquivo of Array.from(lista || [])) {
      const ext = extDe(arquivo.name);
      if (!FORMATOS[ext]) { toast(`Formato não suportado: ${arquivo.name}`); continue; }
      if (arquivos.length >= 4) { toast("No máximo 4 arquivos por geração."); break; }
      const lido = await lerArquivo(arquivo);
      if (lido) { lido.icone = iconeDe(ext); arquivos.push(lido); desenharArquivos(); }
    }
  };

  const zona = $("zona-arquivo");
  const inputArquivo = $("input-arquivo");
  zona.addEventListener("click", () => inputArquivo.click());
  zona.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inputArquivo.click(); }
  });
  inputArquivo.addEventListener("change", () => { adicionarArquivos(inputArquivo.files); inputArquivo.value = ""; });
  ["dragenter", "dragover"].forEach((ev) =>
    zona.addEventListener(ev, (e) => { e.preventDefault(); zona.classList.add("arrastando"); })
  );
  ["dragleave", "drop"].forEach((ev) =>
    zona.addEventListener(ev, (e) => { e.preventDefault(); zona.classList.remove("arrastando"); })
  );
  zona.addEventListener("drop", (e) => adicionarArquivos(e.dataTransfer && e.dataTransfer.files));

  /* ---------- Mini renderizador de markdown (tabela + negrito/itálico/quebras) ---------- */
  const escapar = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const linhaInline = (t) =>
    escapar(t)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[\s|*(])\*(?!\s)([^*]+?)\*(?=[\s|).,;:]|$)/g, "$1<em>$2</em>")
      .replace(/&lt;br\s*\/?&gt;/gi, "<br/>");

  const dividirLinhaTabela = (linha) =>
    linha.replace(/^\s*\|/, "").replace(/\|\s*$/, "").split(/\s*\|\s*/);

  const renderizarMarkdown = (markdown) => {
    const linhas = String(markdown || "").replace(/\r/g, "").split("\n");
    const idxCab = linhas.findIndex((l) => /^\s*\|?\s*DATA\s*\|/i.test(l));
    if (idxCab === -1) return null;

    const cab = dividirLinhaTabela(linhas[idxCab]);
    let i = idxCab + 1;
    if (/^\s*\|?[\s:|-]+\|?\s*$/.test(linhas[i] || "")) i++;

    const corpo = [];
    while (i < linhas.length && linhas[i].includes("|") && linhas[i].trim() !== "") {
      corpo.push(dividirLinhaTabela(linhas[i]));
      i++;
    }
    if (!corpo.length) return null;

    const th = cab.map((c) => `<th>${linhaInline(c)}</th>`).join("");
    const trs = corpo
      .map((celulas) => {
        const tds = cab
          .map((_, col) => `<td>${linhaInline((celulas[col] || "").trim())}</td>`)
          .join("");
        return `<tr>${tds}</tr>`;
      })
      .join("");

    return `<div class="plano-tabela-wrap"><table class="plano"><thead><tr>${th}</tr></thead><tbody>${trs}</tbody></table></div>`;
  };

  /* ---------- Saída: abas (Renderizado é o padrão) ---------- */
  let markdownAtual = "";

  const mostrarAba = (qual) => {
    const render = qual === "render";
    $("aba-render").classList.toggle("ativa", render);
    $("aba-markdown").classList.toggle("ativa", !render);
    $("aba-render").setAttribute("aria-selected", String(render));
    $("aba-markdown").setAttribute("aria-selected", String(!render));

    const temTabela = !!renderizarMarkdown(markdownAtual);
    $("saida-vazia").classList.add("oculto");
    $("saida-render").classList.toggle("oculto", !(render && temTabela));
    $("saida-markdown").classList.toggle("oculto", render ? temTabela : false);
    $("saida-acoes").hidden = !markdownAtual;
  };

  $("aba-render").addEventListener("click", () => mostrarAba("render"));
  $("aba-markdown").addEventListener("click", () => mostrarAba("markdown"));

  const definirSaida = (markdown) => {
    markdownAtual = String(markdown || "").trim();
    const html = renderizarMarkdown(markdownAtual);
    $("saida-render").innerHTML =
      html || "<p class='modal-nota'>A resposta não contém tabela reconhecível — veja na aba Markdown.</p>";
    $("saida-markdown").textContent = markdownAtual;
    mostrarAba("render");
  };

  $("btn-copiar").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(markdownAtual);
      toast("Markdown copiado! 📋");
    } catch (e) {
      toast("Não foi possível copiar aqui.");
    }
  });

  $("btn-baixar").addEventListener("click", () => {
    const mes = ($("sel-mes").value || "planejamento").toLowerCase();
    const blob = new Blob([markdownAtual], { type: "text/markdown;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `planejamento-${mes}.md`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  /* ---------- Gerar ---------- */
  const erroEm = (seletor, mensagem) => {
    const el = $(seletor);
    el.textContent = mensagem;
    el.hidden = false;
  };

  $("btn-gerar").addEventListener("click", async () => {
    $("aviso-erro").hidden = true;
    const mes = $("sel-mes").value;
    if (!mes) {
      erroEm("aviso-erro", "Escolha o mês do planejamento antes de gerar. 😊");
      return;
    }

    const btn = $("btn-gerar");
    btn.disabled = true;
    btn.querySelector(".btn-rotulo").hidden = true;
    btn.querySelector(".btn-carregando").hidden = false;

    try {
      const resposta = await fetch("/.netlify/functions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mes,
          grupo: $("sel-grupo").value,
          modelo: $("sel-modelo").value,
          observacoes: $("txt-obs").value,
          arquivos
        })
      });
      const dados = await resposta.json().catch(() => ({}));
      if (!resposta.ok) throw new Error(dados.erro || `Erro ${resposta.status} ao gerar.`);
      definirSaida(dados.texto || "");
      toast("Planejamento pronto! ✨");
    } catch (e) {
      erroEm("aviso-erro", e.message || "Falha ao gerar o planejamento.");
    } finally {
      btn.disabled = false;
      btn.querySelector(".btn-rotulo").hidden = false;
      btn.querySelector(".btn-carregando").hidden = true;
    }
  });

  /* ---------- Modal do System Prompt Permanente ---------- */
  const fundo = $("modal-fundo");
  const abrirModal = () => {
    fundo.classList.remove("oculto");
    $("etapa-senha").classList.remove("oculto");
    $("etapa-editor").classList.add("oculto");
    $("erro-senha").hidden = true;
    $("inp-senha").value = "";
    setTimeout(() => $("inp-senha").focus(), 60);
  };
  const fecharModal = () => fundo.classList.add("oculto");

  $("btn-config").addEventListener("click", abrirModal);
  $("btn-fechar-modal").addEventListener("click", fecharModal);
  fundo.addEventListener("click", (e) => { if (e.target === fundo) fecharModal(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !fundo.classList.contains("oculto")) fecharModal();
  });

  const pedirPrompt = async (senha, acao, prompt) => {
    const resposta = await fetch("/.netlify/functions/system-prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ acao, senha, prompt })
    });
    const dados = await resposta.json().catch(() => ({}));
    return { ok: resposta.ok, dados };
  };

  $("btn-entrar").addEventListener("click", async () => {
    $("erro-senha").hidden = true;
    const senha = $("inp-senha").value;
    if (!senha) { erroEm("erro-senha", "Digite a senha."); return; }
    const { ok, dados } = await pedirPrompt(senha, "ler");
    if (!ok) { erroEm("erro-senha", dados.erro || "Senha incorreta."); return; }
    $("txt-prompt").value = dados.prompt || "";
    $("etapa-senha").classList.add("oculto");
    $("etapa-editor").classList.remove("oculto");
  });
  $("inp-senha").addEventListener("keydown", (e) => {
    if (e.key === "Enter") $("btn-entrar").click();
  });

  $("btn-salvar-prompt").addEventListener("click", async () => {
    $("aviso-prompt").hidden = true;
    const { ok, dados } = await pedirPrompt($("inp-senha").value, "salvar", $("txt-prompt").value);
    if (!ok) { erroEm("aviso-prompt", dados.erro || "Não foi possível salvar."); return; }
    toast("Prompt permanente salvo. 💾");
    fecharModal();
  });

  $("btn-restaurar").addEventListener("click", async () => {
    $("aviso-prompt").hidden = true;
    const { ok, dados } = await pedirPrompt($("inp-senha").value, "restaurar");
    if (!ok) { erroEm("aviso-prompt", dados.erro || "Não foi possível restaurar."); return; }
    const leitura = await pedirPrompt($("inp-senha").value, "ler");
    $("txt-prompt").value = (leitura.dados && leitura.dados.prompt) || "";
    toast("Restaurado para o padrão. ↺");
  });

  /* ---------- Início ---------- */
  iniciarTema();
})();
