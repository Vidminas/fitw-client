import { CreateAnimation } from "@ionic/react";
import React from "react";

export interface PageFlip {
  direction?: 1 | -1;
  fromPage?: number;
}

type PageClass = "page-in-front" | "page-in-middle" | "page-in-back";

interface BookPageProps {
  pageNum: number;
  pageClass?: PageClass;
  pageIsAnimating: boolean;
  setPageIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
  openNextPage: (i: number) => void;
  openPreviousPage: (i: number) => void;
  leftChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
}

const BookPage: React.FC<BookPageProps> = ({
  pageNum,
  pageClass,
  pageIsAnimating,
  setPageIsAnimating,
  openNextPage,
  openPreviousPage,
  leftChildren,
  rightChildren,
}) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const animationRef = React.useRef<CreateAnimation>(null);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    if (pageIsAnimating || !pageClass) {
      return;
    }
    if (isOpen) {
      animationRef.current?.animation.direction("normal").play();
      openNextPage(pageNum);
    } else {
      animationRef.current?.animation.direction("reverse").play();
      openPreviousPage(pageNum);
    }
    setIsOpen(!isOpen);
    setPageIsAnimating(true);
  };

  const classNames = [
    "page",
    isOpen ? "page-open" : "page-turned",
    pageClass,
  ].filter((c) => c !== undefined);

  return (
    <CreateAnimation
      ref={animationRef}
      duration={1000}
      easing={"cubic-bezier(0.455, 0.03, 0.515, 0.955)"}
      fromTo={{
        property: "transform",
        fromValue: "rotateY(0deg)",
        toValue: "rotateY(-180deg)",
      }}
      onFinish={{ callback: () => setPageIsAnimating(false) }}
    >
      <div className={classNames.join(" ")} onClick={handleClick}>
        <div className="page-side-left">{leftChildren}</div>
        <div className="page-side-right">{rightChildren}</div>
      </div>
    </CreateAnimation>
  );
};

export default BookPage;
