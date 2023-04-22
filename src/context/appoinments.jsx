import React, { createContext, useState } from "react";

/** Contexto de las citas */
export const AppoinmentsContext = createContext(null);

/** Provee toda la informacion de las citas a la aplicación entera. */
export const AppoinmentsProvider = ({ children }) => {
    const [Appoinments, setAppoinments] = useState([]);

    return (
        <AppoinmentsContext.Provider
            value={{ Appoinments, setAppoinments }}
            children={children}
        />
    );
};
