import axios from 'axios';
import { API_URL } from './urls';

const token = localStorage.getItem('PrensaTokenAdmin');

export default axios.create({
    baseURL: API_URL + 'api/',
    headers: { 'api-key': token },
    crossdomain: true
});
