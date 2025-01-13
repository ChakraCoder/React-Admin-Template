import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';

import PageTitle from '../components/PageTitle';
import UserManagement from '../pages/UserManagement/UserManagement';
import Dashboard from '../pages/Dashboard';
import UserActions from '../pages/UserManagement/UserActions';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route
                index
                element={
                    <>
                        <PageTitle title="Dashboard" />
                        <AppLayout component={Dashboard} />
                    </>
                }
            />
            <Route
                path="/user-management"
                element={
                    <>
                        <PageTitle title="User Management" />
                        <AppLayout component={UserManagement} />
                    </>
                }
            />
            <Route
                path="/user-management/add-user"
                element={
                    <>
                        <PageTitle title="Add User" />
                        <AppLayout component={UserActions} />
                    </>
                }
            />
            <Route
                path="/user-management/update-user/:id"
                element={
                    <>
                        <PageTitle title="Update User" />
                        <AppLayout component={UserActions} />
                    </>
                }
            />
        </Routes>
    );
};

export default AppRoutes;
