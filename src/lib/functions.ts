import type { CookieOptions } from "cookiejs";
import { ColumnPost, Blogs } from "../models/blog";
import type { IBlog, IPutBlogsQuery } from "../types/blog";
import { IResponse } from "../types/home";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Document } from "mongoose";
import store from "../redux/store";
import { setIsMobileTrue, setIsMobileFalse } from "../redux/slices/isMobile";
import { setIsTabletTrue, setIsTabletFalse } from "../redux/slices/isTablet";
import { setIsOnDocumentTrue } from "../redux/slices/isOnDocument";

export class Response implements IResponse {
    status: "success" | "fail";
    message: any;

    constructor({ status = "success", message }: IResponse) {
        this.status = status;
        this.message = message;
    }
}

export function createResponse(res: Response): Response {
    return new Response(res);
}

export function getCookieString(key: string, value: any, options?: CookieOptions) {
    const expires = (new Date(Date.now() + 8.64e7)).toUTCString();

    let cookieString = `${key}=${value}; Expires=${expires}; Path=/`;

    if ( options ) {
        for ( let [ key, value ] of Object.entries(options) ) {
            cookieString += ` ${key}=${value};`;
        }
    }

    return cookieString;
}

export async function getBlogs(req: NextApiRequest, res: NextApiResponse) {
    let { lastId } = req.query;

    let blogs: Document<unknown, any, IBlog>[];

    if ( lastId ) {
        blogs = await Blogs
        .find({}, { _id: false })
        .where("id")
        .lt(+lastId)
        .sort({
            id: -1
        })
        .limit(3);

        if ( blogs.length === 0 ) {
            return res.json(createResponse({
                status: "success",
                message: "No more blogs for now"
            }));
        }
    } else {
        blogs = await Blogs
        .find({}, { _id: false })
        .sort({
            id: -1
        })
        .limit(3);
    }

    lastId = blogs.at(-1)?.get("id");

    res.json(createResponse({
        status: "success",
        message: { blogs, lastId }
    }));
}

export async function patchBlogs(req: NextApiRequest, res: NextApiResponse) {
    let { id, typeUpdate } = req.query as unknown as IPutBlogsQuery;

    const {
        comments,
        countComments,
        countLikes,
        usersWhoLiked
    } = req.body as Pick<IBlog, "comments" | "countComments" | "countLikes" | "usersWhoLiked">;

    const blog = await Blogs.findOne({ id: +id });

    if ( !blog ) {
        return res.status(404).json(createResponse({
            status: "fail",
            message: "Wrong idOfBlog"
        }));
    }

    switch(typeUpdate) {
        case "comments":
            blog.comments = comments;
            blog.countComments = countComments;
            await blog.save();
            res.json(createResponse({
                status: "success",
                message: "Comments were saved"
            }));
            break;
        case "likes":
            blog.countLikes = +countLikes;
            blog.usersWhoLiked = usersWhoLiked;
            await blog.save();
            res.json(createResponse({
                status: "success",
                message: "Likes were saved"
            }));
            break;
        default:
            res.status(404).json(createResponse({
                status: "fail",
                message: "Wrong update type"
            }));
            break;
    }
}

export function isAgent(agent: "phone" | "tablet"): boolean {
    const { userAgent } = navigator;
    let regExp: RegExp;
    switch(agent) {
        case "phone": 
            regExp = /iPhone|iPod|BlackBerry|IEMobile|Opera Mini/ig;
            break;
        case "tablet":
            regExp = /iPad/ig;
            break;
        default:
            return false;
    }
    return regExp.test(userAgent);
}

export function setDevice() {
    const isMobile = matchMedia("(max-width: 750px)").matches || isAgent("phone");
    const isTablet = matchMedia("(min-width: 750px) and (max-width: 1024px)").matches || isAgent("tablet");

    if ( isMobile ) store.dispatch( setIsMobileTrue() );
    else store.dispatch( setIsMobileFalse() );

    if ( isTablet ) store.dispatch( setIsTabletTrue() );
    else store.dispatch( setIsTabletFalse() );
}

export const setOnDocument = () => store.dispatch( setIsOnDocumentTrue() );