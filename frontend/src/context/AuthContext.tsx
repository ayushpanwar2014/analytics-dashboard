import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type User = {
    email: string;
    image?: string;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
};

export const backendURL = import.meta.env.VITE_BACKEND_URL;

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // check if user already logged in
    const fetchUser = async () => {
        try {
            const res = await axios.get(`${backendURL}/api/user/get-user`, { withCredentials: true });
            setUser(res.data.data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = async (email: string, password: string) => {
        await axios.post(
            `${backendURL}/api/user/login`,
            { email, password },
            { withCredentials: true }
        );

        await fetchUser();
    };

    const logout = async () => {
        await axios.post(
            `${backendURL}/api/user/logout`,
            {},
            { withCredentials: true }
        );

        setUser(null);
    };

    const register = async (email: string, password: string) => {
        await axios.post(
            `${backendURL}/api/user/register`,
            { email, password },
            { withCredentials: true }
        );

        await fetchUser();
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext)!;
};