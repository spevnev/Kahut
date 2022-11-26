import { useEffect, useRef } from 'react';

const isVisible = (el: HTMLElement | undefined, positionCoefficient: number = 1): boolean =>
    el ? el.offsetTop < window.innerHeight * positionCoefficient + window.scrollY : false;

type Props = {
    positionCoefficient?: number;
    callback: () => any;
};

const useOnVisible = ({ positionCoefficient, callback }: Props) => {
    const ref = useRef();
    const wasSeen = useRef(false);

    const _callback = () => {
        if (wasSeen.current || !isVisible(ref.current, positionCoefficient)) return;
        wasSeen.current = true;

        callback();
    };

    useEffect(() => {
        window.addEventListener('scroll', _callback);
        window.addEventListener('resize', _callback);

        return () => {
            window.removeEventListener('scroll', _callback);
            window.removeEventListener('resize', _callback);
        };
    }, []);

    return [ref, wasSeen];
};

export default useOnVisible;
