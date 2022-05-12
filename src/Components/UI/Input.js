import classes from './Input.module.css';

const Input = props => {
  if (!props) {
    console.error('No Props Inputted');
    return;
  }

  const { input, label, inputBox } = props.className;

  return (
    <div className={input}>
      <label htmlFor={props.type.id} className={label}>
        {props.label}
      </label>
      <input className={inputBox} {...props.type} />
    </div>
  );
};

export default Input;
