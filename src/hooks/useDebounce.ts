import { useRef } from 'react';

type CallbackFunction<T> = (data: T) => void;
type DebounceFunction<T> = (data: T) => void;
type MergeFunction<T> = (data: T, dataEl: T) => T;

const useDebounce = <T>(callback: CallbackFunction<T>, merge: MergeFunction<T>, delay: number) => {
    const timeout = useRef<NodeJS.Timeout>();
    const data = useRef<any>();

    const debounce: DebounceFunction<T> = dataEl => {
        data.current = merge(data.current, dataEl);

        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => callback(data.current), delay);
    };

    return debounce;
};

export default useDebounce;
