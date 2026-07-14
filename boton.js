/* MENU HAMBURGUESA (Menu de ayuda) */

const hamburger =
document.querySelector(".hamburger");

const mobileMenu =
document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {

mobileMenu.classList.toggle("activo");

if(mobileMenu.classList.contains("activo")){

hamburger.innerHTML =
'<i class="fa-solid fa-xmark"></i> Cerrar';

}else{

hamburger.innerHTML =
'<i class="fa-solid fa-bars"></i> Menú';

}

});

document.addEventListener("click", function (e) {

    if (
        mobileMenu.classList.contains("activo") &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
    ) {

        mobileMenu.classList.remove("activo");

        hamburger.innerHTML =
        '<i class="fa-solid fa-bars"></i> Menú';

    }

});

/* BOTON QUEREMOS AYUDARTE */

const helpBtn =
document.getElementById("helpBtn");

const helpOptions =
document.querySelector(".help-options");

helpBtn.addEventListener("click",()=>{

helpOptions.classList.toggle("active");

if(helpOptions.classList.contains("active")){

helpBtn.innerHTML =
`
<i class="fa-solid fa-xmark"></i>
`;

}else{

helpBtn.innerHTML =
`
<i class="fa-solid fa-comment-dots"></i>
`;

}

actualizarMensajeAyuda();

});

const helpMessage =
document.querySelector(".help-message");

 if(helpOptions.classList.contains("active")){

helpMessage.classList.add("oculto");

}else{

helpMessage.classList.remove("oculto");

}

function actualizarMensajeAyuda(){

    if(helpOptions.classList.contains("active")){

        helpMessage.classList.add("oculto");

    }else{

        helpMessage.classList.remove("oculto");

    }

}

actualizarMensajeAyuda();

/* CERRAR MENU AL TOCAR LINK */

const linksMovil =
document.querySelectorAll(".mobile-menu a");

linksMovil.forEach(link => {

link.addEventListener("click", () => {

mobileMenu.classList.remove("activo");

hamburger.innerHTML =
'<i class="fa-solid fa-bars"></i> Menú';

});

});


window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    const heroTitle = document.querySelector(".hero h1");

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
        heroTitle.style.color = "white";
    } else {
        header.classList.remove("scrolled");
        heroTitle.style.color = "white";
    }
});


const audio = document.getElementById("audio");
const play = document.getElementById("play");
const barra = document.getElementById("barra");
const mute = document.getElementById("mute");
const tiempo = document.getElementById("tiempo");

if(audio && play && barra && mute && tiempo){

play.onclick = function(){

    if(audio.paused){

        audio.play();
        play.innerHTML="⏸";

    }else{

        audio.pause();
        play.innerHTML="▶";

    }

};


audio.addEventListener("timeupdate", ()=>{

    let progreso = 
    (audio.currentTime / audio.duration) * 100;

    barra.value = progreso;


    let minutos = Math.floor(audio.currentTime / 60);
    let segundos = Math.floor(audio.currentTime % 60);

    if(segundos < 10){
        segundos = "0" + segundos;
    }

    tiempo.innerHTML = minutos + ":" + segundos;

});


barra.oninput = function(){

    audio.currentTime =
    (barra.value / 100) * audio.duration;

};


mute.onclick=function(){

    audio.muted = !audio.muted;

    mute.innerHTML = 
    audio.muted ? "🔇" : "🔊";

};


audio.onended=function(){

    play.innerHTML="▶";
    barra.value=0;

};

}

/* CHAT EN VIVO */

const liveChatBtn = document.getElementById("liveChatBtn");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");

if(liveChatBtn){

    liveChatBtn.addEventListener("click",function(e){

        e.preventDefault();

        // Cierra el menú "Queremos ayudarte"
        helpOptions.classList.remove("active");

        // Restablece el icono del botón principal
        helpBtn.innerHTML = `
            <i class="fa-solid fa-comment-dots"></i>
        `;

        // Muestra el chat
        chatWindow.classList.add("active");

    });

}

if(closeChat){

    closeChat.addEventListener("click",function(){

        chatWindow.classList.remove("active");

    });

}

/* ENVIAR MENSAJES */

const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const sendMessage = document.getElementById("sendMessage");

function enviarMensaje(){

    const texto = chatInput.value.trim();

    if(texto==="") return;

    agregarMensajeUsuario(texto);

    chatInput.value="";

    mostrarEscribiendo();


    setTimeout(function(){

        quitarEscribiendo();

        responderChat(texto);

    },1500);

}

function agregarMensajeUsuario(texto){

    const mensaje=document.createElement("div");

    mensaje.className="message user";

    mensaje.innerHTML=`
        ${texto}
        <div class="time">

        ${new Date().toLocaleTimeString([],{

            hour:"2-digit",
            minute:"2-digit"

        })}

        </div>
    `;

    chatBody.appendChild(mensaje);

    chatBody.scrollTop=chatBody.scrollHeight;

}

function mostrarEscribiendo(){

    const escribiendo = document.createElement("div");

    escribiendo.className = "message admin";

    escribiendo.id = "typing";

    escribiendo.innerHTML = `

        <div class="avatar">

            <i class="fa-solid fa-user"></i>

        </div>

        <div class="bubble typing">

            <span></span>

            <span></span>

            <span></span>

        </div>

    `;

    chatBody.appendChild(escribiendo);

    chatBody.scrollTop = chatBody.scrollHeight;

}

function quitarEscribiendo(){

    const typing=document.getElementById("typing");

    if(typing){

        typing.remove();

    }

}

function responderChat(texto){

    const respuesta = buscarRespuesta(texto);

    const mensaje = document.createElement("div");

    mensaje.className="message admin";

    mensaje.innerHTML=`

        <div class="avatar">

            <i class="fa-solid fa-user"></i>

        </div>

        <div class="bubble">

            ${respuesta}

            <div class="time">

                ${new Date().toLocaleTimeString([],{

                    hour:"2-digit",

                    minute:"2-digit"

                })}

            </div>

        </div>

    `;

    chatBody.appendChild(mensaje);

    chatBody.scrollTop=chatBody.scrollHeight;
}


sendMessage.addEventListener("click",enviarMensaje);

chatInput.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        enviarMensaje();

    }

});

/* RESPUESTAS AUTOMÁTICAS DEL CHAT ICEL */

const respuestas = {

saludo:[
"¡Hola! 😊 Bienvenido a ICEL. ¿Cómo podemos ayudarte?",
"¡Qué gusto saludarte! 👋 ¿En qué podemos servirte hoy?",
"¡Bienvenido! Estamos felices de que estés aquí."
],

horario:[
"Nuestras reuniones familiares son los domingos a las 8:30 hs.",
"También tenemos Grupos Pequeños durante la semana y otras reuniones más. Puedes verlos en la sección Reuniones."
],

direccion:[
"Nos encontramos en Limpio, Paraguay. 📍",
"Si deseas, también puedes usar el botón de ubicación del menú 'Queremos ayudarte', para encontrar la dirección exacta de la iglesia."
],

iglesia:[
"Somos la Iglesia Cristiana Evangélica de Limpio (ICEL).",
"Nuestro deseo es ayudar a las personas a encontrar el verdadero propósito de sus vidas."
],

gracias:[
"¡Con mucho gusto! 😊",
"Estamos para servirte."
],

despedida:[
"Que Dios te bendiga. 🙌",
"Gracias por escribirnos. ¡Te esperamos en la ICEL!"
],

jesus:[

"Jesús es el Hijo de Dios y vino para darnos vida eterna.",

"Si deseas conocer más acerca de Jesús o conversar con alguien, estaremos felices de acompañarte."

],

contacto:[

"Puedes comunicarte con nosotros llamando al +595 983 337565.",

"También puedes escribirnos por WhatsApp o visitarnos en nuestras reuniones. ¡Será un gusto recibirte!"

],

default:[
"No estoy seguro de haber entendido tu consulta. 😊",
"¿Podrías escribirla de otra manera? 🤗",
"También puedes usar los botones rápidos. ✅"
]

};


function buscarRespuesta(texto){

    texto = texto.toLowerCase();

    let respuestasEncontradas = [];

    // SALUDO
    if(
        texto.includes("hola") ||
        texto.includes("buenas") ||
        texto.includes("buen día") ||
        texto.includes("buenos días") ||
        texto.includes("buenas tardes") ||
        texto.includes("buenas noches")
    ){

        respuestasEncontradas.push(
            respuestas.saludo[
                Math.floor(Math.random()*respuestas.saludo.length)
            ]
        );

    }

    // HORARIOS
    if(
        texto.includes("horario") ||
        texto.includes("culto") ||
        texto.includes("reunión") ||
        texto.includes("reunion")
    ){

        respuestasEncontradas.push(
            respuestas.horario.join("<br><br>")
        );

    }

    // DIRECCIÓN
    if(
        texto.includes("dirección") ||
        texto.includes("direccion") ||
        texto.includes("ubicación") ||
        texto.includes("ubicacion")
    ){

        respuestasEncontradas.push(
            respuestas.direccion.join("<br><br>")
        );

    }

    // IGLESIA
    if(
        texto.includes("iglesia") ||
        texto.includes("icel")
    ){

        respuestasEncontradas.push(
            respuestas.iglesia.join("<br><br>")
        );

    }

   // CONOCER A JESÚS

if(

    texto.includes("jesús") ||

    texto.includes("jesus") ||

    texto.includes("conocer a jesús") ||

    texto.includes("conocer a jesus")

){

    respuestasEncontradas.push(

        respuestas.jesus.join("<br><br>")

    );

}

  // CONTACTO

if(

    texto.includes("contacto") ||

    texto.includes("teléfono") ||

    texto.includes("telefono") ||

    texto.includes("llamar")

){

    respuestasEncontradas.push(

        respuestas.contacto.join("<br><br>")

    );

}

    // GRACIAS
    if(texto.includes("gracias")){

        respuestasEncontradas.push(
            respuestas.gracias[
                Math.floor(Math.random()*respuestas.gracias.length)
            ]
        );

    }

    // DESPEDIDA
    if(
        texto.includes("adiós") ||
        texto.includes("adios") ||
        texto.includes("chau")
    ){

        respuestasEncontradas.push(
            respuestas.despedida[
                Math.floor(Math.random()*respuestas.despedida.length)
            ]
        );

    }

    if(respuestasEncontradas.length===0){

        respuestasEncontradas.push(
            respuestas.default[
                Math.floor(Math.random()*respuestas.default.length)
            ]
        );

    }

    return respuestasEncontradas.join("<br><br>");

}

document.addEventListener("click",function(e){

    if(e.target.classList.contains("quick-btn")){

        chatInput.value = e.target.innerText;

        enviarMensaje();

    }

});



