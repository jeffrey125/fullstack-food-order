// Reusable Input Component

const Input = props => {
  if (!props) {
    console.error('No Props Inputted');
    return;
  }

  if (!props.className) {
    console.error('No className Object');
    return;
  }

  const { input, label, inputBox } = props.className;

  return (
    <div className={inputBox}>
      <label htmlFor={props.type.id} className={label}>
        {props.label}
      </label>
      <input className={input} {...props.type} />
    </div>
  );
};

export default Input;
