import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './index.css';

import useStops from '../../hooks/useStops';

import EmptyContent from '../../Components/EmptyContent';
import Preloader from '../../Components/Preloader';
import StopItem from './StopItem';

const Stops = () => {
    const {isLoading, error, getAllStops, deleteStop} = useStops();

    const {stops} = useSelector(state => state.app);

    React.useEffect(() => {
        getAllStops();
    }, []);

    return (
        <section className="stops content">
            <div className="container">
                <div className="stops__inner default__inner">
                    <div className="stops__wrapper">
                        <h1 className="title">Остановки</h1>

                        <Link to="create" className="button default__button">Создать</Link>
                    </div>

                    <div className="stops__content default__content">
                        {error ? <EmptyContent text="Возникла ошибка"/> : isLoading
                            ? <Preloader page/>
                            : stops.length
                                ? <div className="main__wrapper">
                                    {stops.map((data, id) => <StopItem key={data._id} data={data} id={id + 1} deleteCallback={() => deleteStop(data._id)}/>)}
                                </div>
                                : <EmptyContent text="Выберите маршрут"/>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Stops;