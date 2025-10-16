export default function Button({
  children,
  textOnly,
  className,
  type,
  onClick,
  ...props
}) {
  let cssClass = textOnly ? 'text-button' : 'button';
  cssClass += ' ' + className;

  return (
    <button type className={cssClass} {...props}>
      {children}
    </button>
  );
}
