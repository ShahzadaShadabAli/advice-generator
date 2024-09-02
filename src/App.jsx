import { useEffect } from "react";
import { useState } from "react";
import {motion} from "framer-motion"

function App() {
  const [advice, setAdvice] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getFetch = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      setAdvice(data.slip);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false)
    }
  };
  useEffect(() => {
    getFetch();
  }, []);

  const handleClick = () => {
    getFetch();
  };

  return (
    <div  className="w-full min-h-screen bg-[#202632] flex justify-center items-center">
      {!isLoading && <motion.div animate={{ rotate: 360 }}
    transition={{ type: "spring", duration: 5, bounce: 0.6 }} className="bg-[#313a49] max-md:w-full mx-4 w-[36rem] pb-16 pt-14 rounded-2xl relative flex flex-col justify-center items-center gap-5 px-14 ">
        <h1 className="manrope text-[#51ffad] max-sm:text-[10px] text-[13px] tracking-[5px] mb-1">
          ADVICE # {advice && advice.id}
        </h1>
        <h1 className="manrope-bold text-[28px] text-center text-[#d2e0eb] max-sm:text-xl">
          <q>{advice && advice.advice}</q>
        </h1>
        <img
          src="/images/pattern-divider-desktop.svg"
          className="mt-4 pb-3 max-md:hidden"
          alt=""
        />
        <img
          src="/images/pattern-divider-mobile.svg"
          className="mt-4 pb-3 md:hidden"
          alt=""
        />
        <button
          onClick={handleClick}
          className="w-[4.8rem] h-[4.8rem] bg-[#51ffad] rounded-full flex items-center justify-center absolute -bottom-10 left-1/2 -translate-x-1/2"
        >
          <img src="/images/icon-dice.svg" className="" width={28} alt="" />
        </button>
      </motion.div>}

      {isLoading && <div className="bg-[#313a49] max-md:w-full mx-4 w-[36rem] pb-16 pt-14 rounded-2xl relative flex flex-col justify-center items-center gap-5 px-14 ">
        <img src="/images/loader.gif" alt="" />
      </div>}
    </div>
  );
}

export default App;
