axios.defaults.headers.common['Authorization'] = 'GkALFw66QN0rVzaxxtU97AfA';

let nickname = {
    name: ""
};
function login_positivo(resposta) {
    console.log(resposta);
    const tela_login = document.querySelector(".Apagavel");
    tela_login.innerHTML = "";
}
function login_negativo(resposta) {
    console.log("deu errado");
    console.log(resposta);
}
function Enviar_nome() {
    const promessa_entrada = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', nickname)
    promessa_entrada.then(login_positivo);
    promessa_entrada.catch(login_negativo);
}


function Pegar_nome() {
    const espaço_nome = document.querySelector(".Login-nome");
    nickname.name = espaço_nome.value;
    const tela_login = document.querySelector(".login-screen");
    tela_login.innerHTML = "";
    tela_login.innerHTML += 
    `<img class="iconeUolLogin" src="logo1.png" alt="Ícone Uol">
    <div class="gif-aguardo ">
        <img src="Loading.gif" alt="Carregando">
        <p> Entrando... </p> 
    </div>`;
    Enviar_nome(nickname);
}
