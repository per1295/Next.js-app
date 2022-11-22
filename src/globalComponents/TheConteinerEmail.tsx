import { FormEventHandler, useRef, useState, TransitionEventHandler } from "react";
import conteinerEmailStyles from "../globalStyles/TheConteinerEmail.module.scss";
import conteinerEmailSubmitStyles from "../globalStyles/TheConteinerEmailSubmit.module.scss";
import TheConteinerEmailInput from "./TheConteinerEmailInput";
import Button from "./Button";
import { useInputValidation } from "../lib/customHooks";
import { Response } from "../lib/functions";
import EmailMessage from "./EmailMessage";
import axios from "axios";

export default function TheConteinerEmail() {
    const emailElem = useRef<HTMLInputElement>(null);
    const formElem = useRef<HTMLFormElement>(null);
    const messageElem = useRef<HTMLSpanElement>(null);

    const [ message, setMessage ] = useState<string | null>(null);
    const { value, error } = useInputValidation(emailElem);

    const onSubmit: FormEventHandler = async ( event ) => {
        event.preventDefault();

        const form = formElem.current as HTMLFormElement;

        if ( !error ) {
            const response = await axios.post<Response>("/home/email", { email: value });
            if ( response.statusText === "OK" ) {
                const { message } = response.data;
                setMessage(message);
                form.classList.add("isFetched");
            }
        };
    };

    const onTransitionend: TransitionEventHandler<HTMLFormElement> = (event) => {
        const form = event.currentTarget as HTMLFormElement;
        form.remove();
        
        const message = messageElem.current as HTMLSpanElement;
        message.classList.add("messageActive");
        setTimeout(() => {
            message.classList.add("messageStart");
        }, 0);
    }

    return(
        <>
            <form
            ref={formElem}
            action="post"
            className={conteinerEmailStyles.conteiner_email}
            onSubmit={onSubmit}
            onTransitionEnd={onTransitionend}>
                <TheConteinerEmailInput ref={emailElem}/>
                <Button className={conteinerEmailSubmitStyles.conteiner_email__submit} startColor="green" type="submit">
                    send
                </Button>
            </form>
            <EmailMessage ref={messageElem}>
                { message ?? "" }
            </EmailMessage>
        </>
    )
}