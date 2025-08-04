import Button from './button';
import { operators } from '../utility/helpers';

const Symbols = () => {
  return (
    <div className="operators-container">
      {operators.map((o, i) => (
        <Button className="operators" key={i} symbol={o} />
      ))}
    </div>
  );
};

export default Symbols;
