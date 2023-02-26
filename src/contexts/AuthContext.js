import { createContext } from 'react';

export const AuthContext = createContext({
    loggedInUser: null,
    setLoggedInUser: () => {},
    role: null,
    setRole: () => {},
    name: null,
    setName: () => {},
    accountId: null,
    setAccountId: () => {}
});
