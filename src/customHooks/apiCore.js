/*
import axios from 'axios';
import { useState } from 'react';
import Cookies from "js-cookie";
const BASE_URL = 'https://core-team-final-assignment.onrender.com/BI';
const ROUTES = {
    payments: '/payments',
    ARR: '/ARR',
    MRR: '/MRR',
    DRR: '/DRR',
    experiments: '/experiments',
    geo_device: '/experiments/attributes'
};


const currentDate = new Date();
const year = currentDate.getFullYear();
const currentTimeInMs = currentDate.getTime();
const month = currentDate.getMonth()+1;
const day = currentDate.getDate();

const useApi = () => {
    const jwt = Cookies.get("jwt");
    const [loading, setLoading] = useState(false);

    const apiResponse = (data, errors = null) => {
        return { data, errors };
    };

    const payments = async () => {
        try {
            console.log(BASE_URL + ROUTES.payments+`/${year}/${month}`)
            setLoading(true);
            const {data} = await axios.get(
                BASE_URL + ROUTES.payments+`/${year}/${month}`,
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
    }

    const [api] = useState({ payments });
    return [api, loading];
};

export default useApi;
*/
