import { FunctionComponent } from "react";
import styles from "../../styles/blog/MainBlogColumnItem.module.scss";

interface MainBlogColumnItemProps {
	title: string;
	children: JSX.Element;
}

const MainBlogColumnItem: FunctionComponent<MainBlogColumnItemProps> = ({ title, children }) => {
	return (
		<div className={styles.mainBlog_column__item}>
			<span className={styles.mainBlog_column__item___title}>
				{ title }
			</span>
			{ children }
		</div>	
	)
}

export default MainBlogColumnItem;