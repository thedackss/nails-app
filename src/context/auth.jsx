import React, { createContext, useState } from "react";

/** Contexto del inicio de sesión */
export const AuthContext = createContext(null);

/** Provee toda la informacion del inicio de sesion a la aplicación entera. */
export const AuthProvider = ({ children }) => {
    /** Valor por defecto del inico de sesión */
    const Default = {
        logged: false,
        user: null,
    };

    const [AuthStatus, setAuthStatus] = useState(Default);
    const [AppLoading, setAppLoading] = useState(true);

    return (
        <AuthContext.Provider
            value={{ AuthStatus, setAuthStatus, AppLoading, setAppLoading }}
            children={children}
        />
    );
};
