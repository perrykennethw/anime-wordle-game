import { useEffect, useState } from 'react';
import GuessRow from '../components/GuessRow';

const ANIME_WORD_LIST: string[] = ['Ninja', 'Mecha', 'Magic', 'Chibi', 'Josei', 'Harem'];
const NUM_GUESSES = 6;
const WORD_LENGTH = 5;

export default function Wordle() {
  const [guesses, setGuesses] = useState(Array(NUM_GUESSES).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');
  const [solution, setSolution] = useState('');

  const randomIndex = (words: string[]) => {
    return Math.floor(Math.random() * words.length);
  }
  
  useEffect(() => {
    setSolution(ANIME_WORD_LIST[randomIndex(ANIME_WORD_LIST)].toLowerCase());
  }, []);

  useEffect(() => {
    if (solution == null) return;

    const onPressKey = (event: KeyboardEvent) => {
      if (guesses[NUM_GUESSES - 1] != null || guesses.includes(solution)) {
        return;
      }

      const charCode = event.key.toLowerCase().charCodeAt(0);
      const isLetter = 
        event.key.length === 1 &&  
        charCode >= 'a'.charCodeAt(0) &&
        charCode <= 'z'.charCodeAt(0);
      
      setCurrentGuess(prevGuess => {
        if (event.key === 'Backspace') {
          return prevGuess.slice(0, -1);
        } else if (event.key === 'Enter' && prevGuess.length === WORD_LENGTH) {
          const currentGuessIndex = guesses.findIndex(guess => guess === null); 
          const guessesClone = [...guesses];
          guessesClone[currentGuessIndex] = prevGuess;
          setGuesses(guessesClone);
          return '';
        } else if (prevGuess.length < WORD_LENGTH && isLetter) {
          return prevGuess + event.key.toLowerCase();
        }
        return prevGuess;
      })
    };

    window.addEventListener('keydown', onPressKey);

    return () => window.removeEventListener('keydown', onPressKey);
  }, [guesses, solution]);

  const currentGuessIndex = guesses.findIndex(guess => guess == null);

  if (solution == null) return null; 
  
  return (
    <div className="flex flex-col gap-2.5 p-2.5">
      {
        guesses.map((guess: string, i: number) => {
          return (
            <GuessRow
              key={i}
              guess={(i === currentGuessIndex ? currentGuess : guess ?? '').padEnd(WORD_LENGTH)}
              solution={solution}
              isFinal={currentGuessIndex > i || currentGuessIndex === 1}
              />
          );
        })
      }
    </div>
  );
}