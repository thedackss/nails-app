import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {} from "react";
import { useAuth } from "./hooks/useAuth";
import { SignInScreen } from "./screens/SignIn.screen";
import { SignUpScreen } from "./screens/SignUp.screen";
import { WelcomeScreen } from "./screens/Welcome.screen";
import { TabRouter } from "./TabRouter";
import { NewAppoinmentScreen } from "./screens/NewAppoinment";

// Navegador donde se declaran las pantallas
export const Router = ({}) => {
    const { Navigator, Group, Screen } = createNativeStackNavigator();

    const { AuthStatus } = useAuth();

    return (
        <NavigationContainer>
            <Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {AuthStatus.logged ? (
                    <Group>
                        <Screen name="main" component={TabRouter} />
                        <Screen
                            name="new-appoinment"
                            component={NewAppoinmentScreen}
                        />
                    </Group>
                ) : (
                    <Group>
                        <Screen name="welcome" component={WelcomeScreen} />
                        <Screen name="sign-in" component={SignInScreen} />
                        <Screen name="sign-up" component={SignUpScreen} />
                    </Group>
                )}
            </Navigator>
        </NavigationContainer>
    );
};
