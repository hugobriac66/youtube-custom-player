import classNames from 'classnames';

function Button({
  children,
  secondary,
  rounded,
  disabled,
  ...rest
}) {
  const classes = classNames(
    'flex items-center px-6 py-5 border h-8',
    {
      'border-white bg-white text-black': secondary && !disabled,
      'rounded-lg': rounded,
      'border-gray-800 bg-gray-800 text-white': disabled
    },
    rest.className
  );

  return (
    <button {...rest} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}

export default Button;
