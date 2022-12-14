import { useSelector } from "react-redux";
import { State } from "../redux/types";
import React, { useState, useEffect, RefObject, useMemo, useContext } from "react";
import cookie from "cookiejs";
import { BlogsContext } from "./contexts";
import type { IBlog } from "../types/blog";
import { CommentVisibleContext, IdContext } from "./contexts";

export function useTypedSelector<Key extends keyof State>(func: (state: State) => State[Key]) {
    return useSelector(func);
}

export { useDispatch } from "react-redux";

export function useInputValidation(inputRef: RefObject<HTMLInputElement>) {
    const [ error, setError ] = useState<null | string>(null);
    const [ value, setValue ] = useState<null | string>(null);

    const onBlur = ( event: Event ) => {
        const input = event.currentTarget as HTMLInputElement;
        if ( !input.value ) setError("Input value missing");
    }

    const onFocus = () => {
        setError(null);
    }

    const onInput = ( event: Event ) => {
        const input = event.currentTarget as HTMLInputElement;
        setValue(input.value);
    }

    useEffect(() => {
        const inputElem = inputRef.current as HTMLInputElement;

        inputElem.addEventListener("blur", onBlur);
        inputElem.addEventListener("focus", onFocus);
        inputElem.addEventListener("input", onInput)

        return () => {
            inputElem.removeEventListener("blur", onBlur);
            inputElem.removeEventListener("focus", onFocus);
            inputElem.removeEventListener("input", onInput);
        }
    }, []);

    useEffect(() => {
        const inputElem = inputRef.current as HTMLInputElement;
        if ( error ) {
            inputElem.value = error;
            inputElem.classList.add("errorInput");
        } else if ( !error && !value ) {
            inputElem.value = "";
            inputElem.classList.remove("errorInput");
        }
    }, [ error, value ]);

    return { error, value, setError };
}

interface FormElement {
    formElem: HTMLInputElement | HTMLTextAreaElement;
    name: string;
    value: string;
    isError: boolean;
    errorMessage: string;
}

interface FormData {
    [ index: string ]: string;
}

export function useFormValidation(formRef: RefObject<HTMLFormElement>) {
    const [ formElements, setFormElements ] = useState<FormElement[]>([]);
    const [ formData, setFormData ] = useState<any>({});

    function checkFormElem(event: Event) {
        setFormElements(state => {
            const formElem = event.currentTarget as HTMLInputElement | HTMLTextAreaElement;
            const { name, value } = formElem;
            const restFormElements = state.filter(item => item.formElem.name !== name);
            let newFormElementObject: FormElement;
            if ( value.length === 0 ) {
                formElem.value = "Input value missing";
                formElem.classList.add("errorInput");
                newFormElementObject = {
                    formElem,
                    name,
                    value,
                    errorMessage: "Input value missing",
                    isError: true
                };
                restFormElements.push(newFormElementObject);
                return restFormElements;
            }
            return state;
        });
    }

    function focusFormElem(event: Event) {
        const formElem = event.currentTarget as HTMLInputElement | HTMLTextAreaElement;
        if ( formElem.value.toLowerCase() === "input value missing" ) formElem.value = "";
        formElem.classList.remove("errorInput");

        setFormElements(state => {
            const { name, value } = formElem;
            const restFormElements = state.filter(item => item.formElem.name !== name);
            const formElementObject: FormElement = {
                formElem,
                name,
                value,
                isError: false,
                errorMessage: ""
            };
            restFormElements.push(formElementObject);
            return restFormElements;
        });
    }

    function inputFormElem(event: Event) {
        const formElem = event.currentTarget as HTMLInputElement | HTMLTextAreaElement;
        setFormElements(state => {
            const { name, value } = formElem;
            const restFormElements = state.filter(item => item.formElem.name !== name);
            const newFormElementObject = {
                formElem,
                name,
                value,
                isError: false,
                errorMessage: ""
            };
            restFormElements.push(newFormElementObject);
            return restFormElements;
        });
    }

    useEffect(() => {
        const form = formRef.current as HTMLFormElement;
        const childrenForm = form.children as HTMLCollectionOf<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>;
        const newFormElements: FormElement[] = [];

        Array.from(childrenForm).forEach(formElem => {
            if ( formElem.tagName.toLowerCase() !== "button" && formElements.length < 4 ) {
                formElem.addEventListener("blur", checkFormElem);
                formElem.addEventListener("focus", focusFormElem);
                formElem.addEventListener("input", inputFormElem);

                const newElemObject = { formElem, isError: true, errorMessage: "Input value missing" } as FormElement;
                newFormElements.push(newElemObject);
            }
        });

        setFormElements(newFormElements);

        return () => {
            Array.from(childrenForm).forEach(formElem => {
                formElem.removeEventListener("blur", checkFormElem);
                formElem.removeEventListener("focus", focusFormElem);
                formElem.removeEventListener("input", inputFormElem);
            });
        }
    }, []);

    useEffect(() => {
        const newFormData = formElements.reduce((obj, item) => {
            const { name, value } = item;
            if ( name && value ) obj[name] = value;
            return obj;
        }, {} as FormData);
        setFormData(newFormData);
    }, [ formElements ]);

    return { formData, formElements };
}

export function useDatalist(name: string) {
    const [ options, setOptions ] = useState<string[]>([]);

    useEffect(() => {
        const cookieName = cookie.get(name);
        if ( typeof cookieName === "boolean" ) return;
        const inputCookie = decodeURIComponent(cookieName);
        const arrayInputCookie = inputCookie.split(/\_/g);
        setOptions(arrayInputCookie);
    }, []);

    const datalistElement = useMemo(() => (
        options.length === 0
        ?
        null
        :
        <datalist id={name}>
            {
                options.map((item, index) => (
                    <option key={index} value={item}>{ item }</option>
                ))
            }
        </datalist>
    ), [ options ]);

    return datalistElement;
}

export function useBlogData(id: number | null) {
    const { blogs, setBlogs } = useContext(BlogsContext);
    const blogData = useMemo(() => blogs.find(item => item.id === id), [ blogs ]);
    if ( !blogData ) throw new Error("This id doesn`t exist");

    function setBlogData(data: IBlog) {
        setBlogs(state => state.map(item => {
            if ( item.id === data.id ) return data;
            else return item;
        }));
    }

    return { blogData, setBlogData };
}

export function useIdOfBlog() {
    const id = useContext(IdContext);
    return id;
}

interface IUserData {
    id: number;
    email: string;
    isVerified: boolean;
}

export function useNowUser() {
    const [ userData, setUserData ] = useState<IUserData | null>(null);
    
    useEffect(() => {
        const id = +cookie.get("id");
        let email = cookie.get("email") as string;
        const isVerified = Boolean(cookie.get("isVerified"));
        if ( email ) {
            email = decodeURIComponent(email);
            setUserData({ id, email, isVerified });
        }
    }, []);

    return userData;
}

export function useCommentVisible() {
    const commentVisibleContext = useContext(CommentVisibleContext);
    return commentVisibleContext;
}

export function useLoading(falsedValue: boolean, onLoadShow: JSX.Element) {
    const [ countOfPeriod, setCountOfPeriod ] = useState(3);

    let loading = (
        <p className="loading_text">
            Loading{Array.from({ length: countOfPeriod }).map(() => ".")}
        </p>
    )

    useEffect(() => {
        let timeout = setTimeout(function setLoading() {
            setCountOfPeriod(state => {
                if ( state >= 3 ) return 1;
                else return state + 1;
            });
            if ( falsedValue ) clearTimeout(timeout);
            else timeout = setTimeout(setLoading, 100);
        }, 250);

        return () => {
            clearTimeout(timeout);
        }
    }, []);

    return falsedValue ? onLoadShow : loading;
}