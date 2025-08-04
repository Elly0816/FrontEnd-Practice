import Button from './button';
import { numbers } from '../utility/helpers';

const Digits = () => {
  return (
    <div className="digits-container">
      {numbers
        .map((n) => String(n))
        .map((n, i) => (
          <Button key={i} symbol={n} />
        ))}
    </div>
  );
};

export default Digits;
