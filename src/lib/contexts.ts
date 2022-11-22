import type { IBlog } from "../types/blog";
import { createContext, Dispatch, SetStateAction } from "react";

interface IBlogsContext {
    blogs: IBlog[];
    setBlogs: Dispatch<SetStateAction<IBlog[]>>;
}

const defaultValue = {
    blogs: [],
    setBlogs: (blogs: IBlog[]) => blogs
} as IBlogsContext;

export const BlogsContext = createContext<IBlogsContext>(defaultValue);

export const IdContext = createContext<number | null>(null);

interface ICommentContext {
    comment: string;
    setComment: Dispatch<SetStateAction<string>>;
}

const commentContextInit = {} as ICommentContext;

export const CommentContext = createContext<ICommentContext>(commentContextInit);

interface ICommentVisibileContext {
    isCommentVisible: boolean;
    setIsCommentVisible: Dispatch<SetStateAction<boolean>>;
}

const commentVisibleContextInit = {} as ICommentVisibileContext;

export const CommentVisibleContext = createContext<ICommentVisibileContext>(commentVisibleContextInit);