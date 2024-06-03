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

export const getUsersDeviceByUserID = async (data): Promise<Response> => {
    try {
        const response = await apiClient.get<Response>('admin/users-device', {
            params: { ...data }
        });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}

export const updateUserDevice = async (data): Promise<Response> => {
    try {
        const response = await apiClient.put<Response>('admin/users-device', { ...data });
        return response.data;
    } catch (error: any) {
        return Promise.reject(error);
    }
}