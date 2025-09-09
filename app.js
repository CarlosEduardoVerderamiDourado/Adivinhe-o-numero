let listaDeNumerosSorteados=[];
let numeroLimite =100
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 2.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do número secreto');
    exibirTextoNaTela('p','Escolha um número entre 1 e 100');
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto){
        exibirTextoNaTela('h1','Acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas':'tentativa';
        let mensagenTentativas = `você acetou o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p',mensagenTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else {
        if(chute > numeroSecreto){
        exibirTextoNaTela('p','O número secreto é menor');
    }else{
        exibirTextoNaTela('p','O número secreto e maior');
    }
    tentativas++;
    limparCampo();
}
}

function gerarNumeroAleatorio() {
   let numeroEscolido = parseInt(Math.random()*numeroLimite+1);
   let quantidadeDeelementosNaLista = listaDeNumerosSorteados.length;

   if(quantidadeDeelementosNaLista == numeroLimite){
    listaDeNumerosSorteados = [];
   }

    if(listaDeNumerosSorteados.includes(numeroEscolido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolido;
    }
}
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
