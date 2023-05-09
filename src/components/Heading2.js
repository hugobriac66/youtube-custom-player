import classNames from 'classnames';

function Heading2({ children, className, ...rest }) {
  const classes = classNames("text-lg sm:text-2xl md:text-3xl", className);

  return <h2 className={classes} {...rest}>{children}</h2>
}

export default Heading2;
