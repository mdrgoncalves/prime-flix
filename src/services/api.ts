import axios from 'axios';

//Base da API: https://api.themoviedb.org/3/
//URL da API: movie/now_playing?api_key=635d7bb326f6496e4d097671bf2244e1&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;