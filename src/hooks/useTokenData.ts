import { useEffect, useState } from 'react';
import placeholderImage from '../../public/images/placeholder-avatar.jpeg';
import { getTokenData } from '../utils/authentication';

const useTokenData = () => {
    const [token, setToken] = useState({ avatar: placeholderImage.src, username: ' ', email: ' ', is_authenticated: false });

    useEffect(() => {
        const data = getTokenData();
        setToken({ ...data, is_authenticated: !!data });
    }, []);

    return token;
};

export default useTokenData;
