import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import IUser from "../api/user";
import "./Book.css";
import BookPage, { PageFlip } from "./BookPage";
import Banner from "./FITW banner.svg";
import NewWorld from "./new world.svg";
import WorldEllipse from "./world ellipse.svg";
import { useDispatch, useSelector } from "react-redux";
import { NEW_WORLD } from "../redux/actionTypes";
import { AppState } from "../redux/store";

const Book: React.FC<{}> = () => {
  const user = useSelector<AppState, IUser>((state) => state.user.user!);
  const dispatch = useDispatch();
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

  const addPage = (
    leftChildren?: React.ReactNode,
    rightChildren?: React.ReactNode
  ) => {
    pages.push(
      <BookPage
        key={pages.length}
        pageNum={pages.length}
        numPages={numPages}
        lastFlip={lastFlip}
        openNextPage={openNextPage}
        openPreviousPage={openPreviousPage}
        leftChildren={leftChildren}
        rightChildren={rightChildren}
      />
    );
  };

  // A side effect of not setting z-index on all pages initially
  // is that they will get displayed in reverse order

  // add back cover
  addPage(
    <p>sup, this is back cover left</p>,
    <p>sup, this is back cover right</p>
  );
  // add new world page
  addPage(
    <>
      <p>New World</p>
      <Link to="/game" onClick={() => dispatch({ type: NEW_WORLD })}>
        <img src={NewWorld} alt="Click to create a new world" />
      </Link>
    </>
  );
  // add existing worlds
  for (let i = 0; i < user.worlds.length; i++) {
    const world1 = (
      <>
        <p>{user.worlds[i].name}</p>
        <Link
          to={{
            pathname: "/game",
            state: { user: user, world: user.worlds[i] },
          }}
        >
          <img
            src={WorldEllipse}
            alt={`Click to enter the world ${user.worlds[i].name}`}
          />
        </Link>
      </>
    );
    const world2 = ++i < user.worlds.length && (
      <>
        <p>{user.worlds[i].name}</p>
        <Link
          to={{
            pathname: "/game",
            state: { user: user, world: user.worlds[i] },
          }}
        >
          <img
            src={WorldEllipse}
            alt={`Click to enter the world ${user.worlds[i].name}`}
          />
        </Link>
      </>
    );
    addPage(world1, world2);
  }
  // add front cover
  addPage(
    <>
      <p>Fill In The World</p>
      <img src={Banner} alt="Game banner" />
      <p>-&gt;</p>
    </>,
    <>
      <p>The worlds of</p>
      <p>{user.username}</p>
    </>
  );

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
