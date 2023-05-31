import React from 'react';

    React.useEffect(() => {
    }, []);
    return (
        <section className="main content">
            <div className="container">
                <div className="main__inner default__inner">
                    <h1 className="title center">Просмотр расписания автобусов</h1>
                    <div className="main__routes">
                        size="large"
                        showArrow={false}
                        className="main__routes--select"
                        placeholder="Выберите автобус"
                        notFoundContent={
                        <div className="main__routes--none">Маршруты не найдены</div>
                    }
                    </div>
                    <div className="main__content default__content">
                        <div className="main__wrapper">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )
