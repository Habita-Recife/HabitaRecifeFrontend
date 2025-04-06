import axios from "axios";
import { getDados } from '../utils/utils';

const API_URL = 'http://localhost:8080';

/**
 * Login
 */
export function loginUser(email, password) {
    
    return axios.post(`${API_URL}/v1/users/login`, {
        email,
        password
    }).then((response) => {
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
        }
        return response.data;
    });
}

/**
 * Condomínio
 */
export function cadastrarCondominio(condominio) {
    return axios.post(`${API_URL}/v1/condominio`, condominio);
}

export function listarCondominios() {
    return axios.get(`${API_URL}/v1/condominio`);
}

export function editarCondominio(idCondominio, condominio) {
    return axios.put(`${API_URL}/v1/condominio/${idCondominio}`, condominio);
}

export function excluirCondominio(idCondominio) {
    return axios.delete(`${API_URL}/v1/condominio/${idCondominio}`);
}

/**
 * Condomínio
 */
export function cadastrarSindico(sindico) {
    const token = localStorage.getItem('token');
    return axios.post(`${API_URL}/v1/sindico`, sindico, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function listarSindicos() {
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/v1/sindico`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function editarSindico(idSindico, sindico) {
    const token = localStorage.getItem('token');
    return axios.put(`${API_URL}/v1/sindico/${idSindico}`, sindico, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function excluirSindico(idSindico) {
    const token = localStorage.getItem('token');
    return axios.delete(`${API_URL}/v1/sindico/${idSindico}`,  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

/**
 * Visitante
 */
export function cadastrarVisitante(visitante) {
    const token = localStorage.getItem('token');
    return axios.post(`${API_URL}/v1/visitante`, visitante, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function listarVisitantes() {
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/v1/visitante`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const registrarSaidaVisitante = (idVisitante, idPorteiro) => {
    const token = localStorage.getItem('token');
    const fluxoDTO = {
      idPorteiro: idPorteiro,
      idVisitante: idVisitante,
      tipoFluxo: "SAIDA",
      statusFluxo: "INATIVO"
    };
    return axios.post(`${API_URL}/v1/fluxo/saida`, fluxoDTO, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };
  
  /**
 * Porteiro
 */

  export const obterDadosPorteiroLogado = () => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/v1/porteiro/logado`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

/**
 * Morador
 */
export function cadastrarMorador(morador) {
    const token = localStorage.getItem('token');
    return axios.post(`${API_URL}/v1/morador`, morador, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function listarMoradores() {
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/v1/morador`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function editarMorador(idMorador, morador) {
    const token = localStorage.getItem('token');
    return axios.put(`${API_URL}/v1/morador/${idMorador}`, morador, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function excluirMorador(idMorador) {
    const token = localStorage.getItem('token');
    return axios.delete(`${API_URL}/v1/morador/${idMorador}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

   /**
 * Usuario
 */

   export function cadastrarUsuario(userData) {
    return axios.post(`${API_URL}/v1/users/register`, userData);
}

export function forgotPassword(email) {
    return axios.post(`${API_URL}/v1/users/forgot-password?email=${email}`);
}