import { FunctionComponent } from "react";
import styles from "../../styles/blog/MainBlogColumnItemList.module.scss";
import MainBlogColumnItemListItem from "./MainBlogColumnItemListItem";

interface MainBlogColumnItemListProps {
    titleList: string[];
    countList: number[];
}

const MainBlogColumnItemList: FunctionComponent<MainBlogColumnItemListProps> = ({ titleList, countList }) => {
    return(
        <ul className={styles.mainBlog_column__item__list}>
            {
                titleList.map((title, index) => (
                    <MainBlogColumnItemListItem key={index} title={title} count={countList[index]}/>
                ))
            }
        </ul>
    )
}

export default MainBlogColumnItemList;