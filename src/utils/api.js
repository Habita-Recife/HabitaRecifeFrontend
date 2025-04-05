import axios from "axios";


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