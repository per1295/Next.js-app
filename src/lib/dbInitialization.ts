import { createConnection } from "mysql2/promise";
import { join } from "path";
import { readFile } from "fs/promises";

const { HOST, USER, PASSWORD, LOCAL_PASSWORD } = process.env;

export default async function initDB() {
    if ( !globalThis.connection ) {
        const connection = await createConnection({
            host: HOST || "localhost",
            user: USER || "root",
            password: PASSWORD || LOCAL_PASSWORD,
            database: "react_app"
        });

        globalThis.connection = connection;

        await connection.execute(`
            SET
            @defaultDateOfCreationBlog = "October 13, 2015",
            @defaultDescriptionBlog = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            @defaultTitleBlog = "THE BIG LEAGUES OUR TURN STRAIGHTNIN",
            @defaultDateOfCreationColumnPost = "3th oct 2012",
            @defaultTitleColumnPost = "Magna mollis ultricies"
        `);

        await connection.execute(`
            CREATE TABLE IF NOT EXISTS blogs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                commentsArray JSON,
                countComments INT DEFAULT 8,
                countLikes INT DEFAULT 15,
                dateOfCreation TEXT,
                descriptionString TEXT,
                img MEDIUMTEXT,
                title TEXT,
                usersWhoLiked JSON
            )
        `);

        await connection.execute(`
            CREATE TABLE IF NOT EXISTS columnPosts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                dateOfCreation TEXT,
                title TEXT,
                img MEDIUMTEXT
            )
        `);

        await connection.execute(`
            CREATE TABLE IF NOT EXISTS contactData (
                id INT AUTO_INCREMENT PRIMARY KEY,
                isVerified BOOLEAN DEFAULT FALSE,
                firstName VARCHAR(20),
                email VARCHAR(30) UNIQUE,
                objectString VARCHAR(30),
                messageString VARCHAR(30)
            )
        `);

        await connection.execute(`
            CREATE TABLE IF NOT EXISTS emails (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(30) UNIQUE,
                isVerified BOOLEAN DEFAULT FALSE
            )
        `);

        await connection.execute(`
            CREATE TABLE IF NOT EXISTS searchValues (
                id INT AUTO_INCREMENT PRIMARY KEY,
                valueString VARCHAR(20)
            )
        `);

        const [ blogs ] = await connection.execute<any[]>(`SELECT * FROM blogs`);

        if ( blogs.length === 0 ) {
            const pathToBlogImage = join(process.cwd(), "public/blog/blog_image.png");

            const blogImage = await readFile(pathToBlogImage, { encoding: "base64" });

            await connection.execute(`
                INSERT INTO blogs (dateOfCreation, descriptionString, img, title, commentsArray, usersWhoLiked)
                VALUES
                (@defaultDateOfCreationBlog, @defaultDescriptionBlog, ?, @defaultTitleBlog, "[]", "[]"),
                (@defaultDateOfCreationBlog, @defaultDescriptionBlog, ?, @defaultTitleBlog, "[]", "[]"),
                (@defaultDateOfCreationBlog, @defaultDescriptionBlog, ?, @defaultTitleBlog, "[]", "[]"),
                (@defaultDateOfCreationBlog, @defaultDescriptionBlog, ?, @defaultTitleBlog, "[]", "[]"),
                (@defaultDateOfCreationBlog, @defaultDescriptionBlog, ?, @defaultTitleBlog, "[]", "[]")
            `,
            Array.from({ length: 5 }).map(() => `data:image/png;base64,${blogImage}`));
        }

        const [ columnPosts ] = await connection.execute<any[]>(`SELECT * FROM columnPosts`);

        if ( columnPosts.length === 0 ) {
            const basePath = join(process.cwd(), "public/blog");

            const pathToSnowImage = join(basePath, "column_snow.png");
            const pathToFogImage = join(basePath, "column_fog.png");
            const pathToDefaultImage = join(basePath, "column_default.png");

            const snowImage = await readFile(pathToSnowImage, { encoding: "base64" });
            const fogImage = await readFile(pathToFogImage, { encoding: "base64" });
            const defaultImage = await readFile(pathToDefaultImage, { encoding: "base64" });

            await connection.execute(`
                INSERT INTO columnPosts (dateOfCreation, title, img)
                VALUES
                (@defaultDateOfCreationColumnPost, @defaultTitleColumnPost, ?),
                (@defaultDateOfCreationColumnPost, @defaultTitleColumnPost, ?),
                (@defaultDateOfCreationColumnPost, @defaultTitleColumnPost, ?)
            `,
            [ snowImage, fogImage, defaultImage ].map(item => `data:image/png;base64,${item}`));
        }
    }
}