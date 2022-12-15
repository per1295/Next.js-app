import type { CookieOptions } from "cookiejs";
import type { IBlog, IPutBlogsQuery } from "../types/blog";
import { IResponse } from "../types/home";
import type { NextApiRequest, NextApiResponse } from "next";
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
    const connection = globalThis.connection;

    let { lastId } = req.query;

    let blogs: any[];

    if ( lastId ) {
        const [ rows ] = await connection.execute<any[]>(
            `SELECT * from blogs WHERE id < ? ORDER BY id DESC LIMIT 3`,
            [ lastId ]
        );

        if ( rows.length === 0 ) {
            return res.json(createResponse({
                status: "success",
                message: "No more blogs for now"
            }));
        }

        blogs = rows;
    } else {
        const [ rows ] = await connection.execute<any[]>(
            `SELECT * FROM blogs ORDER BY id DESC LIMIT 3`
        );

        blogs = rows;
    }

    lastId = blogs.at(-1)?.id;

    res.json(createResponse({
        status: "success",
        message: { blogs: transformBlogs(blogs), lastId }
    }));
}

export async function patchBlogs(req: NextApiRequest, res: NextApiResponse) {
    const connection = globalThis.connection;

    let { id, typeUpdate } = req.query as unknown as IPutBlogsQuery;

    const {
        comments,
        countComments,
        countLikes,
        usersWhoLiked
    } = req.body as Pick<IBlog, "comments" | "countComments" | "countLikes" | "usersWhoLiked">;

    const [ rows ] = await connection.execute<any[]>(
        `SELECT * FROM blogs WHERE id = ?`,
        [ id ]
    );

    if ( rows.length === 0 ) {
        return res.status(404).json(createResponse({
            status: "fail",
            message: "Wrong idOfBlog"
        }));
    }

    switch(typeUpdate) {
        case "comments":
            await connection.execute(
                `
                    UPDATE blogs
                    SET
                        commentsArray = ?,
                        countComments = ?
                    WHERE id = ?
                `,
                [ comments, countComments, id ]
            );

            res.json(createResponse({
                status: "success",
                message: "Comments were saved"
            }));
            break;
        case "likes":
            await connection.execute(
                `
                    UPDATE blogs
                    SET
                        usersWhoLiked = ?,
                        countLikes = ?
                    WHERE id = ?
                `,
                [ usersWhoLiked, countLikes, id ]
            );

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

function transformBlogs(blogs: any[]): IBlog[] {
    return blogs.map(item => {
        let transformedBlog = {} as { [key: string]: any };

        for ( let [ key, value ] of Object.entries<any>(item) ) {
            switch(key) {
                case "commentsArray":
                    transformedBlog["comments"] = value;
                    break;
                case "descriptionString":
                    transformedBlog["description"] = value;
                    break;
                default:
                    transformedBlog[key] = value;
                    break;
            }
        }

        return transformedBlog;
    }) as IBlog[];
};

export function setCookies(res: NextApiResponse, keys: string[], values: any[], options?: CookieOptions[]) {
    for ( let i = 0; i < keys.length; i++ ) {
        res.setHeader("Set-Cookie", getCookieString(keys[i], values[i], options ? options[i] : undefined));
    }
}