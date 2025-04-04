import { createBrowserRouter } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { SindiServi } from '../pages/SindiServi'
import { SolicitacoesSindi } from '../pages/SolicitacoesSindi'
import DashboardMorador from '../pages/DashboardMorador'
import { ServicoMorador } from '../pages/ServicoMorador'
import { SolicitacaoMorador } from '../pages/SolicitacaoMorador'
import { ControleMorador } from '../pages/ControleMorador'
import { DashboardSindi } from '../pages/DashboardSindi'
import { NotificacoesSindi } from '../pages/NotificacoesSindi'
import { MoradoresSindi } from '../pages/MoradoresSindi'
import { ReunioesSindi } from '../pages/ReunioesSindi'
import { ServiSindico } from '../pages/ServiSindico'
import { FinanceiroSindi } from '../pages/FinanceiroSindi'
import { DashboardPorteiro } from '../pages/DashboardPorteiro'
import { DashboardPrefeitura } from '../pages/DashboardPrefeitura'
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
    },
    {
        path: "/DashboardSindi",
        element: <DashboardSindi/>
    },
    {
        path: "/NotificacoesSindi",
        element: <NotificacoesSindi/>
    },
    {
        path: "/MoradoresSindi",
        element: <MoradoresSindi/>
    },
    {
        path: "/ReunioesSindi",
        element: <ReunioesSindi/>
    },
    {
        path: "/ServiSindico",
        element: <ServiSindico/>
    },
    {
        path: "/FinanceiroSindi",
        element: <FinanceiroSindi/>
    },
    {
        path: "/DashboardPorteiro",
        element: <DashboardPorteiro/>
    },
    {
        path: "/DashboardPrefeitura",
        element: <DashboardPrefeitura/>
    }
]) 