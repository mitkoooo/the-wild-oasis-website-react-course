import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: string;
  pendingLabel: string;
  disabled: boolean;
}; /* use `interface` if exporting so that consumers can extend */

const SubmitButton = ({
  children,
  pendingLabel,
  disabled,
}: SubmitButtonProps): React.JSX.Element => {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending || disabled}
    >
      {pending ? pendingLabel : children}
    </button>
  );
};

export default SubmitButton;
