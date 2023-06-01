import React from 'react';
import { Empty } from 'antd';

import './index.css';

const EmptyContent = ({text, children}) => {
    return (
        <div className="empty__inner">
            <Empty description={text} />

            {children}
        </div>
    )
}

export default EmptyContent;