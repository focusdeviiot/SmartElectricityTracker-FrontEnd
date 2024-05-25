import { jwtDecode } from "jwt-decode";
import { DecodeToken } from "../models/decode_token";

interface tokenResponse {
    access_token: string;
    refresh_token: string;
}

export const DecodeTokenAndSetLocalStorage = (response: tokenResponse): void => {
    const decoded: DecodeToken = jwtDecode(response.access_token);
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
    localStorage.setItem('user_role', decoded.role);
    localStorage.setItem('user_username', decoded.username);
    localStorage.setItem('user_name', decoded.name);
    localStorage.setItem('user_exp', decoded.exp.toString());
}