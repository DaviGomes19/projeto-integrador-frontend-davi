const turmas = [
  { id: 1, nome: "Musculação", horario: "manha", vagas: 40, inscritos: 40, reservada: false },
  { id: 2, nome: "Musculação", horario: "noite", vagas: 40, inscritos: 36, reservada: false },
  { id: 3, nome: "Funcional", horario: "tarde", vagas: 20, inscritos: 12, reservada: false },
  { id: 4, nome: "Funcional", horario: "noite", vagas: 20, inscritos: 18, reservada: false },
  { id: 5, nome: "Yoga", horario: "manha", vagas: 15, inscritos: 5, reservada: false },
  { id: 6, nome: "Yoga", horario: "noite", vagas: 15, inscritos: 14, reservada: false }
];

function calcularVagasRestantes(vagas, inscritos = 0) {
  const restantes = vagas - inscritos;

  if (restantes < 0) {
    return 0;
  }

  return restantes;
}

function classificarVagas(restantes) {
  if (restantes === 0) {
    return "esgotado";
  } else if (restantes <= 5) {
    return "ultimas";
  } else {
    return "disponivel";
  }
}

function formatarHorario(horario) {
  switch (horario) {
    case "manha":
      return "Manhã";
    case "tarde":
      return "Tarde";
    case "noite":
      return "Noite";
    default:
      return "Horário a consultar";
  }
}

function formatarRotulo(faixa, restantes) {
  switch (faixa) {
    case "esgotado":
      return "Esgotado";
    case "ultimas":
      return restantes === 1 ? "Última vaga" : `Últimas ${restantes} vagas`;
    default:
      return `${restantes} vagas disponíveis`;
  }
}

function processarTurmas(lista) {
  return lista.map((turma) => {
    const restantes = calcularVagasRestantes(turma.vagas, turma.inscritos);

    return {
      id: turma.id,
      nome: turma.nome,
      horario: turma.horario,
      vagas: turma.vagas,
      inscritos: turma.inscritos,
      reservada: turma.reservada,
      restantes: restantes,
      faixa: classificarVagas(restantes)
    };
  });
}

function filtrarTurmasComVagas(lista) {
  return lista.filter((turma) => turma.faixa !== "esgotado");
}

function filtrarPorNome(lista, texto) {
  const busca = texto.trim().toLowerCase();

  return lista.filter((turma) => turma.nome.toLowerCase().includes(busca));
}

function somarVagasLivres(lista) {
  return lista.reduce((total, turma) => total + turma.restantes, 0);
}

function acharTurmaComMaisVagas(lista) {
  return lista.reduce((melhor, turma) => {
    return turma.restantes > melhor.restantes ? turma : melhor;
  }, lista[0]);
}

function gerarNovoId(lista) {
  const maiorId = lista.reduce((maior, turma) => {
    return turma.id > maior ? turma.id : maior;
  }, 0);

  return maiorId + 1;
}

function criarCartaoTurma(turma) {
  const cartao = document.createElement("article");
  cartao.classList.add("turma", turma.faixa);

  const titulo = document.createElement("h3");
  titulo.textContent = `${turma.nome} - ${formatarHorario(turma.horario)}`;

  const detalhe = document.createElement("p");
  detalhe.textContent = `${turma.inscritos} inscritos de ${turma.vagas} vagas`;

  const rotulo = document.createElement("p");
  rotulo.classList.add("rotulo");
  rotulo.textContent = formatarRotulo(turma.faixa, turma.restantes);

  const botao = document.createElement("button");
  botao.type = "button";
  botao.textContent = "Reservar vaga";
  botao.dataset.acao = "reservar";
  botao.dataset.id = turma.id;
  botao.setAttribute("aria-pressed", String(turma.reservada));
  botao.disabled = turma.restantes === 0 && !turma.reservada;

  cartao.append(titulo, detalhe, rotulo, botao);

  return cartao;
}

function criarResumo(totalVagas, quantidadeComVagas, turmaMaisVagas, exibidas, totalTurmas) {
  const nomeTurma = `${turmaMaisVagas.nome} (${formatarHorario(turmaMaisVagas.horario)})`;

  return `Vagas livres no total: ${totalVagas}. Turmas com vagas: ${quantidadeComVagas}. Mais vagas: ${nomeTurma}, com ${turmaMaisVagas.restantes}. Mostrando ${exibidas} de ${totalTurmas} turmas.`;
}

function mostrarResumo(texto) {
  const resumo = document.querySelector("#resumo");

  if (resumo === null) {
    console.warn("O parágrafo #resumo não foi encontrado no HTML.");
    return;
  }

  resumo.textContent = texto;
}

function desenhar() {
  const lista = document.querySelector("#lista");
  const busca = document.querySelector("#busca");
  const botaoFiltro = document.querySelector("#botaoSoComVagas");

  if (lista === null || busca === null || botaoFiltro === null) {
    console.warn("A lista, a busca ou o botão de filtro não foram encontrados no HTML.");
    return;
  }

  const somenteComVagas = botaoFiltro.getAttribute("aria-pressed") === "true";

  const turmasProcessadas = processarTurmas(turmas);
  const turmasComVagas = filtrarTurmasComVagas(turmasProcessadas);
  const turmaMaisVagas = acharTurmaComMaisVagas(turmasProcessadas);

  let turmasVisiveis = filtrarPorNome(turmasProcessadas, busca.value);

  if (somenteComVagas) {
    turmasVisiveis = filtrarTurmasComVagas(turmasVisiveis);
  }

  lista.replaceChildren();

  if (turmasVisiveis.length === 0) {
    const aviso = document.createElement("p");
    aviso.textContent = "Nenhuma turma encontrada.";
    lista.append(aviso);
  }

  for (const turma of turmasVisiveis) {
    lista.append(criarCartaoTurma(turma));
  }

  mostrarResumo(criarResumo(
    somarVagasLivres(turmasProcessadas),
    turmasComVagas.length,
    turmaMaisVagas,
    turmasVisiveis.length,
    turmasProcessadas.length
  ));
}

function alternarReserva(id) {
  const turma = turmas.find((item) => item.id === id);

  if (turma === undefined) {
    return;
  }

  if (turma.reservada) {
    turma.inscritos = turma.inscritos - 1;
    turma.reservada = false;
  } else if (turma.inscritos < turma.vagas) {
    turma.inscritos = turma.inscritos + 1;
    turma.reservada = true;
  }
}

function tratarCliqueNaLista(evento) {
  const botao = evento.target.closest("button[data-acao]");

  if (botao === null) {
    return;
  }

  const id = Number(botao.dataset.id);

  if (botao.dataset.acao === "reservar") {
    alternarReserva(id);
  }

  desenhar();

  const novoBotao = document.querySelector(`#lista button[data-id="${id}"]`);

  if (novoBotao !== null) {
    novoBotao.focus();
  }
}

function tratarBusca() {
  desenhar();
}

function tratarCliqueSoComVagas(evento) {
  const botao = evento.currentTarget;
  const ativo = botao.getAttribute("aria-pressed") === "true";

  botao.setAttribute("aria-pressed", String(!ativo));
  desenhar();
}

function tratarEnvioNovaTurma(evento) {
  evento.preventDefault();

  const formulario = evento.currentTarget;
  const campoNome = formulario.querySelector("#novaTurmaNome");
  const campoHorario = formulario.querySelector("#novaTurmaHorario");
  const campoVagas = formulario.querySelector("#novaTurmaVagas");

  const nome = campoNome.value.trim();

  if (nome === "") {
    campoNome.focus();
    return;
  }

  turmas.push({
    id: gerarNovoId(turmas),
    nome: nome,
    horario: campoHorario.value,
    vagas: Number(campoVagas.value),
    inscritos: 0,
    reservada: false
  });

  desenhar();
  formulario.reset();
  campoNome.focus();
}

function iniciarLista() {
  const lista = document.querySelector("#lista");

  if (lista === null) {
    console.warn("A área #lista não foi encontrada no HTML.");
    return;
  }

  lista.addEventListener("click", tratarCliqueNaLista);
}

function iniciarFiltros() {
  const busca = document.querySelector("#busca");
  const botaoFiltro = document.querySelector("#botaoSoComVagas");

  if (busca === null || botaoFiltro === null) {
    console.warn("A busca ou o botão de filtro não foram encontrados no HTML.");
    return;
  }

  busca.addEventListener("input", tratarBusca);
  botaoFiltro.addEventListener("click", tratarCliqueSoComVagas);
}

function iniciarNovaTurma() {
  const formulario = document.querySelector("#formNovaTurma");

  if (formulario === null) {
    console.warn("O formulário #formNovaTurma não foi encontrado no HTML.");
    return;
  }

  formulario.addEventListener("submit", tratarEnvioNovaTurma);
}

iniciarLista();
iniciarFiltros();
iniciarNovaTurma();
desenhar();
