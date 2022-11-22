import { useMemo, useRef, FormEventHandler, useState, TransitionEventHandler } from "react";
import MainContactConteinerLeftFormInput from "./MainContactConteinerLeftFormInput";
import TheMainContactConteinerLeftFormTextarea from "./TheMainContactConteinerLeftFormTextarea";
import Button from "../../globalComponents/Button";
import { useFormValidation } from "../../lib/customHooks";
import { Response } from "../../lib/functions";
import EmailMessage from "../../globalComponents/EmailMessage";
import axios from "axios";

import styles from "../../styles/contact/TheMainContactConteinerLeftForm.module.scss";

export default function TheMainContactConteinerLeftForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const messageRef = useRef<HTMLDivElement>(null);
    const { formData, formElements } = useFormValidation(formRef);
    const [ message, setMessage ] = useState<string | null>(null);

    const onSubmitForm: FormEventHandler<HTMLFormElement> = async (event) => {
        const form = event.currentTarget as HTMLFormElement;
        event.preventDefault();
        const errorFormElem = formElements.find((formElem) => formElem.isError === true);
        if ( errorFormElem ) {
            const errorY = scrollY + errorFormElem.formElem.getBoundingClientRect().y;
            scroll({
                top: errorY,
                behavior: "smooth"
            });
        } else {
            const response = await axios.post<Response>(encodeURI("/contact us/user"), formData);
            if ( response.statusText === "OK" ) {
                const { message } = response.data;
                setMessage(message);
                form.classList.add("isFetched");
            }
        }
    }

    const onTransitionend: TransitionEventHandler<HTMLFormElement> = (event) => {
        const form = event.currentTarget as HTMLFormElement;
        form.remove();
        
        const message = messageRef.current as HTMLSpanElement;
        message.classList.add("messageActive");
        setTimeout(() => {
            message.classList.add("messageStart");
        }, 0);
    }

    const inputs = useMemo(() => (
        [
            {
                name: "name",
                type: "text",
                placeholder: "your name"
            },
            {
                name: "email",
                type: "email",
                placeholder: "your email"
            },
            {
                name: "object",
                type: "text",
                placeholder: "object",
                appendedClassName: styles.mainContact_conteiner__left___inputLarge
            }
        ]
    ), []);

    return(
        <>
            <form
            ref={formRef}
            onSubmit={onSubmitForm}
            onTransitionEnd={onTransitionend}
            className={styles.mainContact_conteiner__left___form}>
                {
                    inputs.map(({ name, type, placeholder, appendedClassName }, index) => (
                        <MainContactConteinerLeftFormInput
                        key={index}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        appendedClassName={appendedClassName}
                        />
                    ))
                }
                <TheMainContactConteinerLeftFormTextarea/>
                <Button startColor="green" type="submit" className={styles.mainContact_conteiner__left___form____button}>
                    send
                </Button>
            </form>
            <EmailMessage ref={messageRef} appendedClassName={styles.message_contact}>
                { message ?? "" }
            </EmailMessage>
        </>
    )
}