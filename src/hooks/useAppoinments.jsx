import React, { useContext } from "react";
import { AppoinmentsContext } from "../context/appoinments";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
} from "firebase/firestore";
import { firestore } from "../../firebase.config";
import { AuthContext } from "../context/auth";

// Hook personalizado para manejar las citas, este proporciona funciones para manejarlas
export const useAppoinments = () => {
    const { Appoinments, setAppoinments } = useContext(AppoinmentsContext);
    const { AuthStatus } = useContext(AuthContext);
    const email = AuthStatus.user.email;

    // Función para crear una cita
    async function CreateAppoinment(data) {
        try {
            const ref = collection(firestore, `appoinments-${email}`);
            const doc = await addDoc(ref, data);

            setAppoinments([
                ...Appoinments,
                {
                    id: doc.id,
                    ...data,
                },
            ]);
        } catch (error) {}
    }
    // Función para obtener las citas de la base de datos
    async function GetAppoinments() {
        try {
            const array = [];

            const ref = collection(firestore, `appoinments-${email}`);
            const data = await getDocs(ref);

            data.forEach((doc) => {
                array.push({
                    ...doc.data(),
                    id: doc.id,
                });
            });

            setAppoinments(array);
        } catch (error) {}
    }
    //Función para eliminar una cita
    async function DeleteAppoinment(id) {
        try {
            const citas = Appoinments.filter((cita) => cita.id !== id);

            const ref = doc(firestore, `appoinments-${email}`, id);

            setAppoinments(citas);
            await deleteDoc(ref);
        } catch (error) {
            console.log(error);
        }
    }

    return {
        Appoinments,
        setAppoinments,
        CreateAppoinment,
        GetAppoinments,
        DeleteAppoinment,
    };
};
