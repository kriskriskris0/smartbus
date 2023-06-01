import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './index.css';

import useRoutes from '../../hooks/useRoutes';
import EmptyContent from '../../Components/EmptyContent';
import Preloader from '../../Components/Preloader';
import StopItem from '../Stops/StopItem';

const Routes = () => {
    const {isLoading, error, getAllRoutes, deleteRoute} = useRoutes();

    const {routes} = useSelector(state => state.app);

    React.useEffect(() => {
        getAllRoutes();
    }, []);

    return (
        <section className="stops content">
            <div className="container">
                <div className="stops__inner default__inner">
                    <div className="stops__wrapper">
                        <h1 className="title">Маршруты</h1>

                        <Link to="create" className="button default__button">Создать</Link>
                    </div>

                    <div className="stops__content default__content">
                        {error ? <EmptyContent text="Возникла ошибка"/> : isLoading
                            ? <Preloader page/>
                            : routes.length
                                ? <div className="main__wrapper">
                                    {routes.map((data, id) => <StopItem key={id} data={data} id={id + 1}
                                                                        deleteCallback={() => deleteRoute(data._id)}/>)}
                                </div>
                                : <EmptyContent text="Выберите маршрут"/>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Routes;