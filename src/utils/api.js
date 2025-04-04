import axios from "axios";


const API_URL = 'http://localhost:8080';

 export function loginUser(email, password) {
    
    return axios.post(`${API_URL}/v1/users/login`, {
        email,
        password
    }).then((response) => {
        if (response.data.token) {
            localStorage.setItem('token', JSON.stringify(response.data));
            localStorage.setItem('username', JSON.stringify(response.data));
            
        }
        return response.data;
    });
}



