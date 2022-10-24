import { createContext, useRef } from 'react';
import { FunctionComponent, ReactElement } from 'react';

export type FileUploadContextData = {
    openUpload: () => void;
};

export const FileUploadContext = createContext({});

type Props = { children: ReactElement };

const FileUploadProvider: FunctionComponent<Props> = ({ children }) => {
    const inputRef = useRef<any>();

    const openUpload = () => inputRef.current && inputRef.current.click();

    return (
        <div>
            <FileUploadContext.Provider value={{ openUpload }}>{children}</FileUploadContext.Provider>
            <input type="file" ref={inputRef} style={{ display: 'none' }} />
        </div>
    );
};

export default FileUploadProvider;
