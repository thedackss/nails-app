import { Fragment, useEffect, useState } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import { Button } from "./button";

// Componente para un modal que al final no se termino usando
export const CloseAppModal = ({ children }) => {
    const [ModalShown, setModalShown] = useState(false);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            (e) => {
                setModalShown(!ModalShown);

                return true;
            }
        );
        return () => backHandler.remove();
    }, [ModalShown]);

    return (
        <Fragment>
            {children}
            {ModalShown && (
                <View style={styles.modal}>
                    <View style={styles.alert}>
                        <Text style={styles.alertText}>
                            ¿Cerrar la aplicación?
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                gap: 20,
                            }}
                        >
                            <Button
                                text="Sí"
                                width="40%"
                                fontWeight="500"
                                onPress={() => {
                                    setModalShown(false);
                                    BackHandler.exitApp();
                                }}
                            />
                            <Button
                                text="No"
                                width="40%"
                                black
                                fontWeight="500"
                                onPress={() => setModalShown(false)}
                            />
                        </View>
                    </View>
                </View>
            )}
        </Fragment>
    );
};

const styles = StyleSheet.create({
    modal: {
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, .75)",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    alert: {
        backgroundColor: "white",
        borderRadius: 30,
        padding: 20,
        width: "70%",
        elevation: 10,
        shadowColor: "black",
        gap: 20,
    },
    alertText: {
        color: "black",
        textAlign: "center",
        fontWeight: "500",
        fontSize: 15,
    },
});
