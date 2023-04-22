import { Dimensions, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../components/button";
import { Bubble } from "../components/bubble";

//Pantalla donde inicia la aplicación
export const WelcomeScreen = () => {
    const { navigate } = useNavigation();

    return (
        <View style={styles.container}>
            <Bubble left={-75} top={0} size={150} />
            <Bubble left={10} top={50} />
            <Bubble left={Dimensions.get("screen").width - 50} top="50%" />

            <View style={styles.section}>
                <Button
                    text="Iniciar sesión"
                    width="40%"
                    black
                    onPress={() => navigate("sign-in")}
                />
                <Button
                    text="Registrarse"
                    width="40%"
                    onPress={() => navigate("sign-up")}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E7BDF5",
        height: "100%",
        flexDirection: "column-reverse",
    },
    section: {
        backgroundColor: "white",
        height: "40%",
        borderTopLeftRadius: 55,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
    },
});
