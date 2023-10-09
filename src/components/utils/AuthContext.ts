import { createContext } from 'react';
import User from '../../domain/model/User';

// Create the context
export interface AuthContextProvider {
    user: User,
    setUser: (user: User) => void
}

export const Guest: User = {
    userId: -1,
    userName: "",
    password: "",
    email: "",
    role: "Guest"
}

export const AuthContext = createContext<AuthContextProvider>({
    user: Guest,
    setUser: function (u: User) { this.user = u }
});