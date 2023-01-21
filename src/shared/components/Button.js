export const Button = ({ onApplyClicked, text, color = "bg-primary" }) => {
  return (
    <button
      className={`${color} text-white py-2 px-4 mr-4 text-xs hover:bg-yellow-700 font-bold rounded`}
      onClick={onApplyClicked}
    >
      {text}
    </button>
  );
};
