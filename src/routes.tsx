import React, {memo} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ItemListView from "./page/ItemListView/ItemListView";
import AboutItem from "./page/AboutItem/AboutItem";
import NotFound from "./page/NotFound/NotFound";
import AboutUser from "./page/AboutUser/AboutUser";
import BasketList from "./page/BasketList/BasketList";
import Auth from "./page/Auth/Auth";
import Registration from "./page/Registration/Registration";

const router = createBrowserRouter([
    {
        path: '/',
        element: <ItemListView/>,
    },
    {
        path: '/item/:id',
        element: <AboutItem/>,
    }, {
        path: '/user/:id',
        element: <AboutUser/>,
    },{
        path: '/basket',
        element: <BasketList/>,
    },{
        path: '/auth',
        element: <Auth/>,
    },{
        path: '/registration',
        element: <Registration/>,
    },
    {
        path: '*',
        element: <NotFound/>,
    },
]);

function Routes() {
    return <RouterProvider router={router}/>;
}

export default memo(Routes);