import { createBrowserRouter } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { SindiServi } from '../pages/SindiServi'
import { SolicitacoesSindi } from '../pages/SolicitacoesSindi'
import DashboardMorador from '../pages/DashboardMorador'
import { ServicoMorador } from '../pages/ServicoMorador'
import { SolicitacaoMorador } from '../pages/SolicitacaoMorador'
import { ControleMorador } from '../pages/ControleMorador'
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/SindiServi",
        element: <SindiServi/>
    },
    {
        path: "/SolicitacoesSindi",
        element: <SolicitacoesSindi/>
    },
    {
        path: "/DashboardMorador",
        element: <DashboardMorador/>
    },
    {
        path: "/ServicoMorador",
        element: <ServicoMorador/>
    },  
    {
        path: "/SolicitacaoMorador",
        element: <SolicitacaoMorador/>
    },
    {
        path: "/ControleMorador",
        element: <ControleMorador/>
    }
]) 