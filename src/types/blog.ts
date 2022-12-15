import { IEmailData } from "./home";

export interface ISearchInput{
    value: string;
}

export interface ISearchInputSchema {
    id: number;
    values: string[];
}

export interface IEmailDataComment {
    email: string;
    comment: string;
}

export interface IBlog {
    id: number | null;
    img: string;
    countComments: number;
    countLikes: number;
    dateOfCreation: string;
    description: string;
    title: string;
    usersWhoLiked: IEmailData[];
    comments: IEmailDataComment[];
}

export interface IGetBlogsQuery {
    lastId: string;
}

export interface IPutBlogsQuery {
    id: string;
    typeUpdate: "comments" | "likes";
}