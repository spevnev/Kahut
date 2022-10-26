import { FunctionComponent, useContext, useState } from 'react';
import styled from 'styled-components';
import { FileUploadContext } from '../providers/FileUploadProvider';
import { color } from '../styles/theme';

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
    src: string;
    onChange: (data: string) => void | string | Promise<string>;
};

const ChangeableImage: FunctionComponent<Props> = ({ src: _src, onChange }) => {
    const { upload } = useContext(FileUploadContext);
    if (!upload) throw new Error('Changeable image can only be used inside of FileUploadProvider!');

    const [src, setSrc] = useState(_src);

    const uploadImage = () => {
        upload(async image => {
            setSrc(image);
            const res = await onChange(image);
            if (res) setSrc(res);
        });
    };

    return (
        <ImageContainer onClick={uploadImage}>
            <Image src={src} />
        </ImageContainer>
    );
};

export default ChangeableImage;
