import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Provider } from "react-redux";
import App from './App';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#1373E5',
                        fontFamily: 'Nunito'
                    }
                }}
            >
                <App />
            </ConfigProvider>
        </BrowserRouter>
    </Provider>
);