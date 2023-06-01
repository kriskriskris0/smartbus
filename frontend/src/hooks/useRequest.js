import React from 'react';
import axios from 'axios';

import {BASE_API_URL_ROUTE, BASE_API_URL_STOP} from '../consts/API_URLS';
import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

const useRequest = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const routeRequest = axios.create({
        baseURL: BASE_API_URL_ROUTE
    });

    const stopRequest = axios.create({
        baseURL: BASE_API_URL_STOP
    });

    const axiosInstancesMap = new Map([
        [REQUEST_TYPE.ROUTE, routeRequest],
        [REQUEST_TYPE.STOP, stopRequest]
    ]);

    const request = async (
        requestType = REQUEST_TYPE.USER,
        url,
        method = HTTP_METHODS.GET,
        data = {}
    ) => {
        setError(false);
        setIsLoading(true);

        const axiosInstance = axiosInstancesMap.get(requestType);

        try{
            const response = await axiosInstance.request({
                method,
                url,
                data
            });

            setIsLoading(false);

            return response.data;
        }
        catch(err){
            setError(true);
            setIsLoading(false);

            return err;
        }
    };

    return {isLoading, error, request};
}

export default useRequest;