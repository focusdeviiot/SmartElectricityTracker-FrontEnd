import { Role } from "./role";

export interface MenuItem {
    title: string;
    path: string;
    role?: Role[];
    layout?: boolean;
    isNotShow?: boolean;
    children?: MenuItem[];
}

export const menuData: MenuItem[] = [
    {
        title: "Dashboard",
        layout: true,
        path: "",
        role: [Role.ADMIN, Role.USER],
    },
    {
        title: "Dashboard",
        layout: true,
        path: "dashboard",
        role: [Role.ADMIN, Role.USER],
    },
    {
        title: "Admin management",
        path: "admin",
        layout: true,
        role: [Role.ADMIN],
        children: [
            {
                title: "Users",
                path: "users",
                // role: [Role.ADMIN],
            }
        ],
    },
    {
        title: "Unauthorized",
        path: "unauthorized",
        isNotShow: true,
    },
    {
        title: "Login",
        path: "login",
        isNotShow: true,
    },
    {
        title: "Logout",
        path: "logout",
        isNotShow: true,
    },
];