interface GuessRowProps {
    guess: string;
    solution: string;
    isFinal: boolean;
}

function GuessRow({ guess, solution, isFinal }: GuessRowProps) {
    return (
        <div className="flex m-auto gap-2.5">
            {guess.split('').map((char: string, i: number) => {
                let className = 'tile';

                if (isFinal) {
                    if (char === solution[i]) {
                        className += ' correct';
                    } else if (solution.includes(char)) {
                        className += ' close';
                    } else {
                        className += ' incorrect';
                    }
                }

                return <div key={i} className={className}>{char}</div>;
            })}
        </div>
    );
}

export default GuessRow;