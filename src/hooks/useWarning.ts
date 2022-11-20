import { useEffect, useRef } from 'react';

const useWarning = (message?: string) => {
    const isSafeToLeave = useRef<boolean>(true);
    const confirmationMessage = useRef<string>(message + 'Are you sure you want to leave?');

    const onLeave = (e: BeforeUnloadEvent) => {
        if (isSafeToLeave.current) return undefined;

        e.returnValue = confirmationMessage.current; // firefox, IE
        return confirmationMessage.current; // chrome, safari
    };

    useEffect(() => {
        window.addEventListener('beforeunload', onLeave);
        return () => window.removeEventListener('beforeunload', onLeave);
    }, []);

    return (value: boolean) => (isSafeToLeave.current = value);
};

export default useWarning;
