import { ChangeEvent, FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import searchIcon from '../../../public/icons/search.svg';
import { color } from '../../styles/theme';
import useDebounce from '../../hooks/useDebounce';
import InputColumn from './FilterColumn';

const Container = styled.div<{ popupOpened: boolean }>`
    width: 100%;
    border-radius: 5px;
    background: ${color('black3')};
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 6px 8px;
    box-shadow: inset ${props => (props.popupOpened ? 0 : '1px')} 2px 2px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
`;

const Input = styled.input`
    color: ${color('white0')};
    font-size: 16px;
    font-weight: 200;
    outline: none;
    border: none;
    background: transparent;
    width: 100%;

    &::placeholder {
        color: ${color('white2')};
    }
`;

const Icon = styled.img`
    width: 16px;
    height: 16px;
    cursor: pointer;
    margin-right: 10px;
`;

const PopupContainer = styled.div`
    position: absolute;
    top: calc(100% - 5px);
    left: 0;
    width: 100%;
    height: fit-content;
    transform: translate();
    background: ${color('black0')};
    border-radius: 0 0 5px 5px;
    z-index: 99;
    padding: 8px 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

type Props = {
    showFilters: boolean;
    hideFilters: () => void;
};

const SearchBar: FunctionComponent<Props> = ({ showFilters, hideFilters }) => {
    const [filters, setFilters] = useState<{ [key: string]: any }>({});
    const [prompt, setPrompt] = useState('');

    const inputDebounce = useDebounce<string>(
        prompt => {},
        (_, cur) => {
            setPrompt(cur);
            return cur;
        },
        500
    );

    const filterDebounce = useDebounce<{ [key: string]: any }>(
        obj => setFilters(obj),
        (prev, cur) => ({ ...prev, ...cur }),
        100
    );

    return (
        <Container id="searchbar" popupOpened={showFilters}>
            <Icon src={searchIcon.src} onClick={() => hideFilters()} />
            <Input placeholder="Search..." value={prompt} onChange={(e: ChangeEvent) => inputDebounce((e.target as HTMLInputElement).value)} />

            {showFilters && (
                <PopupContainer>
                    <InputColumn
                        title="questions"
                        options={['any', { isInput: true, defaultValue: 10, label: '+' }]}
                        onChange={value => filterDebounce({ questions: value })}
                    />
                    <InputColumn
                        title="sort by"
                        options={['popularity', 'creation date', 'rating', 'questions']}
                        onChange={value => filterDebounce({ sort_by: value })}
                    />
                    <InputColumn title="order" options={['descending', 'ascending']} onChange={value => filterDebounce({ order: value })} />
                </PopupContainer>
            )}
        </Container>
    );
};

export default SearchBar;
