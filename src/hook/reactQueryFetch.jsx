import React from 'react'
import { useMutation } from '@tanstack/react-query';
import  api from '../API/Axios/customAxios'; // Adjust the import path as necessary
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSignInFetch = () => {
    const navigate = useNavigate();

    const {mutate: login, isLoading, isError, isSuccess} = useMutation({
        mutationFn: (credential) => {
          return api.post('/auth/login', {
            remember: credential.remember,
            email: credential.email,
            password: credential.password
          });
      },
        onSuccess: (data) => {
          console.log('Login successful:', data);
          // Handle successful login, e.g., redirect or show a success message
        //   setTimeout(() => {
        //     navigate('/');
        //   }, 5000) 
        },
        onError: (error) => {
          return console.log('Login failed:', error.response?.data || error.message);
          // Handle login error, e.g., show an error message
        }
      });

  return {login, isLoading, isError, isSuccess}
}

export const useSignUpFetch = () => {

    const {mutate: signUp, isPending, error, isSuccess} = useMutation({
        mutationFn: (credential) => {
          return api.post('/auth/signup', {
            name: credential.name,
            email: credential.email,
            password: credential.password
          });
      },
        onSuccess: (data) => {
            
          console.log('Login successful:', data);
          // Handle successful login, e.g., redirect or show a success message
        },
        onError: (error) => {
          console.log('Login failed:', error.response?.data || error.message);
          // Handle login error, e.g., show an error message
        }
      });

  return {signUp, isPending, error, isSuccess}
}

export const useFetchMe = () => {

    const { data, isLoading, refetch} = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
          const res = await api.get('/auth/me');
            return res.data;
        },retry: 1
        //enabled: false,
        //enabled: false // Disable automatic query on mount
      });
      

  return {data, isLoading, refetch}
}

export const useRefresh = () => {

    const navigate = useNavigate();

    const {mutate: refresh, data, isLoading, refetch} = useMutation({
        queryKey: ['refresh'],
        mutationFn: async () => {
            const res = await api.post('/auth/refresh');
            return res.data;
        },retry: 1,
        onSuccess: (data) => {  
          console.log('Login successful:', data);
          // Handle successful login, e.g., redirect or show a success message
        },
        onError: (error) => {
          console.log('Login failed:', error.response?.data || error.message);
          if(error.response?.status === 403){
            navigate('/login')
          }
          // Handle login error, e.g., show an error message
        }
        //enabled: false // Disable automatic query on mount
      });

  return { data, refresh, isLoading}
}

export const useSignInGoogle = () => {

    const [response, setResponse] = useState(null);



    const { data, isLoading, refetch, isError, isSuccess} = useQuery({
        queryKey: ['signInGoogle', response?.credential],
        queryFn: async ({ queryKey }) => {
          const res = await api.get('/auth/googlesignup',{
            // You can now send the token to your backend for verification if needed
            headers: {
              'Content-Type': 'application/json',
              'credentials': response?.credential
            }
          });
            const data = res;
            console.log(data)
            return data;
        },retry: 1,                  
      });

        useEffect(() => {
            window.google.accounts.id.initialize({
            client_id: '132634940514-dsvmnnrjih86c3fma4l39upurclitp2k.apps.googleusercontent.com',
            callback: handleCredentialResponse,
            //auto_select: false,
            //hd: '*',
            use_fedcm_for_prompt: 'true',
            //use_fedcm_for_button: true,
            });
        }, []);

        async function handleCredentialResponse(response) {
            try {
                setResponse(response);
                await refetch();
                if(isSuccess) {
                console.log('Google login successful:', data);
                } else if (isError) {
                console.log('Google login failed');
                }
            } catch (error) {
                console.error('Error during Google login:', error);
            }

            
            // Handle the response from your backend as needed
        }

    // Handle the response from your backend as needed
    return { data, isLoading, refetch, isError, isSuccess, setResponse, response}
}
