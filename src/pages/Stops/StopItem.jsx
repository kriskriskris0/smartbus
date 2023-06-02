import React from 'react';
import { useNavigate } from 'react-router-dom';

import './index.css';

import { Delete, Dots, Edit, Map } from '../../Components/Icons';

const StopItem = ({data, id, deleteCallback = () => {}}) => {
    const {_id, name} = data;

    const navigate = useNavigate();

    return (
        <div className="main__item">
            <div className="main__item--wrapper">
                <p className="main__item--num">{id}</p>

                <div className="main__item--route">
                    <div className="main__item--route--name">
                        <Map />

                        <p className="main__item--route--name--value">
                            {name}
                        </p>
                    </div>
                </div>
            </div>

            <div className="main__item--dots">
                <Dots />

                <div className="main__actions--wrapper">
                    <div className="main__actions">
                        <div className="main__action--item" onClick={() => navigate(`edit/${_id}`)}>
                            <Edit />

                            <p className="main__action--text">
                                Редактировать
                            </p>
                        </div>

                        <div className="main__action--item delete" onClick={deleteCallback}>
                            <Delete />

                            <p className="main__action--text">
                                Удалить
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StopItem;