import axios from 'axios';
import type { User } from '../types';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchUsers = () => api.get<User[]>('/users');
export const addUser = (user: Omit<User, 'id'>) => api.post<User>('/users', user);
export const updateUser = (id: number, user: Partial<User>) => api.put<User>(`/users/${id}`, user);
export const deleteUser = (id: number) => api.delete(`/users/${id}`);

export default api;
