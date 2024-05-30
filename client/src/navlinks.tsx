
import { IoIosCreate } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
export const links = [
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