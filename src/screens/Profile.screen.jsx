import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { Input } from "../components/input";
import { default_img } from "../..";
import { Button } from "../components/button";
import { useProfile } from "../hooks/useProfile";

// Pantalla donde se muestra la información del perfil
export const ProfileScreen = ({}) => {
    const { AuthStatus, CerrarSesion } = useAuth();
    const { EditProfile } = useProfile();

    const img = AuthStatus.user.img === default_img ? "" : AuthStatus.user.img;

    const [Phone, setPhone] = useState(AuthStatus.user.phone);
    const [Img, setImg] = useState(img);

    const [changes, setChanges] = useState(false);

    useEffect(() => {
        if (AuthStatus.user.phone !== Phone || Img !== img) setChanges(true);
        else setChanges(false);
    }, [Phone, Img]);

    async function Submit() {
        await EditProfile(AuthStatus.user.email, {
            img: Img === default_img || Img === "" ? default_img : Img,
            phone: Phone,
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>
            <Image
                source={{
                    uri: AuthStatus.user.img,
                }}
                style={styles.image}
            />
            <View style={{ width: "90%", gap: 10 }}>
                <Text style={styles.label}>Telefono</Text>
                <Input
                    value={Phone}
                    setValue={setPhone}
                    placeholder="Phone"
                    keyboardType="name-phone-pad"
                    height={50}
                    width="100%"
                />
                <Text style={styles.label}>Imagen url</Text>
                <Input
                    value={Img}
                    setValue={setImg}
                    placeholder="Image url"
                    keyboardType="url"
                    height={50}
                    width="100%"
                />
            </View>
            <Button
                text="Guardar cambios"
                width={200}
                black
                disabled={!changes}
                onPress={Submit}
            />
            <Button
                text="Cerrar sesión"
                width={200}
                black
                onPress={CerrarSesion}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",
        alignItems: "center",
        padding: 24,
        gap: 30,
    },
    title: {
        fontSize: 30,
        color: "black",
        textTransform: "uppercase",
        textAlign: "center",
        width: "100%",
    },
    label: {
        fontSize: 16,
        width: "100%",
        color: "black",
        textTransform: "uppercase",
        textAlign: "center",
    },
    image: {
        width: Dimensions.get("window").width / 2,
        height: Dimensions.get("window").width / 2,
        borderRadius: 100,
    },
});
