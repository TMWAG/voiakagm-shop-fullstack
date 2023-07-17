'use client';

export default function ForgotPasswordButton({
  onButtonClick,
}: {
  onButtonClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}) {
  return (
    <span
      className="
        my-3 text-purple-400 cursor-pointer
      "
      onClick={onButtonClick}
    >
      Забыли пароль?
    </span>
  );
}