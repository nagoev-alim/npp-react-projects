import { useState } from 'react';
import { getRandomNumber } from '../utils/getRandomNumber.js';
import confetti from 'canvas-confetti';
import { capitalStr } from '../utils/capitalStr.js';
import mock from '../mock/mock.js';

const RockPaperScissors = () => {
  const [scores, setScores] = useState({
    user: 0,
    computer: 0,
  });
  const [message, setMessage] = useState('Get Started, Let\'s Rock!');
  const [isEnd, setIsEnd] = useState(false);

  // 🚀 METHODS: ===============================

  const gameMove = (userChoice) => {
    const computerChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
    switch (`${computerChoice}-${userChoice}`) {
      case 'rock-paper':
      case 'paper-scissors':
      case 'scissors-rock':
        optionGame(userChoice, computerChoice, 'win');
        break;
      case 'paper-rock':
      case 'scissors-paper':
      case 'rock-scissors':
        optionGame(userChoice, computerChoice, 'lose');
        break;
      case 'rock-rock':
      case 'scissors-scissors':
      case 'paper-paper':
        optionGame(userChoice, computerChoice, 'draw');
        break;
      default:
        break;
    }
  };

  const optionGame = (userChoice, computerChoice, type) => {
    setScores(prevState => {
      let user = prevState.user;
      let computer = prevState.computer;

      switch (type) {
        case 'draw':
          user++;
          computer++;
          break;
        case 'win':
          user++;
          break;
        case 'lose':
          computer++;
          break;
        default:
          break;
      }

      if (user === 3 && computer === 3) {
        setIsEnd(true);
        setMessage('DRAW 🤝');
      } else if (user === 3) {
        setIsEnd(true);
        setMessage('You WIN 🥳');
        confetti({
          angle: getRandomNumber(55, 125),
          spread: getRandomNumber(50, 70),
          particleCount: getRandomNumber(50, 100),
          origin: { y: 0.6 },
        });
      } else if (computer === 3) {
        setIsEnd(true);
        setMessage('You LOSE 🤥');
      }

      return {
        user,
        computer,
      };
    });

    setMessage(`
      ${capitalStr(userChoice)} <span class='small ${type !== 'draw' ? 'win' : 'equal'}'>(user)</span>
      ${type === 'win' ? 'beats' : type === 'lose' ? 'lose' : 'equals'}
      ${capitalStr(computerChoice)} <span class='small ${type !== 'draw' ? 'lose' : 'equal'}'>(comp)</span>`);
  };

  // 🚀 RENDER: ================================
  return <div className='game'>
    <h1 className='title game__title'>Rock Paper Scissors</h1>
    <main>
      <div className='score'>
        <span className='score__label score__label--user'>user</span>
        <span className='score__label score__label--computer'>computer</span>
        <span>{scores.user}</span>:<span>{scores.computer}</span>
      </div>

      <p className='message' dangerouslySetInnerHTML={{ __html: message }} />

      {!isEnd && <ul className='options'>
        {mock.map(({ name, src }, idx) =>
          <li key={idx}>
            <button className='options__btn' onClick={() => gameMove(name)}>
              <img src={src} alt={name} />
            </button>
          </li>,
        )}
      </ul>}
    </main>

    <footer>
      {!isEnd && <p>Make your move.</p>}
      {isEnd && <button onClick={() => location.reload()}>Repeat Game</button>}
    </footer>

  </div>;
};

export default RockPaperScissors;
