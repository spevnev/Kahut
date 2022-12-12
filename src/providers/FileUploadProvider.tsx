import { createContext, useRef, FunctionComponent, ReactElement } from 'react';
import { voidFunction } from '../utils/helper';

type UploadFile = (callback: (img: string) => void) => void;

type FileUploadContextData = { upload: UploadFile };

export const FileUploadContext = createContext<FileUploadContextData>({ upload: () => voidFunction });

const FileUploadProvider: FunctionComponent<{ children: ReactElement }> = ({ children }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const callbackFunction = useRef<(img: string) => void>();

    const upload = (callback: (img: string) => void) => {
        if (!inputRef.current) return;

        callbackFunction.current = callback;
        inputRef.current.click();
    };

    const onChange = () => {
        if (!inputRef.current?.files) throw new Error('Error uploading file!');
        const file = inputRef.current.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            if (!result || typeof result !== 'string' || !callbackFunction.current) throw new Error('Error uploading file!');

            callbackFunction.current(result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
            <FileUploadContext.Provider value={{ upload }}>{children}</FileUploadContext.Provider>
            <input type="file" ref={inputRef} style={{ display: 'none' }} onChange={onChange} />
        </div>
    );
};

export default FileUploadProvider;
