import axios from 'axios';
import { useState } from 'react';
import Cookies from "js-cookie";
const BASE_URL = 'https://abtest-shenkar.onrender.com';
const ROUTES = {
    login: '/auth/login',
    users: '/users',
    resetPassword: '/auth/login/password',
    signup: '/auth/register',
    confirmcode: '/auth/register/code',
    logout: '/auth/logout'
};

const useApi = () => {
    const jwt = Cookies.get("jwt");
    const [loading, setLoading] = useState(false);

    const apiResponse = (data, errors = null) => {
        return { data, errors };
    };
    const signIn = async ({ email, password }) => {
        setLoading(true);
        try {
            const { data } = await axios.post(BASE_URL + ROUTES.login, { email, password });
            console.log({ signIn: data });
            setLoading(false);
            Cookies.set("email", data.email)
            return apiResponse(data);
        } catch (e) {
            setLoading(false);
            return apiResponse(null, e.message);
        }
    };
    const signUp = async ({ name, email, password }) => {
        setLoading(true);
        console.log(name, email, password)
        try {
            const { data } = await axios.post(BASE_URL + ROUTES.signup,
                { name, email, password },
                {headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            setLoading(false);
            return apiResponse(data);
        } catch (e) {
            setLoading(false);
            return apiResponse(null, e.message);
        }
    };

    const verifyCode = async ({ name, email, password, code}) => {
        setLoading(true);
        try {
            const { data } = await axios.post(BASE_URL + ROUTES.confirmcode,
                { name, email, password, code },
                {headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(data)
            setLoading(false);
            return apiResponse(data);
        } catch (e) {
            setLoading(false);
            return apiResponse(null, e.message);
        }
    };

    const resetPassword = async (email) => {
        try {
            setLoading(true);
            const { data } = await axios.put(
                BASE_URL + ROUTES.resetPassword,
                { email },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            setLoading(false);
            return apiResponse(data);
        } catch (e) {
            setLoading(false);
            return apiResponse(null, e.message);
        }
    };
    const signOut = async ({ email}) => {

        console.log("useAPI SignOut: " + email);
        setLoading(true);
        try {
            const { data } = await axios.post(BASE_URL + ROUTES.logout,
                { email },
                {
                headers: {
                    'authorization': `${jwt}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log({ signOut: data });
            setLoading(false);
            return apiResponse(data);
        } catch (e) {
            setLoading(false);
            return apiResponse(null, e.message);
        }

    };
    const GoogleApi = async (response) => {
        console.log('google login')
        setLoading(true);
        try{
            const {data} = await axios.post('https://abtest-shenkar.onrender.com/auth/handleGoogle',
                {credential: response.credential},
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
        console.log(data);
        return apiResponse(data);
        }catch (error){
            console.log(error);
        }
        setLoading(false);


    };

    const [api] = useState({ signIn, resetPassword, signUp, verifyCode, signOut });
    return [api, loading];
};

export default useApi;
