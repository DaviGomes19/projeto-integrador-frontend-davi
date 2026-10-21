const modalidades = [
  { nome: "Musculação", mensalidade: 90, alunos: 45 },
  { nome: "Funcional", mensalidade: 120, alunos: 28 },
  { nome: "Yoga", mensalidade: 100, alunos: 15 }
];
 
 
/* ---------- ETAPA 1: variáveis, tipos e template literal ---------- */
{
  const nomeAcademia = "Star Academy";   
  const idadeMinima = 14;                
  const idadeMaxima = 100;               
  let vagasAulaExperimental = 10;        
  let inscricoesAbertas = true;
 
  console.log(typeof nomeAcademia);          
  console.log(typeof idadeMinima);           
  console.log(typeof inscricoesAbertas);     
 
  console.log(`${nomeAcademia}: inscrições de ${idadeMinima} a ${idadeMaxima} anos`);
 
  vagasAulaExperimental = vagasAulaExperimental - 1;   // let permite reatribuir
  console.log(`Vagas restantes na aula experimental: ${vagasAulaExperimental}`);
 
 
}
 
 
/* ---------- ETAPA 2: entrada com prompt, conversão e validação ---------- */
if (confirm("Etapa 2: testar a entrada de idade com prompt?")) {
  const idadeMinima = 14;
  const idadeMaxima = 100;
 
  const resposta = prompt("Qual a sua idade?");
 
  console.log(typeof resposta);
 
  
 
 
  const idade = Number(resposta);
  const invalida = resposta === null || resposta.trim() === "" ||
    Number.isNaN(idade) || idade < idadeMinima || idade > idadeMaxima;
 
  if (invalida) {
    console.warn("Idade inválida:", resposta);
  } else {
    console.log(`Idade válida: ${idade}. Daqui a 1 ano: ${idade + 1}`);
  }
}
 
 
/* ---------- ETAPA 3: condicionais (if / else if / else e ternário) ---------- */
{
  const peso = 70;
  const altura = 1.75;
  const imc = peso / (altura ** 2);
  let classificacao;
 
  
  if (imc < 18.5) {
    classificacao = "Abaixo do peso";
  } else if (imc < 25) {
    classificacao = "Peso normal";
  } else if (imc < 30) {
    classificacao = "Sobrepeso";
  } else {
    classificacao = "Obesidade";
  }
  console.log(`IMC ${imc.toFixed(1)}: ${classificacao}`);
}
 

{
  const idade = 16;
  const temAutorizacao = true;
 
  if (idade >= 18 || (idade >= 14 && temAutorizacao)) {
    console.log("Inscrição liberada");
  } else {
    console.log("Inscrição negada");
  }
 
  
  const tipoInscricao = idade >= 18 ? "Adulto" : "Menor com autorização";
  console.log(tipoInscricao);
 
  
  if (idade === 18) {
    console.log("Tem exatamente 18 anos");
  } else {
    console.log(`Não tem 18 anos. A idade continua ${idade}`);
  }
}
 
 
/* ---------- ETAPA 4: switch ---------- */
{
  // Os valores são os mesmos do <select> do formulário
  const modalidadeEscolhida = "yoga";
  let sala;
 
  switch (modalidadeEscolhida) {
    case "musculacao":
      sala = "Sala de musculação (acesso livre)";
      break;
    case "funcional":
      sala = "Espaço funcional (aulas em grupo ou individuais)";
      break;
    case "yoga":
      sala = "Sala de yoga";
      break;
    default:
      sala = "Consulte a recepção";
  }
  console.log(sala);
 
 
}
 
 

{

  for (let i = 0; i < modalidades.length; i++) {
    console.log(`${i + 1}. ${modalidades[i].nome} - R$ ${modalidades[i].mensalidade.toFixed(2)}`);
  }
 
  
  
  let soma = 0;                      
  let maisCara = modalidades[0];     
  let totalMovimentadas = 0;         
 
  for (const modalidade of modalidades) {
    soma += modalidade.mensalidade;
 
    if (modalidade.mensalidade > maisCara.mensalidade) {
      maisCara = modalidade;
    }
 
    if (modalidade.alunos > 20) {
      totalMovimentadas++;
    }
  }
 
  const mediaMensalidade = soma / modalidades.length;
  console.log(`Média das mensalidades: R$ ${mediaMensalidade.toFixed(2)}`);
  console.log(`Mensalidade mais cara: ${maisCara.nome} (R$ ${maisCara.mensalidade})`);
  console.log(`Modalidades com mais de 20 alunos: ${totalMovimentadas}`);
}
 
 
/* ---------- ETAPA 6: while com prompt ---------- */
if (confirm("Etapa 6: testar o while com prompt (idades dos alunos)?")) {
  const idadeMinima = 14;
  const idadeMaxima = 100;
  let somaIdades = 0;
  let quantidade = 0;
 
  let entrada = prompt('Digite a idade de um aluno ou "sair":');
 
  while (entrada !== null && entrada.toLowerCase() !== "sair") {
    const idade = Number(entrada);
    const invalida = entrada.trim() === "" || Number.isNaN(idade) ||
      idade < idadeMinima || idade > idadeMaxima;
 
    if (invalida) {
      console.warn(`"${entrada}" não é uma idade válida.`);
    } else {
      somaIdades += idade;
      quantidade++;
    }
 
    
    entrada = prompt('Outra idade ou "sair":');
  }
 
  if (quantidade > 0) {
    console.log(`Média de idade de ${quantidade} aluno(s): ${(somaIdades / quantidade).toFixed(1)}`);
  } else {
    console.log("Nenhuma idade válida informada.");
  }
}
 

{
  const procurada = "Yoga";
  let encontrada = null;
 
  for (const modalidade of modalidades) {
    if (modalidade.nome === procurada) {
      encontrada = modalidade;
      break;
    }
  }
 
  if (encontrada !== null) {
    console.log(`${encontrada.nome} existe e tem ${encontrada.alunos} alunos.`);
  } else {
    console.log(`${procurada} não foi encontrada.`);
  }
}
 
 
/* ---------- ETAPA 7: relatório final ---------- */
{
  const relatorio = [];
 
  for (const modalidade of modalidades) {
    let lotacao;
 
    if (modalidade.alunos >= 40) {
      lotacao = "Lotada";
    } else if (modalidade.alunos >= 20) {
      lotacao = "Movimentada";
    } else {
      lotacao = "Tranquila";
    }
 
    relatorio.push({
      modalidade: modalidade.nome,
      alunos: modalidade.alunos,
      lotacao: lotacao
    });
  }
 
  console.table(relatorio);
}
 