import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import "./App.css";

import {withSuspense} from './hoc/withSuspense';
import DefaultWrapper from './Components/Wrappers/DefaultWrapper';

import CreateStop from './pages/CreateStop';
import CreateRoute from './pages/CreateRoute';
const Main = React.lazy(() => import('./pages/Main'));
const Stops = React.lazy(() => import('./pages/Stops'));
const RoutesPage = React.lazy(() => import('./pages/Routes'));

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<DefaultWrapper />}>
                <Route index element={withSuspense(Main)} />
                <Route path="/stops" element={withSuspense(Stops)} />
                <Route path="/stops/create" element={withSuspense(CreateStop)} />
                <Route path="/stops/edit/:id" element={<CreateStop isEdit />} />
                <Route path="/routes" element={withSuspense(RoutesPage)} />
                <Route path="/routes/create" element={withSuspense(CreateRoute)} />
                <Route path="/routes/edit/:id" element={<CreateRoute isEdit />} />
                <Route path="*" element={<Navigate to={"/"} />} />
            </Route>
        </Routes>
    );
}

export default App;
