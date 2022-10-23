import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

const Game: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>{id}</h1>
            {/* Game with id [id] */}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    // TODO: return {notFound: true} if there is no such pending game
    return { props: {} };
};

export default Game;
