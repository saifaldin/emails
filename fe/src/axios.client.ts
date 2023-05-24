import axios from 'axios';

export const beClient = axios.create({
  baseURL: 'http://localhost:3000',
});
