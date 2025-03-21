import { createBrowserRouter } from 'react-router'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { SindiServi } from '../pages/SindiServi'
import { SolicitacoesSindi } from '../pages/SolicitacoesSindi'



export const router = createBrowserRouter([

    {
        path: "/",
        element:<Home/>
    },
    {
        path: "/login",
        element:<Login/>
    },
    {
        path: "/SindiServi",
        element:<SindiServi/>
    },
    {
        path: "/SolicitacoesSindi",
        element:<SolicitacoesSindi/>
    }
]) 