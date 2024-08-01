"use client"
import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

interface CodeEditorWindowProps {
  defaultCode: string;
  language?: string;
  languageId?: number;
}

const CodeEditorWindow: React.FC<CodeEditorWindowProps> = ({ defaultCode, language, languageId }) => {
  const [code, setCode] = useState<string>(defaultCode);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [outputDetails, setOutputDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCode(defaultCode);
    setOutputDetails(null);
  }, [defaultCode]);
  
  const checkStatus = async (token: string) => {
    const options = {
      method: 'GET',
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      params: {
        base64_encoded: 'true',
        fields: '*'
      },
      headers: {
        'x-rapidapi-key': '802134c965mshbb74eaa2a2d7e09p139fe9jsnd5554af855c7',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      },
    };

    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
      } else {
        setIsProcessing(false);
        setOutputDetails(response.data);
      }
    } catch (err) {
      console.error("Error checking status: ", err);
      setIsProcessing(false);
    }
  };

  const handleCompile = async () => {
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: {
        base64_encoded: 'true',
        wait: 'false',
        fields: '*'
      },
      headers: {
        'x-rapidapi-key': '802134c965mshbb74eaa2a2d7e09p139fe9jsnd5554af855c7',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        language_id: languageId,
        source_code: btoa(code),
        stdin: btoa('') // Add input if needed
      }
    };

    try {
      setIsProcessing(true);
      let response = await axios.request(options);
      const token = response.data.token;
      checkStatus(token);
    } catch (error) {
      console.error("Error during compilation: ", error);
      setError("Compilation error. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    const updatedValue = value || '';
    setCode(updatedValue);
  };

  return (
    <div className='overlay overflow-hidden w-full py-2'>
      <Editor
        height="45vh"
        width="100%"
        language={language || 'javascript'}
        theme="vs-dark"
        value={code}
        defaultValue={defaultCode}
        onChange={handleEditorChange}
      />
      <button
        className='px-4 py-2 bg-blue-500 my-2 mx-1 rounded inline-block'
        onClick={handleCompile}
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Run'}
      </button>
      {error && <div className='text-red-500'>{error}</div>}

      {
        outputDetails &&
      <div className='bg-VSB p-2'>
        <h2 className='text-left text-yellow-500 font-semibold'>Output</h2>
        <div className='font-sans text-gray-200'>
          {outputDetails && outputDetails.compile_output && atob(outputDetails.compile_output)}
        </div>
        <div className='font-sans text-gray-200'>
          {outputDetails && outputDetails.stdout && atob(outputDetails.stdout)}
        </div>
        <div className='font-sans text-red-400'>
          {outputDetails && outputDetails.stderr && atob(outputDetails.stderr)}
        </div>
      </div>
      }
    </div>
  );
};

export default CodeEditorWindow;
