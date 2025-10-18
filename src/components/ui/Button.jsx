
const Button = ({
  label,
  leftIcon,
  rightIcon,
  outline = false,
  transparent = false,
  active = false,
  onClick,
}) => {
  const baseStyle =
    "flex items-center justify-center gap-2 px-4 py-2 rounded-xs cursor-pointer font-medium transition duration-200 border-b-2";

  const outlineStyle = outline
    ? "border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white"
    : "bg-blue-500 text-white hover:bg-blue-600";

  const transparentStyle = transparent ? "bg-transparent  h-16" : "";

  const activeStyle = active
    ? "border-b-blue-500 text-white"
    : "border-b-transparent  hover:border-b-blue-300 text-gray-300";

  const combinedStyle = `${baseStyle} ${
    transparent ? transparentStyle : outlineStyle
  } ${activeStyle}`;

  return (
    <button onClick={onClick} className={combinedStyle}>
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      {label && <span>{label}</span>}
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </button>
  );
};

export default Button;
