import styles from "../globalStyles/TheHeaderTopMenu.module.scss";
import { useTypedSelector, useDispatch } from "../lib/customHooks";
import { setMenuOpen, setMenuClose } from "../redux/slices/isMenuOpen";

const TheHeaderTopMenu = () => {
    const isMenuOpen = useTypedSelector((state) => state.isMenuOpen) as boolean;
    const dispatch = useDispatch();

    const onClick = () => dispatch( isMenuOpen ? setMenuClose() : setMenuOpen() );

    return(
        <div className={styles.header_top__menu} onClick={onClick}>
            {
                Array.from({ length: 3 }).map((_i, index) => <div key={index} className={styles.header_top__menu___line}></div>)
            }
        </div>
    )
}

export default TheHeaderTopMenu;