import { CalculateContextProvider } from '../context/calculateContextProvider';
import Digits from './digits';
import Screen from './screen';
import Symbols from './symbols';
import { operators, numbers, actions } from '../utility/helpers';
import { useState } from 'react';
import { ClearButtons } from './clearButtons';
import { Parser } from 'expr-eval';

const parser = new Parser();

const Calculator = () => {
  const [calculation, setCalculation] = useState('');
  const [initialCalculation, setInitialCalculation] = useState('');

  const handleButtonClick = (symbol) => {
    if (operators.includes(symbol)) {
      if (symbol != '=') {
        console.log(`The ${symbol} operator was clicked`);
        if (symbol == '^') {
          let new_calculation = calculation + '^' + '(';
          setCalculation(new_calculation);
        } else {
          addSymbol(symbol);
        }
      } else {
        console.log(`The ${symbol} operator was clicked, therefore calculate`);
        const result = parser.evaluate(calculation).toString();
        setInitialCalculation(calculation);
        setCalculation(result);
      }
    } else if (numbers.includes(parseInt(symbol)) || symbol === '.') {
      console.log(`The ${symbol} number was added`);
      addSymbol(symbol);
    } else if (actions.includes(symbol)) {
      if (symbol == 'AC') {
        setInitialCalculation('');
        setCalculation('');
      } else {
        setCalculation((calculation) => {
          let newCalculation = calculation;
          if (newCalculation[newCalculation.length - 1] === ' ') {
            newCalculation = newCalculation.slice(0, newCalculation.length - 1);
          }
          return newCalculation.slice(0, newCalculation.length - 1);
        });
      }
    }
  };

  const addSymbol = (symbol) => {
    setCalculation((calculation) => {
      let newCalculation = calculation + symbol;
      return newCalculation;
    });
  };

  return (
    <>
      <Screen items={initialCalculation} className="top" />
      <Screen items={calculation} className="bottom" />
      <div className="button-containers">
        <CalculateContextProvider handleButtonClick={handleButtonClick}>
          <Digits />
          <Symbols />
          <ClearButtons />
        </CalculateContextProvider>
      </div>
    </>
  );
};

export default Calculator;
