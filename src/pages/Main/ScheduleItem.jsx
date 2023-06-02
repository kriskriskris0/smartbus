import React from 'react';

import './index.css';

import { Date, Map } from '../../Components/Icons';

const ScheduleItem = ({data, id}) => {
    const {time, stop} = data;

    return (
        <div className="main__item">
            <div className="main__item--wrapper">
                <p className="main__item--num">{id}</p>

                <div className="main__item--route">
                    <div className="main__item--route--time">
                        <Date/>

                        <p className="main__item--route--time--value">
                            {time}
                        </p>
                    </div>

                    <p className="main__item--route--dot">-</p>

                    <div className="main__item--route--name">
                        <Map/>

                        <p className="main__item--route--name--value">
                            {stop}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScheduleItem;