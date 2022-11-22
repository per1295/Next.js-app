import { FunctionComponent, PointerEventHandler, useEffect, useRef } from "react";
import { useTypedSelector } from "../../lib/customHooks";
import CheckboxLine from "./CheckboxLine";
import Button from "../../globalComponents/Button";
import styles from "../../styles/services/MainServicesSecondGroupPlansPlan.module.scss";
import { useRouter } from "next/router";

interface MainServicesSecondGroupPlansPlanProps {
    title: string;
    price: string;
}

const MainServicesSecondGroupPlansPlan: FunctionComponent<MainServicesSecondGroupPlansPlanProps> = ({ title, price }) => {
    const isMobile = useTypedSelector<"isMobile">(state => state.isMobile);
    const isOnDocument = useTypedSelector<"isOnDocument">(state => state.isOnDocument);
    const isTablet = useTypedSelector<"isTablet">(state => state.isTablet);
    const planRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const isMobileOrTablet = isMobile || isTablet;

    useEffect(() => {
        if ( isOnDocument ) {
            const plan = planRef.current as HTMLDivElement;
            plan.classList.remove(styles.mainServices_secondGroup__plans___planActive);
        }
    }, [ isOnDocument ]);

    const checkboxLineTitles = [
        "Lorem ipsum dolor sit amet",
        "Consectetuer adipiscing elit",
        "Sed diam nonummy",
        "Nibh euismod tincidunt",
        "Ut laoreet dolore",
        "Magna aliquam erat volutpat"
    ];

    const onEnter: PointerEventHandler<HTMLDivElement> = (event) => {
        const plan = event.currentTarget;
        plan.classList.add(styles.mainServices_secondGroup__plans___planActive);
    }

    const onLeave: PointerEventHandler<HTMLDivElement> = (event) => {
        const plan = event.currentTarget;
        plan.classList.remove(styles.mainServices_secondGroup__plans___planActive);
    }

    const onDown: PointerEventHandler<HTMLDivElement> = (event) => event.stopPropagation();

    const toContactUs = () => router.push("/contact");

    return(
        <div className={styles.mainServices_secondGroup__plans___plan}
        ref={planRef}
        onPointerEnter={isMobileOrTablet ? undefined : onEnter}
        onPointerLeave={isMobileOrTablet ? undefined : onLeave}
        onPointerDown={isMobileOrTablet ? onDown : undefined}
        onClick={isMobileOrTablet ? onEnter : undefined}>
            <div className={styles.mainServices_secondGroup__plans___plan____greenLine}></div>
            <div className={styles.mainServices_secondGroup__plans___plan____corner}></div>
            <div className={styles.mainServices_secondGroup__plans___plan____conteiner}>
                <span className={styles.mainServices_secondGroup__plans___plan____conteiner_____title}>
                    { title }
                </span>
                <div className={styles.mainServices_secondGroup__plans___plan____conteiner_____price}>
                    { price }
                </div>
                <div className={styles.mainServices_secondGroup__plans___plan____conteiner_____checkboxes}>
                    {
                        checkboxLineTitles.map((item, index) => (
                            <CheckboxLine key={index}>
                                { item }
                            </CheckboxLine>
                        ))
                    }
                </div>
                <Button
                onClick={toContactUs}
                startColor="green"
                className={styles.mainServices_secondGroup__plans___plan____conteiner_____button}>
                    get started
                </Button>
            </div>
        </div>
    )
}

export default MainServicesSecondGroupPlansPlan;