import {} from "react";
import { Pressable, StyleSheet, Text } from "react-native";

//Componente boton personalizado
export const Button = ({
    text,
    width,
    height,
    fontSize,
    fontWeight,
    black,
    onPress,
    disabled,
    style,
}) => {
    const styles = StyleSheet.create({
        button: {
            backgroundColor: black ? "black" : "white",
            borderRadius: 30,
            padding: 10,
            width: width ? width : 100,
            height: height ? height : 40,
            elevation: 2,
            shadowColor: "black",
            opacity: disabled ? 0.8 : 1,
        },
        text: {
            color: black ? "white" : "black",
            textAlign: "center",
            textAlignVertical: "center",
            fontSize: fontSize ? fontSize : 15,
            fontWeight: fontWeight ? fontWeight : "300",
            textTransform: "uppercase",
        },
    });

    return (
        <Pressable
            style={[styles.button, style]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};
