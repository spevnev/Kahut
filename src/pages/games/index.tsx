import React, { MouseEvent, useRef, useState } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import GameCardType from '../../types/gameCard';
import GameCard from '../../components/gameBrowser/GameCard';
import Header from '../../components/Header';
import User from '../../types/user';
import SearchBar from '../../components/gameBrowser/SearchBar';

// ! TEMP DATA
const DATA: GameCardType[] = [
    {
        title: 'Game 1',
        description:
            'Some description. Et quia ut qui consectetur porro labore dolores dolor. Officiis itaque ipsum autem consectetur. Perspiciatis labore deserunt debitis nulla possimus similique quibusdam possimus. Corrupti molestiae cumque amet aut doloremque. Et quia ut qui consectetur porro labore dolores dolor. Officiis itaque ipsum autem consectetur. Perspiciatis labore deserunt debitis nulla possimus similique quibusdam possimus. Corrupti molestiae cumque amet aut doloremque.',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fopenclipart.org%2Fimage%2F300px%2Fsvg_to_png%2F194077%2FPlaceholder.png&f=1&nofb=1&ipt=aae9d569d5b988518b0386659f4b46e51b2f5924c2b91410e4305a69b102b9fd&ipo=images',
        id: 'asgd',
        rating: 1,
        players: 146,
        questions: 17,
        user: {
            username: "This username is pretty long, isn't it?",
            avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fspng.pngfind.com%2Fpngs%2Fs%2F610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png&f=1&nofb=1&ipt=8caaaebf308c8f5bee99fabaaf990a31b0d52c99bdeabf6e45f83cceac6b1288&ipo=images',
        },
    },
    {
        title: 'Game number 2',
        description:
            'Some description. Et quia ut qui consectetur porro labore dolores dolor. Officiis itaque ipsum autem consectetur. Perspiciatis labore deserunt debitis nulla possimus similique quibusdam possimus. Corrupti molestiae cumque amet aut doloremque.',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdesignshack.net%2Fwp-content%2Fuploads%2Fplaceholder-image.png&f=1&nofb=1&ipt=60b55d3670b1f0935de040688f23d1e575c918947f5870a5fb52481c5662d807&ipo=images',
        id: 'ai76',
        rating: 2,
        players: 133,
        questions: 122,
        user: {
            username: 'User',
            avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fspng.pngfind.com%2Fpngs%2Fs%2F610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png&f=1&nofb=1&ipt=8caaaebf308c8f5bee99fabaaf990a31b0d52c99bdeabf6e45f83cceac6b1288&ipo=images',
        },
    },
    {
        title: 'Game 3 has the longest title out of all the games',
        description:
            'Some description. Et quia ut qui consectetur porro labore dolores dolor. Officiis itaque ipsum autem consectetur. Perspiciatis labore deserunt debitis nulla possimus similique quibusdam possimus. Corrupti molestiae cumque amet aut doloremque.',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fopenclipart.org%2Fimage%2F300px%2Fsvg_to_png%2F194077%2FPlaceholder.png&f=1&nofb=1&ipt=aae9d569d5b988518b0386659f4b46e51b2f5924c2b91410e4305a69b102b9fd&ipo=images',
        rating: 3,
        id: 'ahsd',
        players: 16,
        questions: 15,
        user: {
            username: '',
            avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fspng.pngfind.com%2Fpngs%2Fs%2F610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png&f=1&nofb=1&ipt=8caaaebf308c8f5bee99fabaaf990a31b0d52c99bdeabf6e45f83cceac6b1288&ipo=images',
        },
    },
    {
        title: 'Fourth game',
        description:
            'Some description. Et quia ut qui consectetur porro labore dolores dolor. Officiis itaque ipsum autem consectetur. Perspiciatis labore deserunt debitis nulla possimus similique quibusdam possimus. Corrupti molestiae cumque amet aut doloremque. Et quia ut qui consectetur porro labore dolores dolor. Officiis itaque ipsum autem consectetur. Perspiciatis labore deserunt debitis nulla possimus similique quibusdam possimus. Corrupti molestiae cumque amet aut doloremque. Et quia ut qui consectetur porro labore dolores dolor. Officiis itaque ipsum autem consectetur. Perspiciatis labore deserunt debitis nulla possimus similique quibusdam possimus. Corrupti molestiae cumque amet aut doloremque.',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdesignshack.net%2Fwp-content%2Fuploads%2Fplaceholder-image.png&f=1&nofb=1&ipt=60b55d3670b1f0935de040688f23d1e575c918947f5870a5fb52481c5662d807&ipo=images',
        id: 's7a',
        rating: 4,
        players: 881,
        questions: 12,
        user: {
            username: 'The User',
            avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fspng.pngfind.com%2Fpngs%2Fs%2F610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png&f=1&nofb=1&ipt=8caaaebf308c8f5bee99fabaaf990a31b0d52c99bdeabf6e45f83cceac6b1288&ipo=images',
        },
    },
    {
        title: 'That game',
        description: 'Some description. Et quia ut qui consectetur porro labore dolores dolor.',
        image: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fthewowstyle.com%2Fwp-content%2Fuploads%2F2015%2F01%2Fnature-images.jpg&f=1&nofb=1&ipt=8033037c9770219270aa68c8647707ac1dd1051f20f7d6595eea52ab33e55b06&ipo=images',
        rating: 5,
        id: 'a1234',
        players: 171,
        questions: 20,
        user: {
            username: 'The User',
            avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fspng.pngfind.com%2Fpngs%2Fs%2F610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png&f=1&nofb=1&ipt=8caaaebf308c8f5bee99fabaaf990a31b0d52c99bdeabf6e45f83cceac6b1288&ipo=images',
        },
    },
    {
        title: 'The game',
        description: 'Some description. Et quia ut qui consectetur porro labore dolores dolor. Officiis itaque ipsum autem consectetur. ',
        id: 'ahs',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pixelstalk.net%2Fwp-content%2Fuploads%2F2016%2F08%2FNature-wallpapers-Full-HD-backgroud.jpg&f=1&nofb=1&ipt=7e05dc73fdcf627cc9fd2e70ef7a8b3757ee21cda4e14ae7bff285aacea889c1&ipo=images',
        rating: 1.5,
        players: 31,
        questions: 14,
        user: {
            username: 'User',
            avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fspng.pngfind.com%2Fpngs%2Fs%2F610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png&f=1&nofb=1&ipt=8caaaebf308c8f5bee99fabaaf990a31b0d52c99bdeabf6e45f83cceac6b1288&ipo=images',
        },
    },
    {
        title: 'Game: Endgame',
        description:
            'Some description. Et quia ut qui consectetur porro labore dolores dolor. Officiis itaque ipsum autem consectetur. Perspiciatis labore deserunt debitis nulla possimus similique quibusdam possimus. Corrupti molestiae cumque amet aut doloremque.',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1529429617124-95b109e86bb8%3Fixlib%3Drb-0.3.5%26q%3D80%26fm%3Djpg%26crop%3Dentropy%26cs%3Dtinysrgb%26w%3D1080%26fit%3Dmax%26ixid%3DeyJhcHBfaWQiOjEyMDd9%26s%3D4be6f29d095bc56cb800cc08ea6b3480&f=1&nofb=1&ipt=d1d8341b9e592d1de0f71a68be17475591446355e0a0fe314211126223d62253&ipo=images',
        rating: 2.5,
        id: 'a63',
        players: 1,
        questions: 9,
        user: {
            username: 'The User',
            avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fspng.pngfind.com%2Fpngs%2Fs%2F610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png&f=1&nofb=1&ipt=8caaaebf308c8f5bee99fabaaf990a31b0d52c99bdeabf6e45f83cceac6b1288&ipo=images',
        },
    },
    {
        title: "I don't know what else i can enter here",
        description: '',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F2c%2F7f%2F69%2F2c7f69bb875315e9a3107e3cd1f904c4.jpg&f=1&nofb=1&ipt=fb9eb0a9f3d51d56bf6bca132e7919713c09fbb2a65aafb202050f7153042aff&ipo=images',
        rating: 4.5,
        id: 'aaf',
        players: 1784,
        questions: 15,
        user: {
            username: 'The User',
            avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fspng.pngfind.com%2Fpngs%2Fs%2F610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png&f=1&nofb=1&ipt=8caaaebf308c8f5bee99fabaaf990a31b0d52c99bdeabf6e45f83cceac6b1288&ipo=images',
        },
    },
    {
        title: 'Placeholder, perhaps',
        description: 'Corrupti molestiae cumque amet aut doloremque.',
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdesignshack.net%2Fwp-content%2Fuploads%2Fplaceholder-image.png&f=1&nofb=1&ipt=60b55d3670b1f0935de040688f23d1e575c918947f5870a5fb52481c5662d807&ipo=images',
        rating: 5.0,
        players: 10000000,
        id: 'av',
        questions: 16,
        user: {
            username: 'The User',
            avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fspng.pngfind.com%2Fpngs%2Fs%2F610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png&f=1&nofb=1&ipt=8caaaebf308c8f5bee99fabaaf990a31b0d52c99bdeabf6e45f83cceac6b1288&ipo=images',
        },
    },
];

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1vw;
`;

const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, max(min(15vw, 300px), 200px));
    grid-gap: max(min(2vw, 50px), 5px);
    justify-content: space-between;
    width: 100%;
    height: 100%;
    margin-top: 1vw;
`;

type Props = {
    user: User;
};

const GameBrowser: NextPage<Props> = ({ user }) => {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <>
            <Header user={user} />

            <Container onClick={e => setShowFilters((e.nativeEvent.composedPath() as HTMLElement[]).filter(el => el.id === 'searchbar').length > 0)}>
                <SearchBar showFilters={showFilters} />

                <Cards>
                    {DATA.map(card => (
                        <GameCard {...card} key={card.id} />
                    ))}
                </Cards>
            </Container>
        </>
    );
};

export default GameBrowser;
