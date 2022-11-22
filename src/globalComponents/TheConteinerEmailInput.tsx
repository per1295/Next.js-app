import { forwardRef } from "react";
import styles from "../globalStyles/TheConteinerEmailInput.module.scss";

const TheConteinerEmailInput = forwardRef<HTMLInputElement>((_props, ref) => (
    <input
    ref={ref}
    type="email"
    name="email"
    className={styles.conteiner_email__input}
    placeholder="your email"
    />
))

export default TheConteinerEmailInput;