import React, { ReactElement } from "react";
import User from "../api/user";
import "./Book.css";
import BookPage, { PageFlip } from "./BookPage";

type BookProps = {
  user: User;
};

const Book: React.FC<BookProps> = ({ user }) => {
  const [currentPage, setCurrentPage] = React.useState(-1);
  const [lastFlip, setLastFlip] = React.useState<PageFlip>({});
  const pages: ReactElement[] = [];
  // number of existing worlds + 2 cover pages + 1 new world option
  const numPages = user.worlds.length + 3;

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

  const addPage = () => {
    const pageNum = pages.length;
    pages.push(
      <BookPage
        key={pageNum}
        pageNum={pageNum}
        numPages={numPages}
        lastFlip={lastFlip}
        openNextPage={openNextPage}
        openPreviousPage={openPreviousPage}
      />
    );
  };

  // A side effect of not setting z-index on all pages initially
  // is that they will get displayed in reverse order

  // add back cover
  addPage();
  // add new world page
  addPage();
  // add existing worlds
  for (let i = 0; i < user.worlds.length; ++i) {
    addPage();
  }
  // add front cover
  addPage();

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

export default Book;
