import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const GameDetails: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>{id}</h1>
            {/* Game with id [id] */}
        </div>
    );
};

export const getServerSideProps = async () => {
    // TODO: return {notFound: true} if there is no such game
    return { props: {} };
};

export default GameDetails;
