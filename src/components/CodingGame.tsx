import { useEffect, useState } from 'react';
import '../App.css';

type ButtonState = "DEFAULT" | "SELECTED" | "WRONG";
type Option = {
  value: string;
  state: ButtonState;
};

function randomize() {
  return Math.random() - 0.5;
}

function getQuestions(data: Record<string, string>) {
  return Object.keys(data);
}

function getAnswers(data: Record<string, string>) {
  return Object.values(data);
}

function isPairOfPair(opt: Option, selected: Option, option: Option) {
    return opt.value === selected.value || opt.value === option.value
}

export default function CodingGame({data}: {data: Record<string, string>}) {


  const [options, setOptions] = useState<Option[]>(
    [...getQuestions(data), ...getAnswers(data)]
      .sort(randomize).map((value) => ({
      value,
      state: "DEFAULT",
    }))
  );

  const [selected, setSelected] = useState<Option>();

  const [gameState,setGameState] = useState("gameOn");
  const isGameOver = options.length === 0;

  useEffect(() => {
      if (isGameOver) {
          setGameState("gameOver");
      }
  }, [isGameOver]);

  function resetGame() {
    setOptions(
        [...getQuestions(data), ...getAnswers(data)]
        .sort(randomize).map((value) => ({
            value,
            state: "DEFAULT",
        }))
    );
    setSelected(undefined);
    setGameState("gameOn");
  }
 

  function getButtonClass(option: Option) {
    if (option.state === "SELECTED") {
      return "selected"
    } else if (option.state === "WRONG") {
      return "wrong"
    } else {
      return "";
    }
  }


  function onButtonClick(option: Option) {
    if (!selected) {
      setSelected(option);
      setOptions(
      options.map((opt) => ({
       ...opt,
       state: opt === option ? "SELECTED" : "DEFAULT",
        }))
      );
    } else {
        const question = data[option.value];
        const selectedQuestion = data[selected.value];
      if (selected.value === question ||
        selectedQuestion === option.value
        ) {
          setOptions(
            options.filter((opt) =>  
            !isPairOfPair(opt, option, selected))
          );
        } else {
          setOptions(
            options.map((opt) => ({
                ...opt,
                state: isPairOfPair(opt, option, selected) ? "WRONG" : opt.state,
            }))
          );
        }
        setSelected(undefined);
    }
  }
  if (gameState === "gameOver") {
    return (
    <>
    <div>Congrats!</div>
    <button id="resetBtn" onClick={resetGame}>Try again?</button>
    </>
    )
}

return (
<div className='buttons_container'>
{options.map((option) => (
  <button
  className={getButtonClass(option)}
  key={option.value}
  onClick={() => onButtonClick(option)}
  >
    {option.value}</button>
    
  ))}
  </div>
  
  );
}


