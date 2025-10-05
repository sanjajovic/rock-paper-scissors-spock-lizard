import { motion, AnimatePresence } from "framer-motion";
//COMPONENTS
import Animation from "./animation";
//CONSTANTS
import { MoveOptions } from "../constants/moveOptions";

interface IBoardProps {
  results: "win" | "lose" | "tie";
  player: number;
  computer: number;
  handlePlayAgain: () => void;
}

const Board = ({ results, player, computer, handlePlayAgain }: IBoardProps) => {
  return (
    <div>
      <AnimatePresence>
        <>
          <Animation
            Choice={MoveOptions[computer - 1]}
            isWinner={results === "lose"}
            startPos={{ x: +200, y: 100 }}
          />
          <Animation
            Choice={MoveOptions[player - 1]}
            isWinner={results === "win"}
            startPos={{ x: -200, y: 100 }}
          />
        </>
      </AnimatePresence>
      <div className="flex flex-col absolute top-[3em] w-[max-content] gap-3 items-center text-5xl justify-self-center self-end -right-[4em]">
        <p>YOU {results.toUpperCase()}</p>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          className="text-md bold border border-black rounded-md p-2 cursor-pointer"
          onClick={handlePlayAgain}
        >
          PLAY AGAIN
        </motion.div>
      </div>
    </div>
  );
};
export default Board;
