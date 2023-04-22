import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { AuthContext } from "../context/auth";
import { auth } from "../../firebase.config";
import { useProfile } from "./useProfile";
import { useContext } from "react";
import { default_img } from "../..";
import { AppoinmentsContext } from "../context/appoinments";

// Hook personalizado para manejar el inicio de sesión
export const useAuth = () => {
    const { AuthStatus, setAuthStatus } = useContext(AuthContext);
    const { AppLoading, setAppLoading } = useContext(AuthContext);
    const { setAppoinments } = useContext(AppoinmentsContext);

    const { CreateProfile, GetProfile } = useProfile();

    //Función para registrar un nuevo usuario
    async function Registrarse(email, phone, password) {
        try {
            const data = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            if (data.user.email) {
                const status = {
                    logged: true,
                    user: {
                        email,
                        phone,
                        img: default_img,
                    },
                };
                await CreateProfile(email, phone);

                setAuthStatus(status);

                return {
                    user: status.user,
                    message: `Sesión iniciada con ${email}`,
                };
            }
            return {
                user: null,
                message: `Error`,
            };
        } catch (error) {
            const msg = String(error.message);
            let message = msg;

            if (msg.includes("auth/email-already"))
                message = "Este email ya tiene una cuenta";
            if (msg.includes("auth/invalid-email")) message = "Correo invalido";

            return {
                user: null,
                message,
            };
        }
    }
    //Función para iniciar sesión
    async function IniciarSesion(email, password) {
        try {
            const data = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            if (data.user.email) {
                const profile = await GetProfile(email);

                const status = {
                    logged: true,
                    user: {
                        ...profile,
                    },
                };

                setAuthStatus(status);

                return {
                    user: status.user,
                    message: `Sesión iniciada con ${email}`,
                };
            }
            return {
                user: null,
                message: `Error`,
            };
        } catch (error) {
            const msg = String(error.message);
            let message = msg;

            if (msg.includes("auth/invalid-email")) message = "Correo invalido";
            if (msg.includes("auth/wrong-password"))
                message = "Contraseña incorrecta";
            if (msg.includes("auth/user-not-found"))
                message = "Este correo no está registrado";

            return {
                user: null,
                message,
            };
        }
    }
    //Función para cerrar sesion
    async function CerrarSesion() {
        try {
            await signOut(auth);

            setAppoinments([]);
            setAuthStatus({ logged: false, user: null });
        } catch (error) {
            console.log(error);
        }
    }

    return {
        Registrarse,
        IniciarSesion,
        CerrarSesion,
        AuthStatus,
        setAuthStatus,
        AppLoading,
        setAppLoading,
    };
};
