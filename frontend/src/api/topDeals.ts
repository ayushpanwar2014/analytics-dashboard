import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const backendURL = import.meta.env.VITE_BACKEND_URL;

export interface TopDealUser {
    _id: string;
    username: string;
    email: string;
    img: string;
    amount: number;
}

export const useTopDealUsers = () => {
    return useQuery<TopDealUser[]>({
        queryKey: ["topDealUsers"],
        queryFn: async () => {
            const { data } = await axios.get(
                `${backendURL}/api/top-deal/get-top-users`, { withCredentials: true }
            );

            if (!data.success) {
                throw new Error("Failed to fetch top deal users");
            }

            return data.data;
        },

        staleTime: 5 * 60_000,
        gcTime: 30 * 60_000,
        refetchOnWindowFocus: false,
        retry: 2,
    });
};