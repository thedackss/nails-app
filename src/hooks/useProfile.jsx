import React, { useContext } from "react";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase.config";
import { default_img } from "../..";
import { AuthContext } from "../context/auth";

// Hook personalizado para manejar la creacion de perfiles
export const useProfile = () => {
    const { setAuthStatus } = useContext(AuthContext);

    // Función para crear un perfil
    async function CreateProfile(email, phone) {
        try {
            const ref = collection(firestore, "users");

            await setDoc(doc(ref, email), {
                email,
                phone,
                img: default_img,
            });
        } catch (error) {
            console.log(error);
        }
    }

    // Función para obtener la información de un perfil
    async function GetProfile(email) {
        try {
            const ref = doc(firestore, "users", email);
            const data = await getDoc(ref);

            if (data.exists()) return data.data();
            else return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async function EditProfile(email, data) {
        try {
            const profile = {
                email,
                img: data.img,
                phone: data.phone,
            };

            const ref = doc(firestore, "users", email);
            await updateDoc(ref, profile);

            setAuthStatus({ logged: true, user: profile });
        } catch (error) {
            console.log(error);
        }
    }

    return { CreateProfile, GetProfile, EditProfile };
};
