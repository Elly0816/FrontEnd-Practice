export const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, '.'];

export const operators = ['(', ')', '^', '/', '*', '+', '-', '='];

export const actions = ['AC', 'C'];

export const insertAt = (str, insert, index) => {
  return str.slice(0, index) + insert + str.slice(index);
};

export const handleCalculate = (calcString) => {
  let calculation = calcString; //Initial equation string
  // const matches = operators.filter((o) => calculation.includes(o));
  let matches = Array.from(calculation).filter((c) => operators.includes(c));
  // let currentExpression; //This holds the array equivalent
  while (matches.length > 0) {
    // console.log('The operator was in the calculation');
    // console.log(matches.forEach((v) => console.log(v)));
    // Order of precedence is BODMAS

    //Handle Brackets
    // currentExpression = calculation.split(/[ ( )]+/);
    // console.log(`For brackets: ${currentExpression}`);

    //Handle exponent (of)
    // currentExpression = calculation.split(/[ ^]+/);
    // console.log(`For exponent: ${currentExpression}`);
    if (calculation[0] == ' ' || calculation[0] == '') {
      calculation = calculation.slice(1);
    }

    //Handle division
    while (calculation.includes('/')) {
      console.log('Dividing');
      calculation = handleAllCalcs(calculation, handleDivide, /[ /]+/);
      // calculation = handleAllCalcs(calculation, handleDivide, "/");
    }
    // console.log(`For division: ${currentExpression}`);

    //Handle multiplication
    while (calculation.includes('*')) {
      console.log('Multiplying');
      calculation = handleAllCalcs(calculation, handleProduct, /[ *]+/);
      // calculation = handleAllCalcs(calculation, handleProduct, "*");
    }

    //Handle additions
    while (calculation.includes('+')) {
      console.log('Adding');

      calculation = handleAllCalcs(calculation, handleAdd, /[ +]+/);
      // calculation = handleAllCalcs(calculation, handleAdd, "+");
    }

    //Handle subtraction
    while (calculation.includes('-')) {
      console.log('Subtracting');

      if (calculation[0] === '-') {
        if (calculation[1] == '-') {
          return calculation.slice(2);
        }
        console.log('parse float: ', parseFloat(calculation));
        return calculation;
      }
      calculation = handleAllCalcs(calculation, handleMinus, /[ -]+/);
      // calculation = handleAllCalcs(calculation, handleMinus, "-");
    }
    // console.log(`For subtraction: ${currentExpression}`);

    // calculation = currentExpression.join("");
    matches = Array.from(calculation).filter((c) => operators.includes(c));
    console.log('Here are the new matches: ', matches);
    // matches = 0;
    console.log('Here is the new calculation: ', calculation);
  }
  return calculation;
};

const handleAllCalcs = (calculationString, func, regex) => {
  let currentExpression;
  currentExpression = calculationString.split(regex);
  currentExpression = currentCalculation(currentExpression, func);
  if (currentExpression[0].startsWith('-')) {
    console.log('Starts With');
    return currentExpression.join('');
  }
  if (currentExpression[0] == '' && currentExpression.length < 3) {
    currentExpression = currentExpression.splice(0, 1);
  }
  console.log(`For division: ${currentExpression}`);
  console.log(currentExpression);
  return currentExpression.join(' ');
};

const currentCalculation = (currentExpression, func) => {
  // let returnExpression;
  let result;
  let replaceIndex;

  let i = 0;

  while (i + 1 < currentExpression.length) {
    let currentItem = currentExpression[i];
    let nextItem = currentExpression[i + 1];
    replaceIndex = i;
    console.log(
      'Current expression in current calculation function: ',
      currentExpression
    );
    if (currentItem == '-' && currentExpression.length > 2) {
      //   currentExpression.splice(i, 1);
      currentItem = currentExpression[i + 1];
      nextItem = currentExpression[i + 2];
      result = -1 * func(parseFloat(currentItem * -1), parseFloat(nextItem));
      console.log(result);
      currentExpression[replaceIndex + 2] = String(result);
      currentExpression[replaceIndex + 1] = '-';
      currentExpression.splice(replaceIndex, 1);
      console.log(
        'These are the items: ',
        currentExpression,
        currentItem,
        nextItem
      );
      return currentExpression;
    }
    if (!operators.includes(currentItem) && !operators.includes(nextItem)) {
      console.log('Adding ', currentItem, ' to ', nextItem);
      console.log('CurrentItem index ', i);
      // let signBeforeInitial;
      if (i > 0 && currentExpression[i - 1] == '-') {
        currentItem = currentItem * -1;
        result = -1 * func(parseFloat(currentItem), parseFloat(nextItem));
      } else {
        result = func(parseFloat(currentItem), parseFloat(nextItem));
      }
      //   result = func(parseFloat(currentItem), parseFloat(nextItem));
      currentExpression[replaceIndex] = String(result);
      currentExpression.splice(replaceIndex + 1, 1);
    }
    i++;
  }
  if (currentExpression.length === 2) {
    result = func(
      parseFloat(currentExpression[0]),
      parseFloat(currentExpression[1])
    );
    currentExpression[0] = String(result);
    currentExpression.splice(1, 1);
  }
  console.log('Here is the result: ', currentExpression);
  return currentExpression;
};

const handleDivide = (a, b) => {
  return a / b;
};

const handleMinus = (a, b) => {
  return a - b;
};

// const handleExponent = (a, b) => {
//     return a**b;
// }

const handleProduct = (a, b) => {
  return a * b;
};

const handleAdd = (a, b) => {
  return a + b;
};

// const handleParanthesis = (calculation) => {

// }

// const checkIfIncludes = (array, operator, functionToRun=undefined) => {

// }

//   const matchOperators = (calculation) => {
//     const
//   }
