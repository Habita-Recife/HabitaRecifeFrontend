import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { SindiServi } from '../pages/SindiServi';
import { SolicitacoesSindi } from '../pages/SolicitacoesSindi';
import DashboardMorador from '../pages/DashboardMorador';
import { ServicoMorador } from '../pages/ServicoMorador';
import { SolicitacaoMorador } from '../pages/SolicitacaoMorador';
import { ControleMorador } from '../pages/ControleMorador';
import { DashboardSindi } from '../pages/DashboardSindi';
import { NotificacoesSindi } from '../pages/NotificacoesSindi';
import { MoradoresSindi } from '../pages/MoradoresSindi';
import { ReunioesSindi } from '../pages/ReunioesSindi';
import { ServiSindico } from '../pages/ServiSindico';
import { FinanceiroSindi } from '../pages/FinanceiroSindi';
import { DashboardPorteiro } from '../pages/DashboardPorteiro';
import { DashboardPrefeitura } from '../pages/DashboardPrefeitura';
import { RecuperarSenha } from '../pages/RecuperarSenha';
import PrivateRoute from './privateRoute'; 

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
    element: (
      <PrivateRoute allowedRoles={['ROLE_SINDICO']}>
        <SindiServi />
      </PrivateRoute>
    )
  },
  {
    path: "/SolicitacoesSindi",
    element: (
      <PrivateRoute allowedRoles={['ROLE_SINDICO']}>
        <SolicitacoesSindi />
      </PrivateRoute>
    )
  },
  {
    path: "/DashboardMorador",
    element: (
      <PrivateRoute allowedRoles={['ROLE_MORADOR']}>
        <DashboardMorador />
      </PrivateRoute>
    )
  },
  {
    path: "/ServicoMorador",
    element: (
      <PrivateRoute allowedRoles={['ROLE_MORADOR']}>
        <ServicoMorador />
      </PrivateRoute>
    )
  },
  {
    path: "/SolicitacaoMorador",
    element: (
      <PrivateRoute allowedRoles={['ROLE_MORADOR']}>
        <SolicitacaoMorador />
      </PrivateRoute>
    )
  },
  {
    path: "/ControleMorador",
    element: (
      <PrivateRoute allowedRoles={['ROLE_MORADOR']}>
        <ControleMorador />
      </PrivateRoute>
    )
  },
  {
    path: "/DashboardSindi",
    element: (
      <PrivateRoute allowedRoles={['ROLE_SINDICO']}>
        <DashboardSindi />
      </PrivateRoute>
    )
  },
  {
    path: "/NotificacoesSindi",
    element: (
      <PrivateRoute allowedRoles={['ROLE_SINDICO']}>
        <NotificacoesSindi />
      </PrivateRoute>
    )
  },
  {
    path: "/MoradoresSindi",
    element: (
      <PrivateRoute allowedRoles={['ROLE_SINDICO']}>
        <MoradoresSindi />
      </PrivateRoute>
    )
  },
  {
    path: "/ReunioesSindi",
    element: (
      <PrivateRoute allowedRoles={['ROLE_SINDICO']}>
        <ReunioesSindi />
      </PrivateRoute>
    )
  },
  {
    path: "/ServiSindico",
    element: (
      <PrivateRoute allowedRoles={['ROLE_SINDICO']}>
        <ServiSindico />
      </PrivateRoute>
    )
  },
  {
    path: "/FinanceiroSindi",
    element: (
      <PrivateRoute allowedRoles={['ROLE_SINDICO']}>
        <FinanceiroSindi />
      </PrivateRoute>
    )
  },
  {
    path: "/DashboardPorteiro",
    element: (
      <PrivateRoute allowedRoles={['ROLE_PORTEIRO']}>
        <DashboardPorteiro />
      </PrivateRoute>
    )
  },
  {
    path: "/DashboardAdmin",
    element: (
      <PrivateRoute allowedRoles={['ROLE_PREFEITURA']}>
        <DashboardPrefeitura />
      </PrivateRoute>
    )
  },
  {
    path: "RecuperarSenha",
    element: <RecuperarSenha/>
  }
]);