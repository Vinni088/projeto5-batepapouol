axios.defaults.headers.common['Authorization'] = 'GkALFw66QN0rVzaxxtU97AfA';

//Configs para: Login, Manter-se On, Manter as msgs atualizadas
let nickname = {
    name: ""
};
let mensagens = [];
const espaço_login = document.querySelector(".Login-nome");
espaço_login.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        Pegar_nome();
        espaço_login.value = ""
    }
});
let participantes = [];
const promisse_lista_participantes = axios.get('https://mock-api.driven.com.br/api/vm/uol/participants');
promisse_lista_participantes.then(analise_participantes);

function analise_participantes(resposta) {
    participantes = resposta.data;
}
function manter_online () {
    const promisse_online = axios.post('https://mock-api.driven.com.br/api/vm/uol/status' , nickname);
    promisse_online.then(console.log('mantendo online'));
}
function print_msgs(resposta) {
    mensagens = resposta.data;
    const espaço_para_mensagens = document.querySelector(".Mensagens");
    espaço_para_mensagens.innerHTML = ""
    for (let i = 0; i < mensagens.length; i++) {
        if (mensagens[i].type === "status") {
            espaço_para_mensagens.innerHTML += `
            <li data-test="message" class="msg-status">
                <span> (${mensagens[i].time}) </span> <strong> ${mensagens[i].from} </strong> ${mensagens[i].text}
            </li>
            `
        }
        if (mensagens[i].type === "message") {
            espaço_para_mensagens.innerHTML += `
            <li data-test="message" class="msg-text">
            <span> (${mensagens[i].time}) </span> <strong> ${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong>: ${mensagens[i].text}
            </li>
            `
        }
    }
}
function cheque_mensagens() {
    let promisse_msgs = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promisse_msgs.then(print_msgs);
    //promisse_msgs.then(exiba); 
}
function login_positivo() {
    const tela_login = document.querySelector(".Apagavel");
    tela_login.innerHTML = "";
    console.log("login positivo");
    setInterval(manter_online, 5000);
    setInterval(cheque_mensagens, 1000);
}
function login_negativo(resposta) {
    console.log("deu errado");
    console.log(resposta);
}
function Enviar_nome() {
    const tela_login = document.querySelector(".login-screen");
    tela_login.innerHTML = "";
    tela_login.innerHTML += 
        `<img class="iconeUolLogin" src="logo1.png" alt="Ícone Uol">
            <div class="gif-aguardo ">
                <img src="Loading.gif" alt="Carregando">
                <p> Entrando... </p> 
            </div>`;
    const promessa_entrada = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', nickname)
    promessa_entrada.then(login_positivo);
    promessa_entrada.catch(login_negativo);
}
let contador = 0;
function Pegar_nome() {
    let espaço_nome = document.querySelector(".Login-nome");
    let nome_teste = espaço_nome.value;
    for (let i = 0; i < participantes.length; i++) {
        if (participantes[i].name === nome_teste) {
            alert("Nome Inválido, Tente outro nome");
            espaço_login.value = "";
        } else {
            contador++;
        }
        if (contador == participantes.length) {
            nickname.name = espaço_nome.value;
            Enviar_nome();
        }
    }
}
//Configs para: Enviar mensagens
let msg = {
    from: "",
	to: "Todos",
	text: "",
	type: "message"
};
const msg_space = document.querySelector('.msg-space');

function enviar_msg() {
    msg.text = msg_space.value ;
    msg.from = nickname.name
    const promisse_enviar = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', msg);
    promisse_enviar.then(console.log("msg enviada :)"));
    promisse_enviar.catch(window.location.reload);
}

msg_space.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        enviar_msg();
        msg_space.value = ""
    }
});
