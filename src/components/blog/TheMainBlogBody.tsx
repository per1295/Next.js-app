import { useState, useEffect, useMemo, useRef } from "react";
import styles from "../../styles/blog/TheMainBlogBody.module.scss";
import MainBlogBodyItem from "./MainBlogBodyItem";
import type { IBlog } from "../../types/blog";
import axios from "axios";
import { Response } from "../../lib/functions";
import TheMainBlogBodyAllBlogs from "./TheMainBlogBodyAllBlogs";
import { BlogsContext } from "../../lib/contexts";

interface IBlogsResponse {
    blogs: IBlog[];
    lastId: number;
}

const initBlogs = Array.from({ length: 3 }).map(() => ({
    id: null,
    img: "",
    countComments: 0,
    countLikes: 0,
    dateOfCreation: "",
    description: "",
    title: "",
    usersWhoLiked: [],
    comments: []
})) as IBlog[];

export default function TheMainBlogBody() {
    const [ isAllBlogsState, setIsAllBlogsState ] = useState(false);
    const [ blogs, setBlogs ] = useState<IBlog[]>([]);
    const blogsContextValue = { blogs, setBlogs };

    const calmDown = useRef(0);
    const isAllBlogs = useRef<boolean>(false);
    const axiosPath = useRef("/blog/blogs");

    async function getBlogs() {

        if ( !/lastId=0/i.test(axiosPath.current) ) setBlogs(state => [...state, ...initBlogs]);

        const response = await axios.get<Response>(axiosPath.current);

        if ( response.statusText === "OK" ) {
            if ( typeof response.data.message === "string" ) {
                isAllBlogs.current = true;
                setIsAllBlogsState(true);
                return;
            }

            try {
                let { blogs, lastId } = response.data.message as IBlogsResponse;

                setBlogs(state => {
                    let filteredState = state.filter(blog => blog.id !== null);
                    
                    if ( filteredState.length === 0 ) return [...blogs];

                    let filteredBlogs = blogs.filter((item, index) => item.id !== filteredState[index].id);

                    return [ ...filteredState, ...filteredBlogs ];
                });
                
                axiosPath.current = `/blog/blogs?lastId=${lastId}`;
            } catch (error) {
                console.log(error);
            }
        }
    }

    const scrollingBlogs = async () => {
        if ( isAllBlogs.current ) return;

        const nowTime = performance.now();

        if ( nowTime - calmDown.current < 2000 && calmDown.current !== 0) return;
        if ( document.documentElement.scrollHeight - scrollY > 1200 ) return;

        calmDown.current = Math.floor(nowTime);
        await getBlogs();
    }

    useEffect(() => {
        if ( blogs.length === 0 ) getBlogs();

        document.addEventListener("scroll", scrollingBlogs);

        return () => {
            document.removeEventListener("scroll", scrollingBlogs);
        }
    }, []);

    const blogsElement = useMemo(() => (
        <BlogsContext.Provider value={blogsContextValue}>
            <div className={styles.mainBlog_body}>
                {
                    blogs.map((blog, index) => (
                        <MainBlogBodyItem key={index} id={blog.id}/>
                    ))
                }
                { isAllBlogsState ? <TheMainBlogBodyAllBlogs/> : null }
            </div>
        </BlogsContext.Provider>
    ), [ blogs, isAllBlogsState ]);

    return blogsElement;
}