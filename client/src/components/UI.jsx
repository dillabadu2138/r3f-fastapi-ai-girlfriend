import { useRef } from "react";

export const UI = () => {
  const input = useRef();

  const printMessage = () => {
    const text = input.current.value;
    console.log(text);
    input.current.value = "";
  };

  return (
    <>
      <div className="fixed inset-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="self-start backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-md">
          <h1 className="font-black text-xl">나의 가상 AI 여친</h1>
          <p>무엇이든지 물어봐!</p>
        </div>
        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
          <input
            className="w-full p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md"
            placeholder="메세지를 입력하세요..."
            ref={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                printMessage();
              }
            }}
          />
          <button
            onClick={printMessage}
            className={`bg-sky-500 hover:bg-sky-600 text-white text-nowrap p-4 font-semibold rounded-md`}
          >
            보내기
          </button>
        </div>
      </div>
    </>
  );
};
