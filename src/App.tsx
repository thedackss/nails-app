import {} from "react";
import { Router } from "./Router";
import { AuthProvider } from "./context/auth";
import { AppoinmentsProvider } from "./context/appoinments";

export const App = ({}): JSX.Element => {
    return (
        <AuthProvider>
            <AppoinmentsProvider>
                <Router />
            </AppoinmentsProvider>
        </AuthProvider>
    );
};
