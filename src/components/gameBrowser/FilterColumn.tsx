import { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { color } from '../../styles/theme';
import Radio from '../Radio';

const Title = styled.p`
    font-size: 16px;
    font-weight: 200;
    color: ${color('white0')};
`;

const Option = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Label = styled.label`
    font-size: 14px;
    color: ${color('white1')};
    cursor: pointer;
`;

const Input = styled.input`
    outline: none;
    border: none;
    border-bottom: 1px solid ${color('white1')};
    color: ${color('white0')};
    font-size: 14px;
    background: none;
    width: 50px;
`;

type Option = string | { isInput?: boolean; defaultValue?: any; label: string };

type Props = {
    title: string;
    options: Option[];
    onChange: (value: any) => void;
};

const getDefaultOptionValues = (options: Option[]) =>
    options.reduce((obj, cur, idx) => {
        if (typeof cur === 'string' || !cur.isInput) return obj;
        return { ...obj, [idx]: cur.defaultValue || '' };
    }, {});

let _id = 0;
const InputColumn: FunctionComponent<Props> = ({ title, options, onChange }) => {
    const id = useRef(_id++);
    const [values, setValues] = useState<{ [key: string]: any }>(getDefaultOptionValues(options));

    useEffect(() => onChange(typeof options[0] === 'string' ? options[0] : options[0].defaultValue || options[0].label), []);

    return (
        <div>
            <Title>{title}</Title>

            {options.map((option, idx) => {
                if (typeof option === 'string') {
                    const radio_id = `${id.current}${idx}`;

                    return (
                        <Option key={idx}>
                            <Radio name={`${id.current}`} id={radio_id} defaultChecked={idx === 0} onChange={() => onChange(option)} />
                            <Label htmlFor={radio_id}>{option}</Label>
                        </Option>
                    );
                } else {
                    return (
                        <Option key={idx}>
                            <Radio
                                name={`${id.current}`}
                                defaultChecked={idx === 0}
                                onChange={() => (option.isInput ? onChange(values[idx]) : onChange(option.label))}
                            />
                            {option.isInput && (
                                <Input value={values[idx]} onChange={(e: ChangeEvent) => setValues({ ...values, [idx]: (e.target as HTMLInputElement).value })} />
                            )}
                            <Label>{option.label}</Label>
                        </Option>
                    );
                }
            })}
        </div>
    );
};

export default InputColumn;
