import { useRef } from 'react';

type DebounceFunction = (data: any) => void;
type MergeFunction = (data: any, dataEl: any) => any;

const useDebounce = (callback: DebounceFunction, merge: MergeFunction, delay: number): DebounceFunction => {
    const timeout = useRef<NodeJS.Timeout>();
    const data = useRef<any>();

    const debounce: DebounceFunction = (dataEl: any) => {
        data.current = merge(data.current, dataEl);

        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => callback(data.current), delay);
    };

    return debounce;
};

export default useDebounce;
