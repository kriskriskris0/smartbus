import React from 'react';

import Preloader from '../Components/Preloader';

export const withSuspense = (Component) => {
    return(
        <React.Suspense fallback={<Preloader page />}>
            <Component />
        </React.Suspense>
    );
}