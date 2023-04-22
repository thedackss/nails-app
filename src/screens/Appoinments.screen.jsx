import { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AppoinmentsContext } from "../context/appoinments";
import { Button } from "../components/button";
import { useNavigation } from "@react-navigation/native";
import { AppoinmentPreview } from "../components/appoinmentPreview";

// Pantalla de citas
export const AppointmentsScreen = () => {
    const { Appoinments } = useContext(AppoinmentsContext);
    const { navigate } = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis citas</Text>

            <View
                style={{
                    width: "100%",
                    height: "80%",
                    marginBottom: 30,
                }}
            >
                {Appoinments.length < 1 ? (
                    <View
                        style={{
                            height: "100%",
                            width: "100%",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={styles.text}>Sin citas</Text>
                    </View>
                ) : (
                    <ScrollView style={{ overflow: "scroll", height: "100%" }}>
                        {Appoinments.map((cita) => (
                            <AppoinmentPreview
                                key={cita.id}
                                id={cita.id}
                                time={cita.time}
                                type={cita.type}
                            />
                        ))}
                    </ScrollView>
                )}
            </View>
            <Button
                text="Agendar cita"
                black
                width={150}
                fontWeight="500"
                onPress={() => navigate("new-appoinment")}
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
        // gap: 30,
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
        textAlign: "center",
    },
});
