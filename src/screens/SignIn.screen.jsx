import { StyleSheet, Text, View } from "react-native";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

// Pantalla para iniciar sesión
export const SignInScreen = ({}) => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Error, setError] = useState("");

    const { IniciarSesion } = useAuth();

    async function Submit() {
        const email = Email.trim().toLowerCase();
        const pass = Password.trim();

        if (email.length < 5) return setError("Correo invalido");
        if (pass.length < 6) return setError("Contraseña muy corta");
        setError("");

        const { message } = await IniciarSesion(email, pass);
        setError(message);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar sesión</Text>
            <Input
                value={Email}
                setValue={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                height={50}
                width="80%"
            />
            <Input
                value={Password}
                setValue={setPassword}
                placeholder="Contraseña"
                height={50}
                width="80%"
            />
            <Button text="Iniciar sesión" width="80%" black onPress={Submit} />
            <Text style={styles.text}>{Error}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
    },
    title: {
        fontSize: 30,
        color: "black",
        textTransform: "uppercase",
        textAlign: "center",
    },
    text: {
        color: "red",
    },
});
