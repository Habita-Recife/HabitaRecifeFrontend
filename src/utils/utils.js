export function getDados(token) {
  if (!token || typeof token !== 'string') {
    return null;
  }

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

export function converterRoles(role) {
  switch(role) {
    case 'ROLE_PORTEIRO':
      return 'Porteiro';
      break;
    case 'ROLE_SINDICO':
      return 'Sindico';
      break;
    case 'ROLE_MORADOR':
      return 'Morador';
      break;
    case 'ROLE_PREFEITURA':
      return 'Prefeitura';
      break;
    default:
      return 'Outros';
  }
}