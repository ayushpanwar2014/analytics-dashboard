import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const backendURL = import.meta.env.VITE_BACKEND_URL;

export interface DashboardCharts {
    users: any;
    products: any;
    revenue: any;
    ratio: any;
}

export const useDashboardCharts = () => {
    return useQuery<DashboardCharts>({
        queryKey: ["dashboardCharts"],

        queryFn: async () => {
            const { data } = await axios.get(
                `${backendURL}/api/dashboard-charts/get-dashboard-charts`, { withCredentials: true }
            );

            if (!data.success) {
                throw new Error("Failed to fetch dashboard charts");
            }

            return data.data;
        },

        staleTime: 5 * 60_000,
        gcTime: 30 * 60_000,
        refetchOnWindowFocus: false,
        retry: 2,
    });
};