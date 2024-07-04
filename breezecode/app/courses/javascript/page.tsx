import { Metadata } from 'next';
import JsTerminal from '@/app/components/terminals/jsTerminal';
import ChapterDetails from '../chapterDetails';

export const metadata: Metadata = {
  title: 'JavaScript Course',
};

const JavaScriptPage: React.FC = async () => {

  return (
    <div className='bg-green-500' style={{ height: `calc(100vh - 4rem)` }}>
      <div className='bg-yellow-500 h-full'>

      </div>
      <div className='h-16 bg-red-400 bottom-0 fixed'>
        Footer
      </div>
    </div>
  );
};

export default JavaScriptPage;
