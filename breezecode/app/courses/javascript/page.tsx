import { Metadata } from 'next';
import JsTerminal from '@/app/components/terminals/jsTerminal';
import { getCourseContent } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'JavaScript Course',
};

const JavaScriptPage: React.FC = async () => {
  const chapters = await getCourseContent('javascript');

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-2">
        {chapters.map((chapter, index) => (
          <div key={index}>
            <div dangerouslySetInnerHTML={{ __html: chapter.contentHtml }} />
          </div>
        ))}
      </div>
      <div className="col-span-2">
        <JsTerminal />
      </div>
      <div>C3</div>
    </div>
  );
};

export default JavaScriptPage;
