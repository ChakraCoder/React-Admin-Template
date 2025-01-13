import React from 'react';
import DefaultLayout from './DefaultLayout';

interface AppLayoutProps {
    component: React.ComponentType;
}

const AppLayout: React.FC<AppLayoutProps> = ({ component: Component }) => {
    return (
        <DefaultLayout>
            <Component />
        </DefaultLayout>
    );
};

export default AppLayout;