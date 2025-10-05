import * as motion from "motion/react-client";
import { IconType } from "react-icons";
import { GiCardRandom } from "react-icons/gi";
//STORE
import { useBoard } from "../store/boardStore";
import { useEffect } from "react";

interface IGameOptionsProps {
  getResult: (choiceId: number) => void;
  getRandomChoice: ()=>void
}

const GameOptions = ({ getResult, getRandomChoice }: IGameOptionsProps) => {
  const { options, fetchOptions } = useBoard();

  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    <div className="flex gap-3 justify-center items-center p-2">
      <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
        <GiCardRandom
          className="cursor-pointer hover:text-[#b17f53] border border-2"
          size={"2em"}
          onClick={getRandomChoice}
        />
      </motion.div>
      {options &&
        options.map(
          (
            { Icon, choiceId }: { Icon: IconType; choiceId: number },
            index: number
          ) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              <Icon
                className="cursor-pointer hover:text-[#b17f53]"
                size={"2em"}
                onClick={() => getResult(choiceId)}
              />
            </motion.div>
          )
        )}
    </div>
  );
};
export default GameOptions;
