import {} from "react";
import { StyleSheet, TextInput, View } from "react-native";

//Componente custom entrada de texto
export const Input = ({
    value,
    setValue,
    placeholder,
    width,
    height,
    fontSize,
    keyboardType,
    password,
    disabled,
}) => {
    const styles = StyleSheet.create({
        container: {
            width: width ? width : "50%",
            height: height ? height : 40,
            justifyContent: "center",
            borderRadius: 30,
            paddingHorizontal: 15,
            elevation: 3,
            shadowColor: "black",
            backgroundColor: "white",
        },
        input: {
            fontSize: fontSize ? fontSize : 12,
            padding: 0,
            width: "100%",
            height: "100%",
            textAlignVertical: "center",
            color: "black",
        },
    });

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                placeholderTextColor="rgba(0,0,0,.5)"
                keyboardType={keyboardType}
                secureTextEntry={password ? true : false}
                editable={!disabled}
            />
        </View>
    );
};
