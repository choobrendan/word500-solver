import React, { useState, useEffect } from 'react';
import words from './words.txt';

const compareWords = (actualWord, guessedWord) => {
    let green = 0;
    let yellow = 0;
    const actual = [false, false, false, false, false];
    const guessed = [false, false, false, false, false];

    // First pass to check for green letters
    for (let i = 0; i < 5; i++) {
        if (guessedWord[i] === actualWord[i]) {
            green += 1;
            actual[i] = true;
            guessed[i] = true;
        }
    }

    // Second pass to check for yellow letters
    for (let i = 0; i < 5; i++) {
        if (!guessed[i]) {
            for (let j = 0; j < 5; j++) {
                if (!actual[j] && guessedWord[i] === actualWord[j]) {
                    yellow += 1;
                    actual[j] = true;
                    guessed[i] = true;
                    break;
                }
            }
        }
    }

    const red = 5 - (green + yellow);
    return { green, yellow, red };
};

const Answers = ({ guess }) => {
    const [inputs, setInputs] = useState([]);
    const [possibleWords, setPossibleWords] = useState([]);

    useEffect(() => {
        fetch(words)
            .then((r) => r.text())
            .then(text => {
                const wordList = text.split("\n");
                setInputs(wordList); 
            })
            .catch(error => console.error('Error fetching words:', error));
    }, []); // Run only once when the component mounts

    const guesses = guess.map(item => {
        const mergedLetters = item.slice(0, 5).join('').toLowerCase(); 
        const numbers = item.slice(5); // Get the remaining numbers (g, y, r)
        return [mergedLetters, ...numbers];
    }).filter(item => !item.some(val => val === ''));

    useEffect(() => {
        if (inputs.length > 0 && guesses.length > 0) {
            const possible = inputs.filter(word => {
                let valid = true;
                for (let entry of guesses) {
                    const guessedWord = entry[0];
                    const g = parseInt(entry[1]);
                    const y = parseInt(entry[2]);
                    const r = parseInt(entry[3]);
                    const result = compareWords(word, guessedWord);
                    if (result.green !== g || result.yellow !== y || result.red !== r) {
                        valid = false;
                        break;
                    }
                }
                return valid;
            });
            setPossibleWords(possible);
        }
    }, [guesses, inputs]); // Recalculate only when guesses or inputs change

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <p>Possible words:</p>
            <p>{possibleWords.join(', ')}</p>
        </div>
    );
}

export default Answers;
