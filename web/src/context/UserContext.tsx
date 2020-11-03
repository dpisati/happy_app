import React, { useState, createContext} from 'react';

export interface IProviderProps {
    children?: any;
  }

type UserContextState = { 
    user_id: number;
    email: string;
    type: string;
    token: string;
}

const userDefaultValue = {
    user: {
        user_id: 0,
        email: "dasas@gmail.com",
        type: "user",
        token: "aaaaa"
    },
    setUser: (user: UserContextState) => {} // noop default callback
};  

export const UserContext = createContext(userDefaultValue);

export const UserProvider = (props: IProviderProps) => {
    const [user, setUser] = useState(userDefaultValue.user);
    return (
        <UserContext.Provider value={{user, setUser}}>
            {props.children}
        </UserContext.Provider>
    );
}
