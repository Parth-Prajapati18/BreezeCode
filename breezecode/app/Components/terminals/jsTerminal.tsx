"use client"

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

export default function JsTerminal() {

    const [code, setCode] = useState<string>('');
    const [output, setOutput] = useState<string>('');
  
    const handleCodeChange = (value?: string) => {
      setCode(value || '');
    };
  
    const executeCode = async () => {
      try {
        const response = await axios.post('/api/execute', { code });
        setOutput(response.data.output);
      } catch (error) {
        setOutput('Error executing code');
      }
    };

  return (
    <div className="bg-VSB2">
    <Editor
      height="85vh"
      defaultLanguage="javascript"
      defaultValue="// Write your code here"
      onChange={(value) => handleCodeChange(value)}
      theme="vs-dark"
    />
    <button onClick={executeCode} className="m-4 py-1 px-4 bg-yellow-400 font-semibold border rounded-md">Run</button>
  </div>
  )
}
