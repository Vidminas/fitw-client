import React, { ReactElement, useEffect, useState } from "react";
import "./Book.css";
import BookPage from "./BookPage";
import Banner from "./FITW banner.svg";
import { useDispatch, useSelector } from "react-redux";
import { WORLD_FETCH_ALL } from "../redux/actionTypes";
import { AppState, UserState, WorldsState } from "../redux/store";
import WorldEllipse from "./WorldEllipse";
import WorldDialog from "./WorldDialog";
import { IonLoading } from "@ionic/react";

type BookClass = "book-open" | "book-closed-front" | "book-closed-back";

const Book: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const userState = useSelector<AppState, UserState>((state) => state.user);
  const worldsState = useSelector<AppState, WorldsState>(
    (state) => state.worlds
  );
  const [showWorldDialog, setShowWorldDialog] = useState(false);
  const [bookClass, setBookClass] = useState<BookClass>("book-closed-front");
  const [pageInFront, setPageInFront] = useState(0);
  const [pageInMiddle, setPageInMiddle] = useState(1);
  const [pageInBack, setPageInBack] = useState(2);
  const [pageIsAnimating, setPageIsAnimating] = useState(false);
  const pages: ReactElement[] = [];
  // number of existing worlds + 2 cover pages + 1 new world option
  const numPages = userState.user?.worlds
    ? userState.user.worlds.length + 3
    : 3;

  useEffect(() => {
    if (userState.currentStatus === "loggedIn" && userState.user) {
      dispatch({ type: WORLD_FETCH_ALL, payload: userState.user.worlds });
    }
  }, [userState, dispatch]);

  const openNextPage = (fromPage: number) => {
    if (fromPage < numPages) {
      setPageInFront(fromPage);
      setPageInMiddle(fromPage + 1);
      setPageInBack(fromPage - 1);

      if (fromPage === 0) {
        setBookClass("book-open");
      } else if (fromPage + 1 === numPages) {
        setBookClass("book-closed-back");
      }
    }
  };
  const openPreviousPage = (fromPage: number) => {
    if (fromPage >= 0) {
      setPageInFront(fromPage);
      setPageInMiddle(fromPage - 1);
      setPageInBack(fromPage + 1);

      if (fromPage === numPages - 1) {
        setBookClass("book-open");
      } else if (fromPage === 1) {
        setBookClass("book-closed-front");
      }
    }
  };

  const addPage = (
    leftChildren?: React.ReactNode,
    rightChildren?: React.ReactNode
  ) => {
    const pageNum = pages.length;
    pages.push(
      <BookPage
        key={pageNum}
        pageNum={pageNum}
        pageClass={
          pageNum === pageInFront
            ? "page-in-front"
            : pageNum === pageInMiddle
            ? "page-in-middle"
            : pageNum === pageInBack
            ? "page-in-back"
            : undefined
        }
        pageIsAnimating={pageIsAnimating}
        setPageIsAnimating={setPageIsAnimating}
        openNextPage={openNextPage}
        openPreviousPage={openPreviousPage}
        leftChildren={leftChildren}
        rightChildren={rightChildren}
      />
    );
  };

  // add front cover
  addPage(
    <>
      <p>Fill In The World</p>
      <img src={Banner} alt="Game banner" />
      <p>-&gt;</p>
    </>,
    <>
      <p>The worlds of</p>
      <p>{userState.user?.username || "Unknown user"}</p>
    </>
  );

  // add existing worlds
  const worlds = worldsState.worlds;
  for (let i = 0; i < worlds.length; i++) {
    const makeWorldDiv = (index: number) => (
      <>
        <p className="worldName">{worlds[index].name}</p>
        <WorldEllipse
          index={i}
          background={`assets/backgrounds/${
            worlds[index].background || "backgroundEmpty.png"
          }`}
          onClickHandler={() => {
            // dispatch({ type: USER_ENTER_WORLD, payload: worlds[index] });
            // history.push("/game");
          }}
        />
      </>
    );

    const world1 = makeWorldDiv(i);
    const world2 = ++i < worlds.length && makeWorldDiv(i);
    addPage(world1, world2);
  }

  // add new world page
  addPage(
    <>
      <p className="worldName">New World</p>
      <WorldEllipse
        index={-1}
        background={"assets/backgrounds/new world.svg"}
        onClickHandler={(event) => {
          setShowWorldDialog(true);
          // prevent the book page from flipping on click
          event.stopPropagation();
          // dispatch({ type: USER_CREATE_WORLD });
          // history.push("/game");
        }}
      />
    </>
  );

  // add back cover
  addPage();

  return (
    <>
      <IonLoading
        isOpen={
          userState.currentStatus === "loading" ||
          worldsState.currentStatus === "loading"
        }
        message="Loading worlds from server..."
      ></IonLoading>
      <WorldDialog
        isOpen={showWorldDialog}
        onClick={() => setShowWorldDialog(false)}
        onDismiss={() => setShowWorldDialog(false)}
      ></WorldDialog>
      <div id="book" className={bookClass}>
        {pages}
      </div>
    </>
  );
};

export default Book;
