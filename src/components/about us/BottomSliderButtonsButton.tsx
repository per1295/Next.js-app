import { FunctionComponent, useContext, useEffect, useRef } from "react";
import styles from "../../styles/about us/BottomSliderButtonsButton.module.scss";
import { SliderContext } from "./TheWrapSlider";

interface BottomSliderButtonsButtonProps {
    activeSlide: number;
}

const BottomSliderButtonsButton: FunctionComponent<BottomSliderButtonsButtonProps> = ({ activeSlide }) => {
    const { nowSlide, setNowSlide } = useContext(SliderContext);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const button = buttonRef.current as HTMLDivElement;
        if ( nowSlide === activeSlide ) button.classList.add(styles.bottom_slideButtons__buttonAcvive);
        else button.classList.remove(styles.bottom_slideButtons__buttonAcvive);
    }, [ nowSlide ]);

    return(
        <div
        ref={buttonRef}
        className={
            activeSlide === 0
            ?
            `${styles.bottom_slideButtons__button} ${styles.bottom_slideButtons__buttonAcvive}`
            :
            styles.bottom_slideButtons__button
        }
        onClick={() => setNowSlide(activeSlide)}>
        </div>
    )
}

export default BottomSliderButtonsButton;