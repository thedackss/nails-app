import {} from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAppoinments } from "../hooks/useAppoinments";
import { Button } from "./button";
import { useDatePicker } from "../hooks/useDatePicker";

// Es la vista previa de una cita para ver su información así como su folio, tipo de cita y su fecha
export const AppoinmentPreview = ({ id, type, time }) => {
    let img;

    // aqui dependiendo del tipo de cita pone una imagen u otra
    if (type === "nails") img = require("../assets/nails.jpg");
    if (type === "manicure") img = require("../assets/manicure.jpg");
    if (type === "gelish") img = require("../assets/gelish.jpg");

    // aqui es para pasar del ingles al español el tipo de cita
    function Translate(text) {
        if (text === "nails") return "Uñas";
        if (text === "manicure") return "Manicure";
        if (text === "gelish") return "Gelish";
        return "NO";
    }

    // esta función formate la fecha en DD-MM-AAAA
    function DateFormat(date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        if (month < 10) return `${day}-0${month}-${year}`;
        else return `${day}-${month}-${year}`;
    }

    // hacemos uso de la función para eliminar una cita
    const { DeleteAppoinment } = useAppoinments();

    // Se usa la función para formatear la fecha en HH-MM {AM o PM} con la libreria useDatePicker
    const { TimeToString } = useDatePicker();

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <View style={{ flexDirection: "row", gap: 5 }}>
                    <Text style={styles.label}>Folio</Text>
                    <Text style={styles.text}>{id}</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 5 }}>
                    <Text style={styles.label}>Fecha</Text>
                    <Text style={styles.text}>{DateFormat(time.toDate())}</Text>
                    <Text style={styles.text}>
                        {TimeToString(time.toDate())}
                    </Text>
                </View>

                <View style={{ flexDirection: "row", gap: 5 }}>
                    <Text style={styles.label}>Tipo</Text>
                    <Text style={styles.text}>{Translate(type)}</Text>
                </View>

                <Button
                    text="Eliminar"
                    style={{
                        position: "absolute",
                        right: 15,
                        bottom: 25,
                        padding: 8,
                        backgroundColor: "#ae2012",
                    }}
                    fontWeight="500"
                    black
                    fontSize={10}
                    width={80}
                    height={30}
                    onPress={() => DeleteAppoinment(id)}
                />
            </View>
            <Image style={styles.image} source={img} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 15,
        position: "relative",
        width: "100%",
        height: 120,
        overflow: "hidden",
        elevation: 5,
        shadowColor: "black",
        marginBottom: 30,
    },
    container2: {
        padding: 15,
        gap: 10,
    },
    title: {
        fontSize: 30,
        color: "black",
        textTransform: "uppercase",
        textAlign: "center",
        width: "100%",
    },
    label: {
        backgroundColor: "#222",
        color: "white",
        borderRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: 2.5,
        fontWeight: "500",
        width: 60,
        textAlign: "center",
    },
    text: {
        backgroundColor: "white",
        color: "black",
        borderRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: 2.5,
        fontWeight: "500",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: -1,
        opacity: 0.5,
    },
});
