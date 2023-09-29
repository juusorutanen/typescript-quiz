import './App.css';
import CodingGame from './components/CodingGame';
import quizData from './guizData';


function App() {
  return (
   <div className='app'>
      <h1 className='app_header'>TypeScript Knowledge Checker</h1>
      <p className='app_info'>Find all the matching cards to finish the game!  </p>
      <CodingGame data={quizData} />
      <p className='app_info--sources'><span>Sources:</span> https://www.w3schools.com/, https://medium.com/@ivorobioff/10-facts-about-typescript-7204a547ae08</p>
   </div>
  );
}

export default App;
