import { useEffect, useRef } from 'react';

const isVisible = (element?: HTMLElement, screenPositionCoefficient = 1): boolean => {
    if (!element) return false;

    const minHeight = window.innerHeight * screenPositionCoefficient + window.scrollY;
    return minHeight > element.offsetTop;
};

type Props = {
    screenPositionCoefficient?: number;
    callback: () => any;
};

const useOnVisible = ({ screenPositionCoefficient, callback }: Props) => {
    const elementRef = useRef();
    const wasSeen = useRef(false);

    const onWindowChange = () => {
        if (wasSeen.current || !isVisible(elementRef.current, screenPositionCoefficient)) return;
        wasSeen.current = true;

        callback();
    };

    useEffect(() => {
        window.addEventListener('scroll', onWindowChange);
        window.addEventListener('resize', onWindowChange);

        return () => {
            window.removeEventListener('scroll', onWindowChange);
            window.removeEventListener('resize', onWindowChange);
        };
    }, []);

    return [elementRef, wasSeen];
};

export default useOnVisible;
