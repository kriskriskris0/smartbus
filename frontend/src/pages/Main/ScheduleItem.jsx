import React from 'react';

import './index.css';

    return (
        <div className="main__item">
            <div className="main__item--wrapper">
                <p className="main__item--num">{id}</p>

                <div className="main__item--route">
                    <div className="main__item--route--time">

                        <p className="main__item--route--time--value">
                        </p>
                    </div>

                    <p className="main__item--route--dot">-</p>

                    <div className="main__item--route--name">

                        <p className="main__item--route--name--value">
                            {stop}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )