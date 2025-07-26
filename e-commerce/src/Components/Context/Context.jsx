
import React, { useState } from 'react';
// Create a new context
const MyContext = React.createContext();

const MyContextProvider = ({ children }) => {
    let [token, setToken] = useState(null);
    return (
        <MyContext.Provider value={{ token, setToken}}>
            {children}
        </MyContext.Provider>
    );
};

export { MyContext, MyContextProvider };