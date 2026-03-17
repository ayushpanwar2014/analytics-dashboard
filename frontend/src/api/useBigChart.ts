import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const backendURL = import.meta.env.VITE_BACKEND_URL;

export const useBigChart = () => {
    return useQuery({
        queryKey: ["bigChart"],

        queryFn: async () => {
            const { data } = await axios.get(
                `${backendURL}/api/dashboard-charts/get-big-charts`,
                { withCredentials: true }
            );

            if (!data.success) {
                throw new Error("Failed to fetch chart");
            }

            return data.data;
        },

        staleTime: 5 * 60_000,
        gcTime: 30 * 60_000,
        refetchOnWindowFocus: false,
        retry: 2,
    });
};