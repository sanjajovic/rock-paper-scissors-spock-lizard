import { FaHandPaper } from "react-icons/fa";
import { FaHandRock } from "react-icons/fa";
import { FaHandScissors } from "react-icons/fa";
import { FaHandSpock } from "react-icons/fa6";
import { FaHandLizard } from "react-icons/fa";
import { IconType } from "react-icons";
import { fetchChoices } from "../api/get-choices";
import { useEffect, useState } from "react";
import { GiCardRandom } from "react-icons/gi";
import { fetchChoice } from "../api/get-choice";

interface IGameOptionsProps {
  getResult: (choiceId: number) => void;
}

const icons = [
  FaHandRock,
  FaHandPaper,
  FaHandScissors,
  FaHandLizard,
  FaHandSpock,
];

const GameOptions = ({ getResult }: IGameOptionsProps) => {
  const [options, setOptions] = useState<
    {
      Icon: IconType;
      choiceId: number;
      name: string;
    }[]
  >();
  const [randomChoice, setRandomChoice] = useState<{
    choiceId: number;
    name: string;
  } | null>(null);

  const getOptions = async () => {
    const result = await fetchChoices();
    if (result) {
      const merged = result.map((choice: { name: string; id: number }) => {
        const Icon = icons?.find((icon: IconType) =>
          String(icon)
            ?.toLowerCase()
            ?.includes(choice?.name?.toLocaleLowerCase())
        )!;

        return {
          choiceId: choice.id,
          name: choice.name,
          Icon,
        };
      });

      setOptions(merged);
    }
  };

  const getRandomChoice = async () => {
    const result = await fetchChoice();
    if (result) {
      setRandomChoice(result);
      getResult(result?.choiceId)
    }
  };

  useEffect(() => {
    getOptions();
  }, []);

  return (
    <div className="flex flex-col gap-3 justify-center items-center p-2">
      <GiCardRandom
        className="cursor-pointer hover:text-yellow-200 border border-2"
        onClick={() => getRandomChoice()}
      />
      {options &&
        options?.map(
          (
            { Icon, choiceId }: { Icon: IconType; choiceId: number },
            index: number
          ) => (
            <Icon
              key={index}
              className={`cursor-pointer hover:text-yellow-200 ${
                randomChoice?.choiceId === choiceId && "text-yellow-200"
              }`}
              onClick={() => getResult(choiceId)}
            />
          )
        )}
    </div>
  );
};
export default GameOptions;
