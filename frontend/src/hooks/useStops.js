import React from 'react';
import { useSelector } from 'react-redux';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';
import useRequest from './useRequest';

const useStops = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    const {request} = useRequest();
    const {stops} = useSelector(state => state.app);

    const getAllStops = async () => {
        setError(false);
        setIsLoading(true);

        if(!stops.length){
            const data = await request(REQUEST_TYPE.STOP, "/", HTTP_METHODS.GET);

            if(data.message === "Network Error" || data?.response?.data?.error){
                setError(true);
            }
        }

        setIsLoading(false);
    }

    const createStop = async (name, successCallback = () => {}) => {
        setError(false);
        setIsLoading(true);

        const data = await request(REQUEST_TYPE.STOP, "/", HTTP_METHODS.POST, {
            name
        });

        if(data.message === "Network Error" || data?.response?.data?.error){
            setError(true);
        }
        else{
            successCallback();
        }

        setIsLoading(false);
    }

    const deleteStop = async (id) => {
        setError(false);
        setIsLoading(true);

        const data = await request(REQUEST_TYPE.STOP, `/${id}`, HTTP_METHODS.DELETE);

        if(data?.message === "Network Error"){
            setError(true);
        }
        else if(data?.response?.data?.error){
            alert("Нельзя удалить остановку, которая используется в маршруте");
        }

        setIsLoading(false);
    }

    const editStop = async (id, name, successCallback = () => {}) => {
        setError(false);
        setIsLoading(true);

        const data = await request(REQUEST_TYPE.STOP, `/${id}`, HTTP_METHODS.PUT, {
            name
        });

        if(data.message === "Network Error" || data?.response?.data?.error){
            setError(true);
        }
        else{
            successCallback();
        }

        setIsLoading(false);
    }

    return {isLoading, error, getAllStops, createStop, deleteStop, editStop};
}

export default useStops;