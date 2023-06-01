import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    routes: [],
    stops: [],
    currentRoute: {}
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        initRoutes: (state, action) => {
            state.routes = action.payload;
        },
        initStops: (state, action) => {
            state.stops = action.payload;
        },
        initCurrentRoute: (state, action) => {
            state.currentRoute = action.payload;
        },
        addStop: (state, action) => {
            state.stops = [...state.stops, action.payload];
        },
        removeStop: (state, action) => {
            if(!action.payload._id){
                return;
            }

            state.stops = state.stops.filter(item => item._id !== action.payload._id);
        },
        updateStop: (state, action) => {
            if(!action.payload){
                return;
            }

            state.stops = state.stops.map(item => item._id === action.payload._id ? action.payload : item);
        },
        removeRoute: (state, action) => {
            if(!action.payload._id){
                return;
            }

            state.routes = state.routes.filter(item => item._id !== action.payload._id);
        },
        addRoute: (state, action) => {
            state.routes = [...state.routes, action.payload];
        },
        updateRoute: (state, action) => {
            if(!action.payload){
                return;
            }

            state.routes = state.routes.map(item => item._id === action.payload._id ? action.payload : item);
        }
    }
});

export const {
    initRoutes,
    initStops,
    initCurrentRoute,
    addStop,
    removeStop,
    updateStop,
    removeRoute,
    addRoute,
    updateRoute
} = appSlice.actions;

export default appSlice.reducer;
