export default function Modal({
  button,
  content,
  hidden,
  overlayRef,
  onClick,
}: {
  button: React.ReactElement<HTMLButtonElement>;
  content: React.ReactNode;
  hidden: boolean;
  overlayRef: React.MutableRefObject<HTMLDivElement | null>;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  return (
    <>
      {button}
      {!hidden &&
        <div
          ref={overlayRef}
          className="
            text-black fixed top-0 left-0
            z-10 w-screen h-screen bg-black/25
          "
          onClick={onClick}
        >
          <div
            className="
              absolute flex flex-col
              items-center top-2/4 left-2/4
              h-2/3 w-2/5 -translate-x-2/4
              -translate-y-2/4 rounded border-[1px]
              bg-white
            "
          >
            {content}
          </div>
        </div>
      }
    </>
  );
}