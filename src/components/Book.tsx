import React from "react";
import "./Book.css";
import Page, { PageFlip } from "./Page";

const numPages = 5;

const Book2: React.FC<{}> = () => {
  const [currentPage, setCurrentPage] = React.useState(-1);
  const [lastFlip, setLastFlip] = React.useState<PageFlip>({});
  const pages = [];

  const openNextPage = (fromPage: number) => {
    if (currentPage < numPages - 1) {
      setCurrentPage(currentPage + 1);
      setLastFlip({ direction: 1, fromPage });
    }
  };
  const openPreviousPage = (fromPage: number) => {
    if (currentPage >= 0) {
      setCurrentPage(currentPage - 1);
      setLastFlip({ direction: -1, fromPage });
    }
  };

  for (let i = 0; i < numPages; ++i) {
    pages.push(
      <Page
        key={i}
        pageNum={i}
        numPages={numPages}
        lastFlip={lastFlip}
        openNextPage={openNextPage}
        openPreviousPage={openPreviousPage}
      />
    );
  }

  let className = "open";
  if (currentPage === -1) {
    className = "closedFront";
  } else if (currentPage === numPages - 1) {
    className = "closedBack";
  }

  return (
    <div id="book" className={className}>
      {pages}
    </div>
  );
};

export default Book2;
