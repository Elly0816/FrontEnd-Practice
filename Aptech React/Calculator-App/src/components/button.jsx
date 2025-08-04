import { useCalculate } from '../context/calculateContextProvider';

const Button = (props) => {
  const symbolToShow = props.symbol ? props.symbol : undefined;

  const className = props.className ? props.className : undefined;

  let dynamicSize;

  if (symbolToShow === '=' || symbolToShow === '.') {
    dynamicSize = 'equals';
  } else if (symbolToShow === 'C') {
    dynamicSize = 'c';
  }

  const { handleButtonClick } = useCalculate();
  //   console.log('The handleButtonClick below');
  //   console.log(handleButtonClick);

  const handleClick = () => {
    // return props.handleFunction(symbolToShow);
    return handleButtonClick(symbolToShow);
  };

  return (
    <button className={`${className} ${dynamicSize}`} onClick={handleClick}>
      <h2>{symbolToShow}</h2>
    </button>
  );
};

export default Button;
