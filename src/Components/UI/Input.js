import classes from './Input.module.css';

const Input = props => {
  if (!props) {
    console.error('No Props Inputted');
    return;
  }

  return (
    <div className={classes.input}>
      <label htmlFor={props.type.id}>{props.label}</label>
      <input {...props.type} />
    </div>
  );
};

export default Input;
