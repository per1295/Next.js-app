import { MouseEventHandler, useEffect, useRef } from "react";
import { useDispatch, useTypedSelector } from "../../lib/customHooks";
import { setOption } from "../../redux/slices/categoryOption";
import styles from "../../styles/home/TheMainSecondGroupCategoryLeftOptions.module.scss";

const TheMainSecondGroupCategoryLeftOptions = () => {
    const categoryOption = useTypedSelector((state) => state.categoryOption) as string;
    const dispatch = useDispatch();
    const ulElement = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const ul = ulElement.current as HTMLUListElement;
        const childrenLi = ul.children as HTMLCollectionOf<HTMLLIElement>;

        Array.from(childrenLi).forEach(item => {
            const option = item.dataset.option as string;
            if ( option !== categoryOption ) item
            .classList
            .remove(styles.main_secondGroup__category___left____options_____optionActive); 
        });
    }, [ categoryOption ]);

    const options = [ "All", "webdesign", "graphic design", "fashion", "logo design", "advertising" ];

    const onClickOption: MouseEventHandler<HTMLLIElement> = (event) => {
        const liElement = event.currentTarget;
        const option = liElement.dataset.option;
        if ( option ) {
            dispatch( setOption(option) );
            liElement.classList.add(styles.main_secondGroup__category___left____options_____optionActive);
        }
    }

    return(
        <ul ref={ulElement} className={styles.main_secondGroup__category___left____options}>
            { options.map(( item, index ) => (
                <li
                key={index}
                className={
                    index === 0
                    ?
                    `${styles.main_secondGroup__category___left____options_____option} ${styles.main_secondGroup__category___left____options_____optionActive}`
                    :
                    styles.main_secondGroup__category___left____options_____option
                }
                data-option={item.toLowerCase()}
                onClick={onClickOption}>
                    { item }
                </li>
            )) }
        </ul>
    )
}

export default TheMainSecondGroupCategoryLeftOptions;