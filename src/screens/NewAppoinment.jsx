import { Fragment, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useDatePicker } from "../hooks/useDatePicker";
import { Button } from "../components/button";
import { Timestamp } from "firebase/firestore";
import { useAppoinments } from "../hooks/useAppoinments";
import { useNavigation } from "@react-navigation/native";

// Pantalla para agendar nuevas citas
export const NewAppoinmentScreen = () => {
    const data = [
        { label: "Uñas", value: "nails" },
        { label: "Manicure", value: "manicure" },
        { label: "Gelish", value: "gelish" },
    ];

    const [value, setValue] = useState(null);
    const [Img, setImg] = useState(require("../assets/nails.jpg"));

    const [ModalShown, setModalShown] = useState(false);

    const { showDatePicker, showTimePicker, date } = useDatePicker();
    const { DateToString, TimeToString } = useDatePicker();

    useEffect(() => {
        if (value === "nails") setImg(require("../assets/nails.jpg"));
        if (value === "manicure") setImg(require("../assets/manicure.jpg"));
        if (value === "gelish") setImg(require("../assets/gelish.jpg"));
    }, [value]);

    const { CreateAppoinment } = useAppoinments();
    const { goBack } = useNavigation();

    async function Submit() {
        if (value === null) return;

        const appoinment = {
            time: Timestamp.fromDate(date),
            type: value,
        };
        await CreateAppoinment(appoinment);
        goBack();
    }

    return (
        <Fragment>
            <View style={styles.container}>
                <Text style={styles.title}>Cita</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    itemTextStyle={{ color: "black" }}
                    containerStyle={styles.containerStyle}
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Seleccionar servicio"
                    value={value}
                    onChange={(item) => {
                        setValue(item.value);
                    }}
                />
                <Image style={styles.image} source={Img} />
                <Button
                    width={200}
                    text={DateToString(date)}
                    onPress={showDatePicker}
                />
                <Button
                    width={200}
                    text={TimeToString(date)}
                    onPress={showTimePicker}
                />
                <Button
                    black
                    width={200}
                    text="Aceptar"
                    onPress={() => setModalShown(true)}
                />
            </View>
            {ModalShown && (
                <View style={styles.modal}>
                    <View style={styles.alert}>
                        <Text style={styles.alertText}>Agendar cita</Text>
                        <Text style={styles.alertText}>
                            Una vez agendada, no se podran modificar los datos
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
                                onPress={Submit}
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
    container: {
        backgroundColor: "white",
        height: "100%",
        alignItems: "center",
        gap: 30,
        padding: 24,
    },
    image: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
        borderRadius: 30,
    },
    title: {
        fontSize: 30,
        color: "black",
        textTransform: "uppercase",
        textAlign: "center",
        width: "100%",
    },
    text: {
        color: "black",
    },
    dropdown: {
        backgroundColor: "#E5E5E5",
        paddingHorizontal: 30,
        borderRadius: 25,
        height: 50,
        width: "100%",
    },
    placeholderStyle: {
        fontSize: 16,
        color: "black",
    },
    selectedTextStyle: {
        fontSize: 16,
        color: "black",
        borderRadius: 30,
    },
    containerStyle: {
        borderRadius: 30,
        overflow: "hidden",
    },
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
