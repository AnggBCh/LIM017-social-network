import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import { app, db } from './firebaseConfiguration.js';
import { collection, addDoc, serverTimestamp, getDocs, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// registrar nuevo usuario con email
const auth = getAuth(app);

export const registerWithEmailFb = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
        })
};

//actulizar datos del nuevo usuario
export const updateProfilefb = (name, photo) => {
    return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
    }).then(() => {
        // Profile updated!
        console.log('ya actualice tu nombre y foto');
    }).catch((error) => {
        // An error occurred
        console.log('error al actualizar');
    });
};

//enviar email de verificación
export const sendEmailfb = () => {
    return sendEmailVerification(auth.currentUser)
        .then(() => {
            // Email verification sent!
            console.log('email enviado');
        });
};

//registarse con google (LogInWithGoogle too)
export const registerWithGoogleFb = (photo) => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
        .then((result) => {
            updateProfile(auth.currentUser, {
                photoURL: photo,
            }).then(() => {
                // Profile updated!
                console.log('ya actualice tu nombre y foto de google');
            }).catch((error) => {
                // An error occurred
                console.log('error al actualizar');
            });;
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            const userData = {
                userName: user.displayName,
                userState: user.emailVerified,
                userPhoto: user.photoURL,
                userUid: user.uid
            }
            return userData;

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
};

//Logearse con correo
export const loginFb = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            console.log('logueado con exito')
            const userData = {
                userName: user.displayName,
                userState: user.emailVerified,
                userPhoto: user.photoURL,
                userUid: user.uid
            }
            return userData;
        })
};

//Salir de tu cuenta
export const logOutfb = () => {
    return signOut(auth)
        .then(() => {
            console.log('Se esta cerrando la sesion')
                // Sign-out successful.
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            // An error happened.
        });

};

//Subir post a la nube/data de firestore
export const savePostfb = (input) => {
    const user = auth.currentUser;
    console.log(user);
    return addDoc(collection(db, "post"), {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        post: input,
        photoURL: user.photoURL,
        date: serverTimestamp()
    }).then((docRef) => {
        console.log("Tu post ya esta en la nube", docRef.id);
    }).catch((e) => {
        console.error("Error adding document: ", e);

    });
};

//Imprimir data/post en la página
export const seePostFb = () => {
    const querySnapshot = getDocs(collection(db, "post"));
    return querySnapshot
};

//actulizar data/post en tiempo real y en orden descendente
export const onGetPost = (callback) => onSnapshot(query(collection(db, "post"), orderBy('date', 'desc')), callback)