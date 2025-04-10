import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = 'http://localhost:8080';

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/v1/users/login`, {
      email,
      password,
    }, {
      withCredentials: true, 
    });

    if (res.data.token) {
      setAccessToken(res.data.token);
      const decodedUser = jwtDecode(res.data.token);
      setUser(decodedUser);
      return res.data.token;
    }

    throw new Error("Token não recebido");
  };

  const logOut = async () => {
    setAccessToken(null);
    setUser(null);
  };

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await axios.post(`${API_URL}/v1/users/refresh-token`, {}, {
          withCredentials: true,
        });

        if (res.data.token) {
          setAccessToken(res.data.token);
          const decodedUser = jwtDecode(res.data.token);
          setUser(decodedUser);
        }
      } catch (err) {
        console.error("Falha ao renovar token:", err.response?.data || err.message);
      } finally {
        setLoading(false); 
      }
    };

    refreshToken();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, login, logOut, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
