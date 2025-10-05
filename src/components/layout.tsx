import { useState } from "react";
import { motion } from "framer-motion";
import { FaRedditAlien } from "react-icons/fa";
import { GiNinjaHead } from "react-icons/gi";
import { FaExternalLinkAlt } from "react-icons/fa";
//COMPONENTS
import GameOptions from "./game-options";
import Board from "./board";
//DATA ACCESS
import { postPlay } from "../api/post-play";
import { fetchChoice } from "../api/get-choice";
//STORE
import { useBoard } from "../store/boardStore";
//CONSTANTS
import { reset, rules } from "../constants/motionStyles";

const GameBoard = () => {
  const { rounds, increaseRound, updateScore, users, resetGame } = useBoard();
  const [outcome, setOutcome] = useState<{
    results: "win" | "lose" | "tie";
    player: number;
    computer: number;
  } | null>(null);

  const getRandomChoice = async () => {
    setOutcome(null);
    const result = await fetchChoice();
    if (result) {
      getResult(result?.id);
    }
  };

  const getResult = async (choiceId: number) => {
    setOutcome(null);
    try {
      await postPlay(choiceId).then((res) => {
        increaseRound();
        setOutcome(res);
        updateScore(res?.results);
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="game-container">
      <div className="score-text">
        <p className=" p-5 text-5xl">
          Round: {rounds} <br />
          Score: {users[0]?.score} - {users[1]?.score}
        </p>
      </div>
      <motion.div
        whileHover={{ scale: 1.2 }}
        style={reset}
        onClick={() => {
          resetGame();
          setOutcome(null);
        }}
      >
        Reset
      </motion.div>
      <motion.a
        href="https://www.samkass.com/theories/RPSSL.html"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2 }}
        style={rules}
      >
        Rules <FaExternalLinkAlt />
      </motion.a>
      <div className="left">
        <motion.div
          animate={
            outcome?.results === "win" ? { scale: [1, 1.3, 1] } : { scale: 1 }
          }
          transition={{ duration: 0.5 }}
          className="avatar-container"
        >
          <GiNinjaHead size={"6em"} />
        </motion.div>
      </div>
      <div className="right">
        <motion.div
          animate={
            outcome?.results === "lose" ? { scale: [1, 1.3, 1] } : { scale: 1 }
          }
          transition={{ duration: 0.5 }}
          className="avatar-container"
        >
          <FaRedditAlien size={"6em"} />
        </motion.div>
      </div>
      {outcome ? (
        <div className="center-text">
          <Board
            results={outcome.results}
            player={outcome.player}
            computer={outcome.computer}
            handlePlayAgain={() => setOutcome(null)}
          />
        </div>
      ) : (
        <div className="middle">
          <p className="bold text-5xl">Pick a hand</p>
          <GameOptions
            getResult={getResult}
            getRandomChoice={getRandomChoice}
          />
        </div>
      )}
    </div>
  );
};
export default GameBoard;
