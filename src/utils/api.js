import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const API_URL = 'http://localhost:8080';

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
export function cadastrarSindico(sindico, token) {
    return axios.post(`${API_URL}/v1/sindico`, sindico, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function listarSindicos(token) {
    return axios.get(`${API_URL}/v1/sindico`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function editarSindico(idSindico, sindico, token) {
    return axios.put(`${API_URL}/v1/sindico/${idSindico}`, sindico, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function excluirSindico(idSindico, token) {
    return axios.delete(`${API_URL}/v1/sindico/${idSindico}`,  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

/**
 * Visitante
 */
export function cadastrarVisitante(visitante, token) {
    return axios.post(`${API_URL}/v1/visitante`, visitante, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function listarVisitantes(token) {
    return axios.get(`${API_URL}/v1/visitante`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const registrarSaidaVisitante = (idVisitante, idPorteiro, token) => {
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

  export const obterDadosPorteiroLogado = (token) => {
    return axios.get(`${API_URL}/v1/porteiro/logado`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

/**
 * Morador
 */
export function cadastrarMorador(morador, token) {
    return axios.post(`${API_URL}/v1/morador`, morador, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function listarMoradores(token) {
    return axios.get(`${API_URL}/v1/morador`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function editarMorador(idMorador, morador, token) {
    return axios.put(`${API_URL}/v1/morador/${idMorador}`, morador, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function excluirMorador(idMorador, token) {
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

export function resetPassword(token, newPassword, confirmPassword) {
    return axios.post(`${API_URL}/v1/users/reset-password?token=${token}&newPassword=${newPassword}&confirmPassword=${confirmPassword}`);
}
/**
 * Porteiro
 */
export function cadastrarPorteiro(porteiro, token) {
    return axios.post(`${API_URL}/v1/porteiro`, porteiro, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function listarPorteiros(token) {
    return axios.get(`${API_URL}/v1/porteiro`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function editarPorteiro(idPorteiro, porteiro, token) {
    return axios.put(`${API_URL}/v1/porteiro/${idPorteiro}`, porteiro, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function excluirPorteiro(idPorteiro, token) {
    return axios.delete(`${API_URL}/v1/porteiro/${idPorteiro}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

/**
 * Solicitações
 */
export function listarSolicitacoes(token) {
    return axios.get(`${API_URL}/v1/solicitacao`);
}

export function listarVisitantesPorMorador(idMorador, token) {
    return axios.get(`${API_URL}/v1/visitante/morador/${idMorador}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
export function listarVisitantesPorPorteiro(idPorteiro, token) {
    return axios.get(`${API_URL}/v1/visitante/porteiro/${idPorteiro}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
export function listarVisitantesPorPorteiroAtivo(idPorteiro, token) {
    return axios.get(`${API_URL}/v1/visitante/porteiro/ativo/${idPorteiro}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
export function listarVisitantesPorMoradorAtivo(idMorador, token) {
    return axios.get(`${API_URL}/v1/visitante/morador/ativo/${idMorador}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
export function listarVisitantesPorPorteiroInativo(idPorteiro, token) {
    return axios.get(`${API_URL}/v1/visitante/porteiro/inativo/${idPorteiro}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
export function listarVisitantesPorMoradorInativo(idMorador, token) {
    return axios.get(`${API_URL}/v1/visitante/morador/inativo/${idMorador}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
export function listarVisitantesPorPorteiroAtivoPorMorador(idPorteiro, idMorador, token) {
    return axios.get(`${API_URL}/v1/visitante/porteiro/ativo/morador/${idPorteiro}/${idMorador}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
});
}

export function enviarSolicitacaoVitrine(solicitacao, token) {
    return axios.post(`${API_URL}/v1/solicitacao`, solicitacao, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function aprovarSolicitacao(id, token) {
    return axios.put(`${API_URL}/v1/solicitacao/${id}/aprovar`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function recusarSolicitacao(id, token) {
    return axios.put(`${API_URL}/v1/solicitacao/${id}/recusar`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function listarVitrine(token) {
    return axios.get(`${API_URL}/v1/vitrine`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

/**
 * Vitrine por Condomínio
 */
export function listarVitrinePorCondominio(idCondominio, token) {
    return axios.get(`${API_URL}/v1/vitrine/condominio/${idCondominio}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}