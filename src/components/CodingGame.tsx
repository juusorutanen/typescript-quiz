import { useEffect, useState } from 'react';
import '../App.css';

// Define the possible button states
type ButtonState = "DEFAULT" | "SELECTED" | "WRONG";
// Define the structure for an option (button)
type Option = {
  value: string;
  state: ButtonState;
};

function randomize() {
  return Math.random() - 0.5;
}

// Extract question keys from data object
function getQuestions(data: Record<string, string>) {
  return Object.keys(data);
}

// Extract answer values from data object
function getAnswers(data: Record<string, string>) {
  return Object.values(data);
}

// Check if two options form a valid pair
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
        // Reset options, selected option, and the game state
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
 

  // Determine the CSS class for each button based on its state
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
    // If no option is selected, set the clicked option as selected
    if (!selected) {
      setSelected(option);
      setOptions(
      options.map((opt) => ({
       ...opt,
       state: opt === option ? "SELECTED" : "DEFAULT",
        }))
      );
    } else {
            // If an option is already selected, check if the selected and clicked options form a pair
        const question = data[option.value];
        const selectedQuestion = data[selected.value];
      if (selected.value === question ||
        selectedQuestion === option.value
        ) {
          // If it's a pair, remove both options from the list
          setOptions(
            options.filter((opt) =>  
            !isPairOfPair(opt, option, selected))
          );
        } else {
          // If it's not a pair, mark both options as "WRONG"
          setOptions(
            options.map((opt) => ({
                ...opt,
                state: isPairOfPair(opt, option, selected) ? "WRONG" : opt.state,
            }))
          );
        }
              // Deselect the selected option
        setSelected(undefined);
    }
  }
  if (gameState === "gameOver") {
    return (
    <>
    <div className='congrats'>Congrats!</div>
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


