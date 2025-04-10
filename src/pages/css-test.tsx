import { useState } from 'react';

function CssTest() {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="p-4 max-w-md mx-auto rounded-xl shadow-md space-y-4 border mt-5">
      <button
        id="anchor-button"
        className="w-[180px] px-6 py-3 border cursor-pointer border-blue-950 rounded-xl shadow-xl bg-cyan-700 text-white font-bold hover:bg-cyan-800 hover:shadow-lg transition-all duration-150"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        Tooltip
      </button>
      <div>一些假文字</div>
      <div
        id="button-tooltip"
        className={`w-[350px] transition-all bg-[#392f2f] text-white p-3 rounded-xl shadow-2xl mt-4 ${isHover ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-3'}`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        在過去的網頁設計中，要讓一個元素跟著另一個元素移動，通常都要寫一大串JavaScript，還要考慮各種邊界條件。但有了Anchor
        API後，我們只要幾行CSS就能搞定！這簡直就是前端工程師的救星啊！
      </div>
    </div>
  );
}

export default CssTest;
