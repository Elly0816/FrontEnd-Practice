const Screen = (props) => {
  const items = props.items;

  const className = props.className ? props.className : undefined;

  return <div className={`screen-container ${className}`}>{items}</div>;
};

export default Screen;
