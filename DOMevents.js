import { onNavigate } from "./main.js";
import { registerWithEmail, registerWithGoogle, login } from './lib/controller.js';
import { logOutfb, savePostfb } from './lib/firebaseMain.js';


export const loginEvents = () => {
    //btn registrate in login
    console.log("login");
    const registerOption = document.getElementById('registerP');
    registerOption.addEventListener('click', () => {
        onNavigate('/register');
        registerEvents();

    });

    //btn de google para ingresar sesion con google
    const btnGoogle = document.getElementById('googleImgLogIn');
    btnGoogle.addEventListener('click', () => {
        registerWithGoogle(document.getElementById('papeLogIn').src);

    });

    //btn para iniciar sesión con email y password
    const btnLogin = document.getElementById('loginBtn');
    btnLogin.addEventListener('click', () => {
        const inputEmailLogin = document.getElementById('inputEmail');
        const inputPassLogin = document.getElementById('inputPass');
        if (inputEmailLogin.value === '') {
            document.getElementById('emptyInputEmail').innerText = '*Coloque su correo electrónico'
        }
        if (inputPassLogin.value === '') {
            document.getElementById('emptyInputPass').innerText = '*Coloque su contraseña'
        }
        login(inputEmailLogin.value, inputPassLogin.value)
    })

};



export const registerEvents = () => {
    //evento del boton de resgitrar nuevo usuario
    //Almacenar icono seleccionado
    const btnRegister = document.getElementById('buttonRegister');
    let photoRegister = '';
    const papaMom = document.getElementById('mom');
    const papaDad = document.getElementById('dad');
    const pape = document.getElementById('pape');
    papaMom.addEventListener('click', () => {
        papaMom.setAttribute('class', 'borderM');
        papaDad.removeAttribute('class', 'borderM');
        pape.removeAttribute('class', 'borderM');
        photoRegister = papaMom.src;
    })
    papaDad.addEventListener('click', () => {
        papaDad.setAttribute('class', 'borderM');
        papaMom.removeAttribute('class', 'borderM');
        pape.removeAttribute('class', 'borderM');

        photoRegister = papaDad.src;
    })
    pape.addEventListener('click', () => {
        pape.setAttribute('class', 'borderM');
        papaMom.removeAttribute('class', 'borderM');
        papaDad.removeAttribute('class', 'borderM');

        photoRegister = pape.src;
    });

    //Darle argumento para registar con email, password
    btnRegister.addEventListener('click', () => {
        const inputEmailReg = document.getElementById('inputEmail');
        const inputPasswordReg = document.getElementById('inputPassword');
        const inputNameReg = document.getElementById('inputName');
        if (inputNameReg.value === '') {
            document.getElementById('emptyInputName').innerText = '*Colocar su nombre de usuario';
        }
        if (inputPasswordReg.value === '') {
            document.getElementById('passError').innerText = '*Ingrese una contraseña';
        }
        registerWithEmail(inputEmailReg.value, inputPasswordReg.value, inputNameReg.value, photoRegister);
    });

    //evento del boton registrar con google (jala imagen predeterminada)
    const btnGoogle = document.getElementById('googleImg');
    btnGoogle.addEventListener('click', () => {
        registerWithGoogle(document.getElementById('pape').src);

    });

    //evento de opcion volver a la vista login
    const loginBtn = document.getElementById('backLogin');
    loginBtn.addEventListener('click', () => {
        onNavigate('/');
        loginEvents();
    })

};

//funcionalidad de vista Home
export const homeEvents = () => {
    // evento del boton Log Out
    const iconLogOut = document.getElementById('logOutIcon');
    iconLogOut.addEventListener('click', () => {
        logOutfb();
        onNavigate('/');
        loginEvents();
    });

    //evento para guardar Post
    const btnPost = document.querySelectorAll('.btnShare');
    const inputPost = document.querySelectorAll('.postInput');
    btnPost.forEach(btn => btn.addEventListener('click', () => {
        inputPost.forEach(e => {
            savePostfb(e.value);
            e.value = '';
        })
    }))
};