"use client"
import CodeEditorWindow from '@/app/components/CodeEditorWindow';
import { Metadata } from 'next';

const JavaScriptPage: React.FC = () => {

  const onChange = (action: string, data: string) => {
    switch (action) {
      case "code": {
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  return (
    <div className='top-16 bottom-0 grid grid-cols-5'>

      <div  className='col-span-2'>Col1</div>
      <div className='col-span-2'>
        <CodeEditorWindow onChange={onChange}  />
      </div>
      <div className=''>Col3</div>
      
      
    </div>
  );
};

export default JavaScriptPage;
