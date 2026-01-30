import { useMutation, useQuery } from "@tanstack/react-query";
import {api2} from "../API/Axios/customAxios";


// export const addProduct = async (product) => {
//     console.log(product);
//     const response = await api.post('/product/add', {
//         body: product
//     });
    
// }

export const useAddProduct = () => {
    const {mutate: addProduct, isError, isSuccess, isLoading, error} = useMutation({
        mutationFn: (credential) => {
            return api2.post('/product/add', {
                ...credential
            });
        },
        onSuccess: (data) => {
            console.log('Product added successfully:', data);
            // Handle successful addition, e.g., show a success message
        },
        onError: (error) => {
            console.log('Failed to add product:', error.response?.data || error.message);
            // Handle addition error, e.g., show an error message
        }
    });
    return {addProduct, isError, isSuccess, isLoading, error};
}

export const fetchProducts = async () => {
    const response = await api2.get('/products');
    return response.data;
}

export const useFetchProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 30 * 60 * 1000, // 30 minutes
        onSuccess: (data) => {
            console.log('Products fetched successfully:', data);
            // Handle successful fetch, e.g., update state or show a message
        },
        onError: (error) => {
            console.log('Failed to fetch products:', error.response?.data || error.message);
            // Handle fetch error, e.g., show an error message
        }
    });
}
