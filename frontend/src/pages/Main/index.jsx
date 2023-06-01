import React from 'react';
import { Select } from 'antd';

import './index.css';

import useRoutes from '../../hooks/useRoutes';

import EmptyContent from '../../Components/EmptyContent';
import Preloader from '../../Components/Preloader';
import ScheduleItem from './ScheduleItem';
import { useSelector } from 'react-redux';

const Main = () => {
    const [routeId, setRoudeId] = React.useState();

    const {isLoading, error, getAllRoutes, getRouteById} = useRoutes();

    const {routes, currentRoute} = useSelector(state => state.app);

    React.useEffect(() => {
        getAllRoutes();
    }, []);

    React.useEffect(() => {
        if (routeId) {
            getRouteById(routeId);
        }
    }, [routeId]);
    return (
        <section className="main content">
            <div className="container">
                <div className="main__inner default__inner">
                    <h1 className="title center">Просмотр расписания автобусов</h1>

                    <div className="main__routes">
                        <Select
                            size="large"
                            showArrow={false}
                            className="main__routes--select"
                            placeholder="Выберите автобус"
                            notFoundContent={
                                <div className="main__routes--none">Маршруты не найдены</div>
                            }
                        >
                            {routes.map(((data, id) => <Select.Option key={id} value={data._id}>{data.name}</Select.Option>))}
                        </Select>

                        <img src="/assets/img/arrow-bottom.svg" alt="arrow" className="main__routes--arrow"/>
                    </div>

                    <div className="main__content default__content">
                        {error ? <EmptyContent text="Возникла ошибка"/> : isLoading
                            ? <Preloader page/>
                            : currentRoute?.path?.length
                                ? <div className="main__wrapper">
                                    {currentRoute?.path?.map((data, id) => <ScheduleItem key={id} data={data}
                                                                                         id={id + 1}/>)}
                                </div>
                                : <EmptyContent text="Выберите маршрут"/>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Main;