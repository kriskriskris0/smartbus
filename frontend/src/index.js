import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#1373E5',
                    fontFamily: 'Nunito'
                }
            }}
        >
        </ConfigProvider>
    </BrowserRouter>
);