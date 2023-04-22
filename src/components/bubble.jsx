import {} from "react";
import { StyleSheet, View } from "react-native";

// componente burbuja que son los adornos para algunas pantallas
export const Bubble = ({ top, left, size, color }) => {
    const styles = StyleSheet.create({
        bubble: {
            width: size ? size : 100,
            height: size ? size : 100,
            backgroundColor: color ? color : "#323232",
            borderRadius: 100,
            position: "absolute",
            left: left ? left : 0,
            top: top ? top : 0,
        },
    });

    return <View style={styles.bubble} />;
};
