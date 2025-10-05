import { motion } from "framer-motion";
import { IconType } from "react-icons";

const Animation = ({
  Choice,
  isWinner,
  startPos,
}: {
  Choice: IconType;
  isWinner: boolean;
  startPos: { x: number; y: number };
}) => {
  return (
    <motion.div
      initial={{ x: startPos.x, y: startPos.y, scale: 0.5, rotate: 0 }}
      animate={{
        x: startPos.x > 0 ? +200 : -150,
        y: -100,
        scale: 4,
        rotate: isWinner ? [0, 360] : [0, 30],
      }}
      transition={{ duration: 1 }}
      className="absolute"
    >
      <Choice
        className={`text-6xl ${isWinner && "animate-pulse text-[#929a68]"}`}
      />
    </motion.div>
  );
};
export default Animation;
