import { actions } from '../utility/helpers';
import Button from './button';

export const ClearButtons = () => {
  return (
    <div className="clear-buttons-container">
      {actions.map((a, i) => (
        <Button className="clear" key={i} symbol={a} />
      ))}
    </div>
  );
};
