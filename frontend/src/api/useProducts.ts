import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const backendURL = import.meta.env.VITE_BACKEND_URL;

export interface Product {
    id: string;
    img: string;
    title: string;
    color: string;
    producer: string;
    price: number;
    createdAt: string;
    inStock: boolean;
}

export const useProducts = () => {
    return useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const { data } = await axios.get(
                `${backendURL}/api/product/get-products`,
                { withCredentials: true }
            );

            if (!data.success) {
                throw new Error("Failed to fetch products");
            }

            return data.data;
        },

        staleTime: 5 * 60_000,
        gcTime: 30 * 60_000,
        refetchOnWindowFocus: false,
        retry: 2,
    });
};