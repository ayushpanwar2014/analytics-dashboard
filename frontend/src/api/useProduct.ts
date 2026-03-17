import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const backendURL = import.meta.env.VITE_BACKEND_URL;

export const useProduct = (id: string) => {
    return useQuery({
        queryKey: ["product", id],

        queryFn: async () => {
            const { data } = await axios.get(
                `${backendURL}/api/product/${id}`,
                { withCredentials: true }
            );

            if (!data.success) {
                throw new Error("Failed to fetch product");
            }

            return data.data;
        },

        enabled: !!id,
        staleTime: 10 * 1000, // 10 seconds
    });
};