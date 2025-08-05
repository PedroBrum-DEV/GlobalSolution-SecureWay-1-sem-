// --- Seu código inteiro mantido aqui ---

const chatBox = document.getElementById('chatMessages');
const input = document.getElementById('chatInput');
const form = document.getElementById('chatForm');

const btnPrevisao = document.getElementById('btnPrevisao');
const btnDuvidas = document.getElementById('btnDuvidas');

let esperandoCep = false;
let esperandoDuvida = false;

const duvidasInfo = {
  terremotos: `🌀 <b>Terremoto:</b><br>
    - Mantenha a calma e proteja-se sob móveis resistentes.<br>
    - Evite janelas e objetos que possam cair.<br>
    - Após o tremor, evacue o local com cuidado.<br>
    - Fique atento a réplicas.`,
  tempestades: `⛈️ <b>Tempestades:</b><br>
    - Evite áreas abertas e desligue aparelhos elétricos.<br>
    - Procure abrigo seguro.<br>
    - Não se abrigue em árvores ou áreas alagadas.`,
  ventos_fortes: `🌬️ <b>Ventos Fortes:</b><br>
    - Afaste-se de árvores, postes e objetos soltos.<br>
    - Fique em ambientes internos e seguros.<br>
    - Evite sair de casa se possível.`,
  ciclones: `🌀 <b>Ciclones:</b><br>
    - Mantenha-se informado pelas autoridades.<br>
    - Evacue se ordenado.<br>
    - Prepare um kit de emergência.`,
  tornados: `🌪️ <b>Tornados:</b><br>
    - Procure um abrigo interno, preferencialmente um porão ou cômodo sem janelas.<br>
    - Cubra a cabeça e pescoço.<br>
    - Fique longe de áreas com vidros.`,
  alagamentos: `🌊 <b>Alagamento:</b><br>
    - Não atravesse áreas alagadas a pé ou de carro.<br>
    - Desligue energia elétrica em áreas afetadas.<br>
    - Procure pontos altos e seguros.`,
  deslizamentos: `🏞️ <b>Deslizamento:</b><br>
    - Fique atento a sinais como rachaduras e barulhos estranhos.<br>
    - Evacue a área imediatamente.<br>
    - Siga as rotas de fuga indicadas.`,
  inundações: `🌧️ <b>Inundações:</b><br>
    - Evite contato com a água.<br>
    - Desligue energia e gás.<br>
    - Procure abrigo seguro em áreas elevadas.`,
  como_posso_doar: `❤️ <b>Como posso doar:</b><br>
    - Procure organizações confiáveis como a Defesa Civil ou Cruz Vermelha.<br>
    - Doe itens como água potável, alimentos não perecíveis, roupas, produtos de higiene e limpeza.<br>
    - Verifique pontos de coleta na sua cidade.`,
  como_posso_receber_doações: `🎁 <b>Como posso receber doações:</b><br>
    - Entre em contato com a Defesa Civil local ou CRAS (Centro de Referência de Assistência Social).<br>
    - Informe sua situação e necessidade.<br>
    - Acompanhe comunicados oficiais sobre distribuição de doações.`
};

// --- Dicionário de saudações com sinônimos ---
const saudacoesSinonimos = [
  "bom dia", "boa tarde", "boa noite",
  "oi", "ola", "olá", "ei", "eai", "e aí"
];

// --- Dicionário de agradecimentos com sinônimos ---
const agradecimentosSinonimos = [
  "obrigado", "obrigada", "muito obrigado", "muito obrigada",
  "agradecido", "agradecida", "valeu", "brigado", "brigada",
  "grato", "grata", "thanks", "thank you", "obg"
];

// --- Função para detectar saudação ---
function detectarSaudacao(texto) {
  texto = texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  return saudacoesSinonimos.some(saud => texto.includes(saud));
}

// --- Função para detectar agradecimento ---
function detectarAgradecimento(texto) {
  texto = texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  return agradecimentosSinonimos.some(agr => texto.includes(agr));
}

function adicionarMensagem(texto, tipo) {
  const msg = document.createElement('div');
  msg.classList.add('mensagem', tipo);
  msg.innerHTML = texto;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  aplicarEstiloLinks();
}

function aplicarEstiloLinks() {
  document.querySelectorAll('.mensagem.bot b').forEach(el => {
    if (el.textContent.toLowerCase().includes('voltar ao início')) {
      el.style.backgroundColor = '#28a745';
      el.style.color = 'white';
      el.style.padding = '6px 10px';
      el.style.borderRadius = '6px';
      el.style.cursor = 'pointer';
      el.onclick = () => iniciarChat();
    }
  });
}

function iniciarChat() {
  chatBox.innerHTML = '';
  adicionarMensagem(
    "Olá! Eu sou a Lumina, a inteligência artificial da SecureWay.<br>Escolha uma opção:<br><b>Previsão</b><br><b>Tirar dúvidas de segurança</b>",
    "bot"
  );
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const texto = input.value.trim();
  if (!texto) return;

  adicionarMensagem(texto, 'usuario');
  input.value = '';

  const comando = texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  // Detecta agradecimento
  if (detectarAgradecimento(comando)) {
    adicionarMensagem("😊 De nada! Se precisar, é só chamar. Estou aqui para ajudar!", "bot");
    return;
  }

  // Detecta saudação
  if (detectarSaudacao(comando)) {
    adicionarMensagem("👋 Olá! Como posso ajudar você hoje?", "bot");
    return;
  }

  if (comando === 'voltar ao inicio' || comando === 'reiniciar chat') {
    iniciarChat();
    return;
  }

  if (esperandoCep) {
    esperandoCep = false;
    buscarPrevisao(comando);
  } else if (esperandoDuvida) {
    esperandoDuvida = false;
    responderDuvida(comando);
  } else if (verificarPrevisao(comando)) {
    esperandoCep = true;
    adicionarMensagem("📍 Digite o CEP que deseja consultar (ex: 05717-200):", "bot");
  } else if (verificarDuvidas(comando)) {
    esperandoDuvida = true;
    mostrarTopicosDuvidas();
  } else {
    adicionarMensagem("❓ Não entendi. Digite <b>Previsão</b> ou <b>Tirar dúvidas de segurança</b>.", "bot");
  }
});

// --- Função para verificar se texto é referente a previsão com sinônimos ---
function verificarPrevisao(texto) {
  const termosPrevisao = [
    "previsao", "previsão", "clima", "tempo", "ver o clima",
    "quero ver a previsão", "quero ver o clima", "quero previsão", "quero tempo",
    "ver clima", "ver previsão"
  ];
  return termosPrevisao.some(t => texto.includes(t));
}

// --- Função para verificar se texto é referente a dúvidas com sinônimos ---
function verificarDuvidas(texto) {
  const termosDuvidas = [
    "tirar duvidas", "tirar dúvidas", "duvidas", "dúvidas", "tenho duvidas", "tenho dúvidas",
    "quero tirar duvidas", "quero tirar dúvidas", "quero duvidas", "quero dúvidas", "duvida",
    "duvida de seguranca", "dúvida de segurança", "duvidas de seguranca", "dúvidas de segurança","Preciso de ajuda"
  ];
  return termosDuvidas.some(t => texto.includes(t));
}

async function buscarPrevisao(cep) {
  try {
    const respostaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dadosCep = await respostaCep.json();

    if (dadosCep.erro) {
      adicionarMensagem("❌ CEP não encontrado. Tente novamente.", "bot");
      return;
    }

    const { localidade, uf, bairro } = dadosCep;
    const endereco = `${bairro || ''}, ${localidade}-${uf}`.trim();

    const respostaClima = await fetch(`https://wttr.in/${localidade}?format=j1`);
    const dadosClima = await respostaClima.json();

    if (!dadosClima.current_condition) {
      adicionarMensagem("❌ Não foi possível obter o clima dessa região.", "bot");
      return;
    }

    const clima = dadosClima.current_condition[0].weatherDesc[0].value;
    const temperatura = dadosClima.current_condition[0].temp_C;
    const ventos = dadosClima.current_condition[0].windspeedKmph;
    const chanceChuva = dadosClima.weather[0].hourly[0].chanceofrain || 0;

    const linkAbrigo = `https://www.google.com/maps/search/abrigo+em+${cep}`;

    adicionarMensagem(
      `<b>📍 Local:</b> ${endereco}<br>
       <b>🌤️ Clima:</b> ${clima}<br>
       <b>🌡️ Temperatura:</b> ${temperatura}°C<br>
       <b>💨 Velocidade do vento:</b> ${ventos} km/h<br>
       <b>🌧️ Chance de chuva:</b> ${chanceChuva}%<br><br>
       🛟 <a href="${linkAbrigo}" target="_blank">Ver abrigo mais próximo no mapa</a><br><br>
       🔁 <b>Voltar ao início</b>`,
      "bot"
    );

    if (chanceChuva > 60 || ventos > 50) {
      adicionarMensagem("⚠️ <b>ALERTA:</b> Condições de risco detectadas. Veja as <b>Tirar dúvidas de segurança</b> digitando <b>Tirar dúvidas de segurança</b>.", "bot");
    }

  } catch (e) {
    adicionarMensagem("❌ Erro ao buscar os dados. Verifique o CEP e tente novamente.", "bot");
  }
}

function mostrarTopicosDuvidas() {
  const lista = Object.keys(duvidasInfo)
    .map(t => `<li><b>${t.charAt(0).toUpperCase() + t.slice(1)}</b></li>`)
    .join('');
  adicionarMensagem(
    `📝 <b>Sobre quais temas você quer tirar dúvidas?</b><br>Digite um dos tópicos abaixo:<br><ul>${lista}</ul><br><br>
    🔁 <b>Voltar ao início</b>`,
    "bot"
  );
}

function responderDuvida(duvida) {
  // Tratamento para sinônimos e plural
  duvida = duvida.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  
  // Normaliza plural para singular simples
  if (duvida.endsWith('s')) {
    duvida = duvida.slice(0, -1);
  }
  
  // Procura por chaves aproximadas no objeto
  let chaveEncontrada = null;
  for (const chave in duvidasInfo) {
    const chaveNormalizada = chave.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    if (duvida === chaveNormalizada || duvida.includes(chaveNormalizada) || chaveNormalizada.includes(duvida)) {
      chaveEncontrada = chave;
      break;
    }
  }
  
  if (chaveEncontrada) {
    adicionarMensagem(`${duvidasInfo[chaveEncontrada]}<br><br>🔁 <b>Voltar ao início</b>`, "bot");
  } else {
    adicionarMensagem("❓ Desculpe, não tenho informações sobre esse tema. Digite novamente uma das opções.", "bot");
    esperandoDuvida = true;
  }
}

// --- NOVO: Botões fixos clicáveis acima do input ---

btnPrevisao.onclick = () => {
  if (esperandoCep || esperandoDuvida) return; // Evita clicar no meio de um fluxo
  input.value = 'Previsão';
  form.dispatchEvent(new Event('submit'));
};

btnDuvidas.onclick = () => {
  if (esperandoCep || esperandoDuvida) return;
  input.value = 'Tirar dúvidas de segurança';
  form.dispatchEvent(new Event('submit'));
};

iniciarChat();  
