import { StyleSheet, Text, View } from "react-native";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

//Pantalla para crear un usuario
export const SignUpScreen = ({}) => {
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [Password, setPassword] = useState("");
    const [Password2, setPassword2] = useState("");
    const [Error, setError] = useState("");

    const { Registrarse } = useAuth();

    async function Submit() {
        const email = Email.trim().toLowerCase();
        const phone = Phone.trim();
        const pass = Password.trim();
        const pass2 = Password2.trim();

        if (email.length < 5) return setError("Correo invalido");
        if (phone.length < 10) return setError("Telefono invalido");
        if (pass.length < 6) return setError("Contraseña muy corta");
        if (pass !== pass2) return setError("Las contraseñas no coinciden");
        setError("");

        const { message } = await Registrarse(email, phone, pass);
        setError(message);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrarse</Text>
            <Input
                value={Email}
                setValue={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                height={50}
                width="80%"
            />
            <Input
                value={Phone}
                setValue={setPhone}
                placeholder="Telefono"
                keyboardType="name-phone-pad"
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
            <Input
                value={Password2}
                setValue={setPassword2}
                placeholder="Confirmar contraseña"
                height={50}
                width="80%"
            />
            <Button text="Crear cuenta" width="80%" black onPress={Submit} />
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
