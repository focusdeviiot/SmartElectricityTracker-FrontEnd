import apiClient from "./axios";
import { Response } from '../models/response';

export const getUsersCountDevice = async (data): Promise<Response> => {
    try {
        const response = await apiClient.post<Response>('admin/users-count-device', { ...data });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};