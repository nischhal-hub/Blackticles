import { ReactNode } from "react";

export type TLinks = {
    label: string;
    icon: JSX.Element;
    url: string;
}

export type TChildrenProp = {
    children ?: ReactNode;
}

export type TBlogContent = {
    _id?: string;
    title?: string;
    overview?: string;
    description?: string;
    image?: string;
    slug?: string;
    createdAt?: Date ;
    updatedAt?: Date ;
    __v?: number;
}
