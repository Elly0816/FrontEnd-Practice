import { useEffect, useState } from 'react';
import './App.css';

const getColor: () => string = () => {
    const options = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
    ];
    console.log('getting colors');
    const color = new Array(6)
        .fill('')
        .map(() => options[Math.floor(Math.random() * options.length)])
        .join('');
    // return `#${color}`;
    return color;
};

function App() {
    const [hexCodes, setHexCodes] = useState<string[]>();
    const [selectedColor, setSelectedColor] = useState<string>();
    const [result, setResult] = useState<'correct' | 'wrong' | undefined>();

    const getColors: () => void = () => {
        const colors: Array<string | undefined> = [];
        for (let i = 0; i < 3; i++) {
            colors.push(getColor());
        }
        setHexCodes(colors as string[]);
        const pickedColor = colors[Math.floor(Math.random() * colors.length)];
        setSelectedColor(pickedColor);
    };

    useEffect(() => {
        getColors();
    }, []);

    const checkAnswer = (color: string) => {
        setResult(undefined);
        if (color == selectedColor) {
            console.log('Correct Answer');
            setResult('correct');
            const timer = setTimeout(() => {
                setResult(undefined);
                getColors();
                clearTimeout(timer);
            }, 1000);
        } else {
            console.log('Wrong Answer');

            setResult('wrong');

            const timer = setTimeout(() => {
                setResult(undefined);
                clearTimeout(timer);
            }, 2000);
        }
    };

    return (
        <>
            {selectedColor && (
                <div>
                    <section
                        className="colorContainer"
                        style={{ backgroundColor: `#${selectedColor}` }}
                    >
                        {selectedColor}
                    </section>
                    {hexCodes?.map((option, index) => (
                        <button
                            style={{
                                marginRight:
                                    index !== hexCodes.length - 1 ? '20px' : 0,
                            }}
                            type="button"
                            disabled={result == 'correct' || !hexCodes}
                            key={option + index}
                            onClick={() => {
                                checkAnswer(option);
                            }}
                        >
                            {'# ' + option}
                        </button>
                    ))}
                    <p
                        className="result"
                        style={{
                            color:
                                result == 'correct'
                                    ? 'green'
                                    : result == 'wrong'
                                    ? 'red'
                                    : undefined,
                        }}
                    >
                        {result == 'correct'
                            ? 'Correct Answer'
                            : result == 'wrong'
                            ? 'Wrong Answer'
                            : undefined}
                    </p>
                </div>
            )}
        </>
    );
}

export default App;
