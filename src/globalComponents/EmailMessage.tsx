import { forwardRef } from "react";
import styles from "../globalStyles/EmailMessage.module.scss";

interface EmailMessageProps {
    children: JSX.Element | string;
    appendedClassName?: string;
}

const EmailMessage = forwardRef<HTMLSpanElement, EmailMessageProps>(({ children, appendedClassName }, ref) => {
    return(
        <span className={`${styles.message} ${appendedClassName}`} ref={ref}>
            { children }
        </span>
    )
});

// ${appendedClassName ? " message_" + appendedClassName : ""}

export default EmailMessage;