"use client"

import CodeEditorWindow from "@/app/Components/CodeEditorWindow";
import OutPutWindow from "@/app/Components/OutPutWindow";
import axios from 'axios';
import { useState } from "react";

const JavaScriptPage: React.FC = () => {

  const [code, setCode] = useState<string>('');
  const [outPutDetails, setOutPutDetails] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const onChange = (newCode: string) => {
      setCode(newCode);
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
        language_id: 52,
        source_code: btoa(code),
        stdin: 'SnVkZ2Uw'
      }
    };

    try {
      setIsProcessing(true);
      const response = await axios.request(options);
      setOutPutDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }

  }

  return (
    <div className='top-16 bottom-0 grid grid-cols-5'>

      <div className='col-span-2'>Col1</div>
      <div className='col-span-2'>
        <CodeEditorWindow onChange={onChange} language="javascript" defaultCode="//Start Typing..."/>
      </div>
      <div className=''>
        <OutPutWindow outputDetails={undefined} />
      </div>


    </div>
  );
};

export default JavaScriptPage;
