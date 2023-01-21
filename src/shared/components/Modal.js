import { Button } from "./Button";

export const Modal = ({ text, closeCallback }) => {
  return (
    <div className="z-50 fixed pin overflow-auto top-20 mx-auto mt-32 p-5 border h-96 w-96 shadow-lg rounded-md bg-white">
      <div className="mt-3 text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Warning!
        </h3>
        <div className="mt-2 px-7 py-3">
          <p className="text-sm text-gray-500">{text}</p>
        </div>
        <div className="items-center px-4 py-3">
          <Button text="close" onApplyClicked={closeCallback} />
        </div>
      </div>
    </div>
  );
};
