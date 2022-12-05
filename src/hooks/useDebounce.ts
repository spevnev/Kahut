import { useRef } from 'react';

type CallbackFunction<T> = (data: T) => void;
type MergeFunction<T> = (curentData: T | null, newData: T) => T;
type DebounceFunction<T> = (data: T) => void;

const useDebounce = <T>(callback: CallbackFunction<T>, merge: MergeFunction<T>, delay: number) => {
    const timeout = useRef<NodeJS.Timeout>();
    const data = useRef<T | null>(null);

    const debounce: DebounceFunction<T> = newData => {
        data.current = merge(data.current, newData);

        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => callback(data.current as T), delay);
    };

    return debounce;
};

export default useDebounce;
