import { useEffect, useState } from 'react';
import './App.css';

const getColor: () => Promise<unknown> = async () => {
    return await fetch('https://www.colr.org/json/colors/random/7').then(
        (res) => res.json()
    );
};

function App() {
    const [hexCodes, setHexCodes] = useState<string[]>();
    const [otherOptions, setOtherOptions] = useState<string[]>();
    const [selectedColor, setSelectedColor] = useState<string>();
    const [fetchNewColors, setFetchNewColors] = useState<boolean>(true);
    const [result, setResult] = useState<'correct' | 'wrong' | undefined>();

    useEffect(() => {
        if (fetchNewColors) {
            getColor()
                .then(async (res) => {
                    const result = res as { colors: { hex: string }[] };
                    const colors = result.colors;
                    console.log('Colors: ', colors);
                    const codes = colors
                        .map((color) => color?.hex)
                        .filter((hex) => hex.length > 0);
                    setHexCodes(codes);
                })
                .then(() => {
                    setFetchNewColors(false);
                    setResult(undefined);
                });
        }
    }, [fetchNewColors]);

    const pickRandomColor: (array: string[], count: number) => void = (
        array,
        count
    ) => {
        if (count >= array.length) {
            throw new Error('Count should be less than the array length');
        }

        const shuffledArray = array.slice(); // Create a copy of the array
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [
                shuffledArray[j],
                shuffledArray[i],
            ];
        }

        // return shuffledArray.slice(0, count);
        const selectedColor = shuffledArray.slice(0, count)[
            Math.floor(Math.random() * count)
        ];
        const otherOptions = shuffledArray.slice(0, count);

        setSelectedColor(selectedColor);
        setOtherOptions(otherOptions);
    };

    useEffect(() => {
        if (hexCodes) {
            pickRandomColor(hexCodes, 3);
        }
    }, [hexCodes]);

    const checkAnswer = (color: string) => {
        if (color == selectedColor) {
            console.log('Correct Answer');
            setResult('correct');
            setTimeout(() => {
                setFetchNewColors(true);
            }, 2000);
        } else {
            console.log('Wrong Answer');
            setResult('wrong');
            setTimeout(() => {
                setResult(undefined);
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
                    ></section>
                    {otherOptions?.map((option, index) => (
                        <button
                            style={{
                                marginRight:
                                    index !== otherOptions.length - 1
                                        ? '20px'
                                        : 0,
                            }}
                            type="button"
                            disabled={result == 'correct'}
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
            {/* <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p> */}
        </>
    );
}

export default App;
