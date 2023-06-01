import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import './index.css';

import useStops from '../../hooks/useStops';
import useRequest from '../../hooks/useRequest';
import Input from '../../Components/Input';
import { HTTP_METHODS, REQUEST_TYPE } from '../../consts/HTTP';
import Preloader from '../../Components/Preloader';

const CreateStop = ({isEdit = false}) => {
    const [stopName, setStopName] = React.useState("");

    const {createStop, editStop} = useStops();
    const navigate = useNavigate();
    const {id} = useParams();
    const {isLoading, request} = useRequest();

    const createStopHandler = () => {
        if(!stopName){
            return alert("Введите название остановки");
        }

        createStop(stopName, () => navigate("/stops"));
    }

    const editStopHandler = () => {
        if(!stopName){
            return alert("Введите название остановки");
        }

        editStop(id, stopName, () => navigate("/stops"));
    }

    const getStopById = async () => {
        const data = await request(REQUEST_TYPE.STOP, `/${id}`, HTTP_METHODS.GET);

        setStopName(data.name);
    }

    React.useEffect(() => {
        if(isEdit){
            getStopById();
        }
    }, [isEdit]);

    return (
        <section className="stops content">
            <div className="container">
                <div className="stops__inner default__inner">
                    <div className="stops__wrapper">
                        <Link to="/stops" className="button default__button createstop__button">
                            Назад
                        </Link>

                        <h1 className="title">Создание остановки</h1>
                    </div>

                    <div className="createstop__content default__content">
                        {isLoading ? <Preloader page /> : <>
                            <div className="inputs__wrapper">
                                <Input placeholder="Название остановки" value={stopName} setValue={setStopName} />
                            </div>

                            {isEdit ? <button className="button default__button createstop__button save__button" onClick={editStopHandler}>
                                    Сохранить
                                </button>
                                : <button className="button default__button createstop__button save__button" onClick={createStopHandler}>
                                    Создать
                                </button>}
                        </>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateStop;