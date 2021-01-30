import React from "react";

export interface PageFlip {
  direction?: 1 | -1;
  fromPage?: number;
}

interface PageProps {
  pageNum: number;
  numPages: number;
  lastFlip: PageFlip;
  openNextPage: (i: number) => void;
  openPreviousPage: (i: number) => void;
}

const Page: React.FC<PageProps> = ({
  pageNum,
  numPages,
  lastFlip,
  openNextPage,
  openPreviousPage,
}) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [isFlipLTR, setIsFlipLTR] = React.useState(false);
  const [isFlipRTL, setIsFlipRTL] = React.useState(false);

  const handleClick = () => {
    isFlipLTR && setIsFlipLTR(false);
    isFlipRTL && setIsFlipRTL(false);
    if (isOpen) {
      setIsFlipRTL(true);
      setIsOpen(false);
      openNextPage(pageNum);
    } else {
      setIsFlipLTR(true);
      setIsOpen(true);
      openPreviousPage(pageNum);
    }
  };

  const classNames = [
    "page",
    isOpen ? "page-open" : "page-turned",
    isFlipLTR ? "flip-left-to-right" : null,
    isFlipRTL ? "flip-right-to-left" : null,
  ].filter((c) => c !== null);

  if (pageNum === lastFlip.fromPage) {
    classNames.push("inFront");
  } else {
    const toPage =
      lastFlip.direction && lastFlip.fromPage! + lastFlip.direction;

    // flip forward when on last page
    if (toPage === numPages && pageNum === numPages - 1) {
      classNames.push("inMiddle");
    }
    // flip backward when on first page
    else if (toPage === -1 && pageNum === 0) {
      classNames.push("inMiddle");
    }
    // any other flip
    else {
      if (pageNum === toPage) {
        classNames.push("inBack");
      } else if (pageNum + 2 === toPage || pageNum - 2 === toPage) {
        classNames.push("inMiddle");
      }
    }
  }

  return (
    <div className={classNames.join(" ")} onClick={handleClick}>
      <div className="page-side-left">
        <p>{pageNum}'th Left</p>
      </div>
      <div className="page-side-right">
        <a href="/game">{pageNum}'th Right</a>
      </div>
    </div>
  );
};

export default Page;
