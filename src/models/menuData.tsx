import { Role } from "./role";
import { TbZoomMoney } from "react-icons/tb";
import { MdSensors } from "react-icons/md";
import { MdOutlineElectricMeter } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { MdManageAccounts } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";

export interface MenuItem {
    icon?: JSX.Element;
    title: string;
    path: string;
    role?: Role[];
    layout?: boolean;
    isNotShow?: boolean;
    children?: MenuItem[];
}

export const menuData: MenuItem[] = [
    {
        icon: <MdSensors className="w-5 h-5 text-primary" />,
        title: "Device RealTime",
        layout: true,
        path: "",
        role: [Role.USER, Role.ADMIN]
    },
    // {
    //     icon: <MdSensors className="w-5 h-5 text-primary" />,
    //     title: "View bill",
    //     layout: true,
    //     path: "view-bill",
    //     role: [Role.USER, Role.ADMIN]
    // },
    {
        icon: <TbReportAnalytics className="w-5 h-5 text-gray-500" />,
        title: "Report",
        layout: true,
        path: "dashboard",
        role: [Role.USER, Role.ADMIN],
        children: [
            {
                icon: <MdOutlineElectricMeter className="w-5 h-5 text-primary" />,
                title: "Volt usage",
                path: "volt-usage",
            },
            {
                icon: <MdOutlineElectricMeter className="w-5 h-5 text-primary" />,
                title: "Amp usage",
                path: "amp-usage",
            },
            {
                icon: <MdOutlineElectricMeter className="w-5 h-5 text-primary" />,
                title: "Watt usage",
                path: "watt-usage",
            },
            {
                icon: <TbZoomMoney className="w-5 h-5 text-primary" />,
                title: "Electricity bill",
                path: "electricity-bill-usage",
            },
        ],
    },
    {
        icon: <MdManageAccounts className="w-5 h-5 text-gray-500" />,
        title: "Admin management",
        path: "admin",
        layout: true,
        role: [Role.ADMIN],
        children: [
            {
                icon: <FaUserEdit className="w-5 h-5 text-primary" />,
                title: "Users",
                path: "users",
            },
            {
                icon: <IoIosPricetags className="w-5 h-5 text-primary" />,
                title: "Price / Unit",
                path: "price-unit",
            },
            // {
            //     title: "Electricity billing",
            //     path: "electricity-billing",
            // },
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