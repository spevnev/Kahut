import React from 'react';
import { NextPage } from 'next';
import { isBrowser } from '../utils/helper';
import { useRouter } from 'next/router';
import User from '../utils/user';

type Props = {
    user: User;
};

const UsersGames: NextPage<Props> = ({ user }) => {
    const router = useRouter();

    if (isBrowser() && !user) router.push('/');

    return <div>{/* My games + ratings/statistics(or in profile) + create */}</div>;
};

export default UsersGames;
