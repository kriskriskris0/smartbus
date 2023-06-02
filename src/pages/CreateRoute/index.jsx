import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Select, TimePicker } from 'antd';
import dayjs from 'dayjs';

import './index.css';

import useRequest from '../../hooks/useRequest';
import Input from '../../Components/Input';
import { HTTP_METHODS, REQUEST_TYPE } from '../../consts/HTTP';
import Preloader from '../../Components/Preloader';
import useStops from '../../hooks/useStops';
import { formatTime } from '../../utils/formatTime';
import useRoutes from '../../hooks/useRoutes';

const CreateRoute = ({isEdit}) => {
    const [routeName, setRouteName] = React.useState("");
    const [path, setPath] = React.useState([{
        stop: "",
        time: ""
    }]);

    const {id} = useParams();
    const {getAllStops} = useStops();
    const {createRoute, editRoute} = useRoutes();
    const navigate = useNavigate();
    const {isLoading, request} = useRequest();
    const {stops} = useSelector(state => state.app);

    const handleChange = (index, e, name) => {
        const newValues = [...path];

        newValues[index][name] = e;
        setPath(newValues);
    };

    const handleAddField = () => {
        setPath([...path, { stop: '', time: '' }]);
    };

    const createRouteHandler = () => {
        if(!routeName){
            return alert("Введите название маршрута");
        }

        let newPath = path.map(data => {
            return {...data, time: formatTime(data.time)}
        });

        createRoute(routeName, newPath, () => navigate("/routes"));
    }

    const editRouteHandler = () => {
        if(!routeName){
            return alert("Введите название маршрута");
        }

        let newData = path.map(d => {
            return {...d, stop: d.stop, time: formatTime(d.time)}
        });

        editRoute(id, routeName, newData, () => navigate("/routes"));
    }

    const getRouteById = async () => {
        const data = await request(REQUEST_TYPE.ROUTE, `/${id}`, HTTP_METHODS.GET);

        setRouteName(data.name);

        let newData = data?.path?.map(d => {
            let newTime = d.time;
            newTime = newTime.split(":");
            let newHours = Number(newTime[0]);
            let newMinutes = Number(newTime[1]);

            let date = new Date();
            date.setHours(newHours);
            date.setMinutes(newMinutes);

            return {...d, stop: d.stopId, stopName: d.stop, time: dayjs(date)}
        });

        setPath(newData);
    }

    React.useEffect(() => {
        getAllStops();
    }, []);

    React.useEffect(() => {
        if(isEdit){
            getRouteById();
        }
    }, [isEdit]);

    return (
        <section className="stops content">
            <div className="container">
                <div className="stops__inner default__inner">
                    <div className="stops__wrapper">
                        <Link to="/routes" className="button default__button createstop__button">
                            Назад
                        </Link>

                        <h1 className="title">Создание маршрута</h1>
                    </div>

                    <div className="createstop__content default__content">
                        {isLoading ? <Preloader page /> : <>
                            <div className="create__route--wrapper">
                                <div className="inputs__wrapper">
                                    <Input placeholder="Название маршрута" value={routeName} setValue={setRouteName} />
                                </div>

                                <div className="create__route--content">
                                    <p className="create__route--title">Маршрут</p>

                                    {path.map((value, index) => (
                                        <div key={index} className="create__route--item">
                                            <div className="create__route--select--inner">
                                                <Select
                                                    size="large"
                                                    showArrow={false}
                                                    className="create__route--select"
                                                    placeholder="Остановка"
                                                    value={value.stop}
                                                    onChange={(e) => handleChange(index, e, "stop")}
                                                    notFoundContent={
                                                        <div className="main__routes--none">Остановки не найдены</div>
                                                    }
                                                >
                                                    {stops.map(((data, id) => <Select.Option key={id} value={data._id}>{data.name}</Select.Option>))}
                                                </Select>

                                                <img src="/assets/img/arrow-bottom.svg" alt="arrow" className="main__routes--arrow" />
                                            </div>

                                            <div className="create__route--select--inner">
                                                <TimePicker
                                                    placeholder="Время прибытия"
                                                    className="create__route--select"
                                                    format="HH:mm"
                                                    size="large"
                                                    value={value.time}
                                                    onChange={(e) => handleChange(index, e, "time")}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="button default__button createstop__button" onClick={handleAddField}>
                                    Добавить
                                </button>
                            </div>

                            {isEdit ? <button className="button default__button createstop__button save__button" onClick={editRouteHandler}>
                                    Сохранить
                                </button>
                                : <button className="button default__button createstop__button save__button" onClick={createRouteHandler}>
                                    Создать
                                </button>}
                        </>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateRoute;