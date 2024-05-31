import { ReactNode } from "react";

export type TLinks = {
    label: string;
    icon: JSX.Element;
    url: string;
}

export type TChildrenProp = {
    children ?: ReactNode;
}