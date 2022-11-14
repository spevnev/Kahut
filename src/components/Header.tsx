import { FunctionComponent, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { color } from '../styles/theme';
import DropDown from './DropDown';
import exitIcon from '../../public/icons/exit.svg';
import profileIcon from '../../public/icons/profile.svg';
import { AuthContext } from '../providers/GoogleAuthProvider';
import menuIcon from '../../public/icons/menu.svg';
import ScalingText from './ScalingText';
import Button from './Button';
import crossIcon from '../../public/icons/cross.svg';

const Container = styled.div`
    width: 100vw;
    min-height: 30px;
    height: 4vh;
    max-height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const FixedContainer = styled(Container)`
    background: ${color('black0')};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Title = styled.h2`
    font-size: 24px;
    font-weight: 500;
    font-style: italic;
    margin: 0 25px;
    cursor: pointer;
`;

const UnstyledLink = styled.a`
    font-size: 16px;
    text-decoration: none;
    color: ${color('white0')};
    cursor: pointer;
`;

const HeaderLink = styled(UnstyledLink)`
    margin: 0 10px;
    font-weight: 200;
`;

const ButtonLink = styled(UnstyledLink)`
    font-size: 16px;
    padding: 3px 20px;
    border-radius: 5px;
    background: ${color('frost0')};
    margin: 0 15px;
    transition: filter 0.2s;

    &:hover {
        filter: brightness(1.1);
    }
`;

const Username = styled(ScalingText)`
    font-weight: 200;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: auto 0;
`;

const UserIcon = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin: 0 10px 0 5px;
`;

const FullscreenContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: ${color('black0')};
    z-index: 999999999;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`;

const ToggleHeader = styled(Button)`
    padding: 8px;
    border-radius: 50%;
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 999999999;

    & img {
        width: 16px;
        height: 16px;
    }
`;

const Links: FunctionComponent = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    return (
        <>
            <HeaderLink onClick={() => router.push('/games')}>Browse games</HeaderLink>
            {user && <HeaderLink onClick={() => router.push('/my_games')}>My games</HeaderLink>}
            <HeaderLink onClick={() => router.push('/play')}>Play</HeaderLink>
        </>
    );
};

const UserProfile: FunctionComponent<{ width: number }> = ({ width }) => {
    const { user, login, logout } = useContext(AuthContext);
    const router = useRouter();

    if (!user) return <ButtonLink onClick={login}>Log in</ButtonLink>;
    return (
        <DropDown
            items={[
                { title: 'Profile', icon: profileIcon, onClick: () => router.push('/me') },
                { title: 'Logout', icon: exitIcon, onClick: logout },
            ]}
        >
            <Row style={{ justifyContent: 'flex-end', maxWidth: width + 'vw' }}>
                <Username max={16} charsPerPx={10} min={10}>
                    {user.name}
                </Username>
                <UserIcon src={user.picture} />
            </Row>
        </DropDown>
    );
};

const Header: FunctionComponent = () => {
    const [isHeaderOpened, setIsHeaderOpened] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const router = useRouter();

    useEffect(() => void setHasMounted(true), []);

    if (!hasMounted) return null;

    if (window.innerHeight < 400 || window.innerWidth < 600)
        return (
            <>
                {isHeaderOpened && (
                    <FullscreenContainer>
                        <Title onClick={() => router.push('/')}>Kahut!</Title>
                        <div style={{ margin: '5px 0' }} />
                        <Links />
                        <div style={{ margin: '5px 0' }} />
                        <UserProfile width={80} />
                    </FullscreenContainer>
                )}
                <ToggleHeader onClick={() => setIsHeaderOpened(!isHeaderOpened)}>
                    <img src={isHeaderOpened ? crossIcon.src : menuIcon.src} />
                </ToggleHeader>
            </>
        );
    else
        return (
            <>
                <Container /> {/* Empty container to have implicit margin where header should be */}
                <FixedContainer>
                    <Row style={{ minWidth: 'fit-content' }}>
                        <Title onClick={() => router.push('/')}>Kahut!</Title>
                        <Row>
                            <Links />
                        </Row>
                    </Row>

                    <UserProfile width={25} />
                </FixedContainer>
            </>
        );
};

export default Header;
