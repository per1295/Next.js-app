import { connect } from "mongoose";
import { ColumnPost } from "../models/blog";
import { Blogs } from "../models/blog";

import blogs from "../db/blogs.json";
import columnPosts from "../db/columnPosts.json";

const LOCAL_MONGO_URI = process.env.LOCAL_MONGO_URI as string;

const MONGO_URI = process.env?.MONGODB_URI || LOCAL_MONGO_URI;

let cached = global.mongoose;

if ( !cached ) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
    if ( cached.conn ) return cached.conn;

    if ( !cached.promise ) {
        cached.promise = connect(MONGO_URI, { dbName: "react-app" }).then(mongoose => mongoose);
        cached.conn = await cached.promise;
        return cached.conn;
    }
}

export async function createBaseCollections() {
    const columnPostsLength = (await ColumnPost.find({})).length;
    const blogsLength = (await Blogs.find({})).length;

    if ( columnPostsLength === 0 ) await ColumnPost.insertMany(columnPosts);
    if ( blogsLength === 0 ) await Blogs.insertMany(blogs);
}