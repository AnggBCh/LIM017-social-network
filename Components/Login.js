export const login = () => {
    const loginTemplate = `
      <section class="loginContainer">
        <section class="subLoginContainer">
         <div class="helpPotatoesTittle">
            <h1> Help Potatoes</h1>
         </div>
         <div class="loginSubContainer"> 
           <p class="loginTittle">Iniciar sesión</p>
           <div class="inputContainer">
              <input type="text" placeholder="Correo electrónico" id="inputEmail">
              <p id="emptyInputEmail" class="error"></p>
              <input type="password" placeholder="Contraseña" id="inputPass">
              <p id="emptyInputPass" class="error"></p>
              <button id="loginBtn" class="buttonnextPage"> Iniciar Sesión </button>
           </div>
           <div class="withGoogle">
              <p class="pGoogle">Iniciar sesión con google</p>
              <img id="papeLogIn" style="display:none" src=./img/pape.png>
              <img src="./img/googleLogo.png" class="logoGoogle" id="googleImgLogIn">
              <p class="pGoogle">¿No tienes una cuenta?</p>
              <button id="registerP" class="backpage">Regístrate</button>
           </div>
           <section id="modalLogIn" class="verificationEmailModal" style="display:none">
           <div class="divContainerModal">
              <div class="containerModal">
                <p>Debe verificar su correo para poder ingresar. Revise su bandeja de entrada</p>
                <button class="okaybtnModal" id="closeModalLogIn">Aceptar</button>
              </div>
           </div>
           </section>
         </div>
         </section>
      </section>
    `;


    return loginTemplate;
}