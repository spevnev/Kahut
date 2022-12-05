import { useEffect, useRef } from 'react';

const DEFAULT_CONFIRMATION_MESSAGE = 'Are you sure you want to leave?';

const useWarning = (message?: string) => {
    const isSafeToLeave = useRef<boolean>(true);
    const confirmationMessage = useRef<string>(message + DEFAULT_CONFIRMATION_MESSAGE);

    const onUnload = (event: BeforeUnloadEvent) => {
        if (isSafeToLeave.current) return undefined;

        event.returnValue = confirmationMessage.current; // firefox, IE
        return confirmationMessage.current; // chrome, safari
    };

    useEffect(() => {
        window.addEventListener('beforeunload', onUnload);
        return () => window.removeEventListener('beforeunload', onUnload);
    }, []);

    return (value: boolean) => (isSafeToLeave.current = value);
};

export default useWarning;
