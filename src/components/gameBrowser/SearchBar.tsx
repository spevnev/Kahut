import React, { FunctionComponent, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import searchIcon from '../../../public/icons/search.svg';
import { color } from '../../styles/theme';
import useDebounce from '../../hooks/useDebounce';
import Radio from '../Radio';
import InlineInput from '../InlineInput';

const Container = styled.div<{ popupOpened: boolean }>`
    width: 100%;
    border-radius: ${props => (props.popupOpened ? '5px 5px 0 0' : '5px')};
    background: ${color('black3')};
    outline: none;
    border: none;
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
    left: 0;
    top: 100%;
    width: 100%;
    height: fit-content;
    background: ${color('black0')};
    border-radius: 0 0 5px 5px;
    z-index: 99;
    padding: 8px 12px;
`;

const PopupInner = styled.div`
    min-width: 320px;
    width: fit-content;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Title = styled.p`
    font-size: 16px;
    font-weight: 200;
    color: ${color('white0')};
`;

const Option = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    & input[type='radio'] {
        margin-right: 5px;
    }
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 200;
    color: ${color('white1')};
    cursor: pointer;
`;

const OptionInput = styled(InlineInput)`
    font-size: 14px;
    width: 33.34px;
`;

export type SearchOptions = {
    prompt: string;
    filters: {
        questionNum: string | number;
        orderBy: string;
        sortingOrder: string;
    };
};

type Props = {
    areFiltersOpened: boolean;
    searchOptions: SearchOptions;
    setSearchOptions: (value: SearchOptions) => void;
};

const DEFAULT_QUESTION_NUM = 10;

const SearchBar: FunctionComponent<Props> = ({ areFiltersOpened, searchOptions, setSearchOptions }) => {
    const [prompt, setPrompt] = useState(searchOptions.prompt || '');
    const previousQuestionNumRef = useRef(DEFAULT_QUESTION_NUM);

    const promptDebounce = useDebounce<string>(
        prompt => setSearchOptions({ ...searchOptions, prompt }),
        (_, newPrompt) => {
            setPrompt(newPrompt);
            return newPrompt;
        },
        500
    );

    const setFilter = (key: string, value: any) => setSearchOptions({ prompt, filters: { ...filters, [key]: value } });

    useEffect(() => {
        const questionNum = searchOptions.filters.questionNum;
        if (questionNum !== 'any' && questionNum !== previousQuestionNumRef.current) previousQuestionNumRef.current = Number(questionNum);
    }, [searchOptions]);

    const questionNum = Number(searchOptions.filters.questionNum) || previousQuestionNumRef.current;
    const filters = searchOptions.filters;
    return (
        <Container id="searchbar" popupOpened={areFiltersOpened}>
            <Icon src={searchIcon.src} />
            <Input placeholder="Search..." value={prompt} onChange={event => promptDebounce((event.target as HTMLInputElement).value)} />

            {areFiltersOpened && (
                <PopupContainer>
                    <PopupInner>
                        <div>
                            <Title>questions</Title>
                            <Option>
                                <Radio name="questions" id="q_any" defaultChecked={filters.questionNum === 'any'} onChange={() => setFilter('questionNum', 'any')} />
                                <Label htmlFor="q_any">any</Label>
                            </Option>
                            <Option>
                                <Radio name="questions" defaultChecked={filters.questionNum !== 'any'} onChange={() => setFilter('questionNum', questionNum)} />
                                <OptionInput value={questionNum} onChange={event => setFilter('questionNum', Number(event.target.value))} />
                                <Label>+</Label>
                            </Option>
                        </div>
                        <div>
                            <Title>order by</Title>
                            <Option>
                                <Radio name="orderBy" id="o_popularity" defaultChecked={filters.orderBy === 'players'} onChange={() => setFilter('orderBy', 'players')} />
                                <Label htmlFor="o_popularity">popularity</Label>
                            </Option>
                            <Option>
                                <Radio name="orderBy" id="o_creation-date" defaultChecked={filters.orderBy === 'created_at'} onChange={() => setFilter('orderBy', 'created_at')} />
                                <Label htmlFor="o_creation-date">creation date</Label>
                            </Option>
                            <Option>
                                <Radio name="orderBy" id="o_questions" defaultChecked={filters.orderBy === 'question_num'} onChange={() => setFilter('orderBy', 'question_num')} />
                                <Label htmlFor="o_questions">questions</Label>
                            </Option>
                        </div>
                        <div>
                            <Title>sorting order</Title>
                            <Option>
                                <Radio name="sortingOrder" id="s_descending" defaultChecked={filters.sortingOrder === 'DESC'} onChange={() => setFilter('sortingOrder', 'DESC')} />
                                <Label htmlFor="s_descending">descending</Label>
                            </Option>
                            <Option>
                                <Radio name="sortingOrder" id="s_ascending" defaultChecked={filters.sortingOrder === 'ASC'} onChange={() => setFilter('sortingOrder', 'ASC')} />
                                <Label htmlFor="s_ascending">ascending</Label>
                            </Option>
                        </div>
                    </PopupInner>
                </PopupContainer>
            )}
        </Container>
    );
};

export default SearchBar;
