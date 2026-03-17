import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const backendURL = import.meta.env.VITE_BACKEND_URL;

export interface BarChartData {
    profit: any;
    visit: any;
}

export const useBarCharts = () => {
    return useQuery<BarChartData>({
        queryKey: ["barCharts"],

        queryFn: async () => {
            const { data } = await axios.get(
                `${backendURL}/api/bar-charts/get-bar-charts`, { withCredentials: true }
            );

            if (!data.success) {
                throw new Error("Failed to fetch bar charts");
            }

            return data.data;
        },

        staleTime: 5 * 60_000,
        gcTime: 30 * 60_000,
        refetchOnWindowFocus: false,
        retry: 2,
    });
};