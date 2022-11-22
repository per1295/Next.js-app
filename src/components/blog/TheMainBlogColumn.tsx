import styles from "../../styles/blog/TheMainBlogColumn.module.scss";
import TheMainBlogColumnSearch from "./TheMainBlogColumnSearch";
import MainBlogColumnItem from "./MainBlogColumnItem";
import TheMainBlogColumnItemPosts from "./TheMainBlogColumnItemPosts";
import MainBlogColumnItemList from "./MainBlogColumnItemList";
import TheMainBlogColumnItemTags from "./TheMainBlogColumnItemTags";

export default function TheMainBlogColumn() {
	const titleList = [ "Business", "Photography", "Journal", "Web devlopment" ];
	const countList = [ 15, 17, 22, 30 ];

	return (
		<div className={styles.mainBlog_column}>
			<TheMainBlogColumnSearch/>
			<MainBlogColumnItem title={styles.posts}>
				<TheMainBlogColumnItemPosts/>
			</MainBlogColumnItem>
			<MainBlogColumnItem title={styles.categories}>
				<MainBlogColumnItemList titleList={titleList} countList={countList}/>
			</MainBlogColumnItem>
			<MainBlogColumnItem title={styles.tags}>
				<TheMainBlogColumnItemTags/>
			</MainBlogColumnItem>
			<MainBlogColumnItem title={styles.archives}>
				<MainBlogColumnItemList titleList={titleList} countList={countList}/>
			</MainBlogColumnItem>
		</div>	
	)
}