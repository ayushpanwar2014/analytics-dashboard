import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const backendURL = import.meta.env.VITE_BACKEND_URL;

export interface UserAnalytics {
    _id: string;
    img: string;
    fullname: string;
    email: string;
    phone: string;
    status: string;
    createdAt: string;
}

export const useUsersAnalytics = () => {
    return useQuery({
        queryKey: ["usersAnalytics"],

        queryFn: async () => {
            const { data } = await axios.get(
                `${backendURL}/api/user-analytics/get-users-analytics`,
                { withCredentials: true }
            );

            if (!data.success) {
                throw new Error("Failed to fetch users");
            }

            return data.data;
        },

        staleTime: 5 * 60_000,
        retry: 2,
    });
};