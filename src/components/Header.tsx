import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { color } from '../styles/theme';
import DropDown from './DropDown';
import exitIcon from '../../public/icons/exit.svg';
import profileIcon from '../../public/icons/profile.svg';
import { AuthProps } from './GoogleAuthProvider';

const Container = styled.div`
    width: 100vw;
    height: 4vh;
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

const Username = styled.p`
    font-size: 16px;
    font-weight: 200;
    margin: auto 4px auto 0;
`;

const UserIcon = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 10px;
`;

const Header: FunctionComponent<AuthProps> = ({ user: _user, auth: { user, login, logout } }) => {
    const router = useRouter();

    return (
        <>
            <Container /> {/* Empty container to have implicit margin where header should be */}
            <FixedContainer>
                <Row>
                    <Title onClick={() => router.push('/')}>Kahut!</Title>
                    <Row>
                        <HeaderLink onClick={() => router.push('/games')}>Browse games</HeaderLink>
                        {user && <HeaderLink onClick={() => router.push('/my_games')}>My games</HeaderLink>}
                        <HeaderLink onClick={() => router.push('/play')}>Play</HeaderLink>
                    </Row>
                </Row>

                <Row>
                    {user ? (
                        <DropDown
                            items={[
                                { title: 'Profile', icon: profileIcon, onClick: () => router.push('/me') },
                                { title: 'Logout', icon: exitIcon, onClick: logout },
                            ]}
                        >
                            <Username>{user.username}</Username>
                            <UserIcon src={user.avatar} />
                        </DropDown>
                    ) : (
                        <ButtonLink onClick={login}>Log in</ButtonLink>
                    )}
                </Row>
            </FixedContainer>
        </>
    );
};

export default Header;
