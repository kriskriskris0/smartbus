import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';
import useRequest from './useRequest';
import { initCurrentRoute, initRoutes, removeRoute, addRoute, updateRoute } from '../redux/slices/app';

const useRoutes = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    const {request} = useRequest();
    const {routes} = useSelector(state => state.app);
    const dispatch = useDispatch();

    const getAllRoutes = async () => {
        setError(false);
        setIsLoading(true);

        if(!routes.length){
            const data = await request(REQUEST_TYPE.ROUTE, "/", HTTP_METHODS.GET);

            if(data.message === "Network Error" || data?.response?.data?.error){
                setError(true);
            }
            else{
                dispatch(initRoutes(data));
            }
        }

        setIsLoading(false);
    }

    const getRouteById = async (id) => {
        setError(false);
        setIsLoading(true);

        const data = await request(REQUEST_TYPE.ROUTE, `/${id}`, HTTP_METHODS.GET);

        setIsLoading(false);

        if(data.message === "Network Error" || data?.response?.data?.error){
            return setError(true);
        }

        dispatch(initCurrentRoute(data));
    }

    const deleteRoute = async (id) => {
        setError(false);
        setIsLoading(true);

        const data = await request(REQUEST_TYPE.ROUTE, `/${id}`, HTTP_METHODS.DELETE);

        setIsLoading(false);

        if(data.message === "Network Error" || data?.response?.data?.error){
            return setError(true);
        }

        dispatch(removeRoute(data));
    }

    const createRoute = async (name, path, successCallback = () => {}) => {
        setError(false);
        setIsLoading(true);

        const data = await request(REQUEST_TYPE.ROUTE, "/", HTTP_METHODS.POST, {
            name,
            path
        });

        setIsLoading(false);

        if(data.message === "Network Error" || data?.response?.data?.error){
            return setError(true);
        }

        dispatch(addRoute(data));
        successCallback();
    }

    const editRoute = async (id, name, path, successCallback = () => {}) => {
        setError(false);
        setIsLoading(true);

        const data = await request(REQUEST_TYPE.ROUTE, `/${id}`, HTTP_METHODS.PUT, {
            name,
            path
        });

        setIsLoading(false);

        if(data.message === "Network Error" || data?.response?.data?.error){
            return setError(true);
        }

        dispatch(updateRoute(data));
        successCallback();
    }

    return {isLoading, error, getAllRoutes, getRouteById, deleteRoute, createRoute, editRoute};
}

export default useRoutes;