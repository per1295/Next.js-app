import { FunctionComponent } from "react";
import styles from "../../styles/contact/MainContactConteinerLeftFormInput.module.scss";

interface MainContactConteinerLeftFormInputProps {
    name: string;
    type: string;
    placeholder?: string;
    appendedClassName?: string;
}

const MainContactConteinerLeftFormInput: FunctionComponent<MainContactConteinerLeftFormInputProps> = ({
    name,
    type,
    placeholder,
    appendedClassName
}) => {
    return(
        <input
        type={type}
        className={`${styles.mainContact_conteiner__left___input} ${appendedClassName ?? ""}`}
        name={name}
        placeholder={placeholder}/>
    )
}

export default MainContactConteinerLeftFormInput;