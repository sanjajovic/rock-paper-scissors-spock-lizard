import { FaRedditAlien } from "react-icons/fa";
import { GiNinjaHead } from "react-icons/gi";
import GameOptions from "./game-options";
import { postPlay } from "../api/post-play";
import { useBoard } from "../store/boardStore";

const GameBoard = () => {
  const { rounds, increaseRound, updateScore, users } = useBoard();
  const getResult = async (choiceId: number) => {
    try {
      await postPlay(choiceId).then((res) => {
        increaseRound();
        switch (res?.results) {
          case "win":
            updateScore(1);
            break;
          case "lose":
            updateScore(0);
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
 
  return (
    <div className="game-container">
      <div className="left">
        <FaRedditAlien size={"3em"} />
      </div>
      <div className="right">
        <GameOptions getResult={getResult} />
        <GiNinjaHead size={"3em"} />
      </div>
      <div className="score-text">Round: {rounds} Score: {users[0]?.score} : {users[1]?.score}</div>
      <div className="rules">Rules</div>
      <div className="center-text">Game Board</div>
    </div>
  );
};
export default GameBoard;
