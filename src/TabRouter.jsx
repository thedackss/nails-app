import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppointmentsScreen } from "./screens/Appoinments.screen";
import { ProfileScreen } from "./screens/Profile.screen";
import { Image } from "react-native";
import { useEffect } from "react";
import { useAppoinments } from "./hooks/useAppoinments";

//Navegador interno para las citas y el perfil
export const TabRouter = ({}) => {
    const { Navigator, Screen } = createBottomTabNavigator();

    const { GetAppoinments } = useAppoinments();

    useEffect(() => {
        GetAppoinments();
    }, []);

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                options={{
                    tabBarIcon: () => (
                        <Image
                            style={{
                                width: 40,
                                height: "100%",
                                resizeMode: "cover",
                            }}
                            source={require("./assets/profile.png")}
                        ></Image>
                    ),
                    title: "Perfil",
                }}
                name="profile"
                component={ProfileScreen}
            />

            <Screen
                name="appoinments"
                options={{
                    tabBarIcon: () => (
                        <Image
                            style={{
                                width: 40,
                                height: "100%",
                                resizeMode: "cover",
                            }}
                            source={require("./assets/citas.png")}
                        ></Image>
                    ),
                    title: "Citas",
                }}
                component={AppointmentsScreen}
            />
        </Navigator>
    );
};
