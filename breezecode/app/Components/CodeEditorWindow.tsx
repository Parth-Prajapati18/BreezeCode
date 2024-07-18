"use client"
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorWindowProps {
    onChange: (newCode: string) => void;
    language?: string;
    code?: string;
    defaultCode?: string;
}

const CodeEditorWindow: React.FC<CodeEditorWindowProps> = ({ onChange, language, code, defaultCode }) => {
    const [value, setValue] = useState<string>(code || '');

    const handleEditorChange = (value: string | undefined) => {
        const updatedValue = value || '';
        setValue(updatedValue);
        onChange(updatedValue);
    };

    return (
        <div className='overlay overflow-hidden w-full h-full'>
            <Editor
                height="88vh"
                width="100%"
                language={language || 'javascript'}
                value={value}
                theme="vs-dark"
                defaultValue={defaultCode}
                onChange={handleEditorChange}
            />
        </div>
    );
};

export default CodeEditorWindow;
