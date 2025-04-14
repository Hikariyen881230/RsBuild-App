import { useState } from 'react';
import CopyIcon from './icons/copy';
import TerminalIcon from './icons/terminal';
import CheckIcon from './icons/check';

interface ICodeBox {
  code?: string;
}

const defaultCode = 'npm install -D eslint-plugin-react-compiler@beta';

function CodeBox({ code = defaultCode }: ICodeBox) {
  const [isCopied, setIsCopied] = useState(false);
  const clipToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 4000);
    });
  };
  return (
    <div className="rounded-lg border overflow-clip bg-gray-300 h-full">
      <div className="bg-gray-500 w-full rounded-t-lg">
        <div className="flex text-sm px-4 py-0.5 relative justify-between">
          <div>
            <TerminalIcon />
            Terminal
          </div>
          <div>
            <button
              className="w-full text-start cursor-pointer"
              onClick={clipToClipboard}
            >
              {isCopied ? <CheckIcon /> : <CopyIcon />}
              {isCopied ? 'copied' : 'copy'}
            </button>
          </div>
        </div>
      </div>
      <div
        className="px-8 pt-4 pb-6 font-mono whitespace-pre overflow-x-auto"
        dir="ltr"
      >
        {code}
      </div>
    </div>
  );
}

export default CodeBox;
