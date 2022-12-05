import React, { FunctionComponent, useContext, useState } from 'react';
import styled from 'styled-components';
import { FileUploadContext } from '../providers/FileUploadProvider';
import { color } from '../styles/theme';
import imagePlaceholder from '../../public/images/image-placeholder.png';

const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${color('black2')};
    border-radius: 3px;
    cursor: pointer;
    transition: filter 0.2s;
    width: inherit;
    height: inherit;
    max-width: inherit;
    min-width: inherit;
    max-height: inherit;
    min-height: inherit;

    &:hover img {
        filter: brightness(0.9);
    }
`;

const Image = styled.img`
    width: inherit;
    height: inherit;
    max-width: inherit;
    min-width: inherit;
    max-height: inherit;
    min-height: inherit;
`;

type Props = {
    src?: string;
    onChange: (data: string) => void | string | Promise<string>;
};

const ChangeableImage: FunctionComponent<Props> = ({ src: initialSource, onChange }) => {
    const { upload } = useContext(FileUploadContext);
    if (!upload) throw new Error('Changeable image can only be used inside of FileUploadProvider!');

    const [source, setSource] = useState(initialSource);

    const uploadImage = () => {
        upload(async image => {
            setSource(image);

            const result = await onChange(image);
            if (result) setSource(result);
        });
    };

    return (
        <ImageContainer onClick={uploadImage}>
            <Image src={source || imagePlaceholder.src} />
        </ImageContainer>
    );
};

export default ChangeableImage;
