import styles from "../../styles/blog/TheMainBlog.module.scss";
import TheMainBlogColumn from "./TheMainBlogColumn";
import TheMainBlogBody from "./TheMainBlogBody";

export default function TheMainBlog() {
	return (
		<main className={styles.mainBlog}>
			<TheMainBlogBody/>
			<TheMainBlogColumn/>
		</main>	
	)
}