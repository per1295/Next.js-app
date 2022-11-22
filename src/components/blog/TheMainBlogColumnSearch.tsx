import { useRef, FormEventHandler, EventHandler, MouseEvent } from "react";
import IonIcon from "@reacticons/ionicons";
import styles from "../../styles/blog/TheMainBlogColumnSearch.module.scss";
import { useDatalist, useInputValidation } from "../../lib/customHooks";
import axios from "axios";

export default function TheMainBlogColumnSearch() {
	const inputRef = useRef<HTMLInputElement>(null);
	const datalist = useDatalist("search-input");

	const { value, error } = useInputValidation(inputRef);

	const postValue = async () => await axios.post("/blog/searchInput", { value });

	const clickForm: FormEventHandler<HTMLFormElement> = () => {
		const input = inputRef.current as HTMLInputElement;
		input.focus();
	};

	const clickIcon: EventHandler<MouseEvent> = async (event) => {
		event.stopPropagation();
		await postValue();
	};

	const submitForm: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault();
		if ( error && !value ) return;
		await postValue();
	};

	return (
		<form method="post" className={styles.mainBlog_column__search} onClick={clickForm} onSubmit={submitForm}>
			<input
			ref={inputRef}
			list="search-input"
			type="text"
			name="searchInput"
			id="searchInput"
			className={styles.mainBlog_column__search___input}
			placeholder="search..."
			/>
			<IonIcon name="search-outline" className={styles.mainBlog_column__search___icon} onClick={clickIcon} />
			{ datalist }
		</form>
	)
}