
import { IoIosCreate } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { TLinks } from "./type";
export const links:TLinks[] = [
    {
        label: "Home",
        icon : <FaHome />,
        url : "/"
    },
    {
        label: "Create",
        icon : <IoIosCreate />,
        url : "/create"
    },{
        label: "Manage",
        icon : <MdManageAccounts />,
        url : "/manage"
    },
]