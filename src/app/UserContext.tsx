import { createContext, type Dispatch, type SetStateAction } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export const IsLoggedIn = createContext<AuthContextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => {}
});