import { registerWithEmailFb, updateProfilefb, sendEmailfb, registerWithGoogleFb, loginFb, logOutfb, seePostFb, onGetPost } from "./firebaseMain.js";
import { onNavigate } from "../main.js";
import { loginEvents, homeEvents } from "../DOMevents.js";

export const registerWithEmail = (email, password, name, photo) => {
    registerWithEmailFb(email, password)
        .then(() => {
            updateProfilefb(name, photo);
            sendEmailfb()
                .then(() => {
                    const showModalEmailVerification = document.getElementById('modalEmailV');
                    const hideModal = document.getElementById('closeModal');
                    showModalEmailVerification.style.display = 'block';
                    hideModal.addEventListener('click', () => {
                        showModalEmailVerification.style.display = 'none';
                    })
                })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
                document.getElementById('errorEmail').innerText = 'El email ya se encuentra registrado';
            } else if (errorMessage === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                document.getElementById('passError').innerText = 'La contraseña debe tener más de 6 caracteres';
            } else if (errorMessage === 'Firebase: Error (auth/invalid-email).') {
                document.getElementById('errorEmail').innerText = '*Coloque su email';
            }
        });

};


export const registerWithGoogle = (photo) => {
    registerWithGoogleFb(photo)
        .then((res) => {
            onNavigate('/home');
            const userProfile = document.getElementById('profileContainer');
            const newPost = document.getElementById('postContainer');

            userProfile.innerHTML = `<div class="containerPhotoProfile">
            <img src="./img/pape.png" alt="" class="iconUserDefault">
            </div>
            `
            newPost.innerHTML = `
            <input type="text" class="postInput" placeholder="¡Hola! ¿Qué quieres compartir?">
            <button class="btnShare">Publicar</button>`;
            seePost();
            homeEvents();
        })

};


export const login = (email, password) => {
    loginFb(email, password)
        .then((res) => {
            console.log(res)
            if (res.userState === false) {
                logOutfb();
                onNavigate('/');
                loginEvents();
                const showModalLogin = document.getElementById('modalLogIn');
                const closeModalLogin = document.getElementById('closeModalLogIn');
                showModalLogin.style.display = 'block';
                closeModalLogin.addEventListener('click', () => {
                    showModalLogin.style.display = 'none';
                })
            } else {
                onNavigate('/home');

                const userProfile = document.getElementById('profileContainer');
                const newPost = document.getElementById('postContainer');

                userProfile.innerHTML = `<div class="containerPhotoProfile">
                <img src="${res.userPhoto}" alt="imagen de perfil" class="userPhotoURLProfile">
                </div>`;

                newPost.innerHTML = `
                <input type="text"  class="postInput" placeholder="¡Hola! ¿Qué quieres compartir?">
                <button class="btnShare">Publicar</button>`;
                seePost();
                homeEvents();
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
                document.getElementById('emptyInputPass').innerText = '*Su contraseña es incorrecta';
            }
        });
};


export const seePost = () => {
    onGetPost((query) => {
        document.getElementById('postPublic').innerHTML = '';
        query.forEach((doc) => {
            document.getElementById('postPublic').innerHTML += `
            <div class="containerSeePost">

            <div class="divUserPhoto">
            <img class ="userPhotoPublic"src="${doc.data().photoURL}">
            <div class="divUserName">
            <p class="userNamePublic">${doc.data().name} </p>
            <p class="relleno"> ${doc.data().date.toDate().toDateString()},${doc.data().date.toDate().toLocaleTimeString()}</p>
            </div>
            </div>
            <div class="comentPost">
            <p class="userPostPublic">${doc.data().post} </p>
            </div>
            <div class="likeIcon">
            </div>

            </div>
            `
            console.log(`${doc.data().date.toDate()}`);
        });
    })
};