import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IUser from "../api/user";
import IWorld from "../api/world";
import PhaserGame from "../game/PhaserGame";
import "./Clock.css";
import { useHistory } from "react-router";
import { AppState } from "../redux/store";
import { WORLD_FETCH } from "../redux/actionTypes";

const Game: React.FC<{}> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector<AppState, IUser | null>((state) => state.user.user);
  const currentWorld = useSelector<AppState, IWorld | null>(
    (state) => state.user.currentWorld
  );
  const [time, setTime] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");

  useEffect(() => {
    if (!currentWorld) {
      return;
    }
    if (!user && !process.env.REACT_APP_DEBUG) {
      return;
    }
    // new worlds don't have an ID
    if (currentWorld.id) {
      // this updates the worlds state, but it does not change the user current world
      // TODO: figure out a way to update the current state world
      dispatch({ type: WORLD_FETCH, payload: currentWorld.id });
    }
    const newGame = new PhaserGame(() => {
      // navigating back home should work, but game does not get cleaned up properly
      // this may be related to:
      // https://stackoverflow.com/questions/57081820/changing-routes-breaks-game-in-phaser-3
      history.push("/home");
      // for now, the workaround is to refresh the page
      history.go(0);
    });
    newGame.init(
      "game-root",
      user,
      currentWorld,
      (color: string, message: string) => {
        setToastColor(color);
        setToastMessage(message);
        setShowToast(true);
      }
    );
    return () => {
      // this cleanup gets called if the game is exited without using
      // the in-game "Exit World" button
      // e.g. by clicking back in the browser
      newGame.destroy();
    };
  }, [dispatch, user, currentWorld, history]);

  useEffect(() => {
    const getTimeString = (date: Date) => {
      let h = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();
      let session = "AM";

      if (h === 0) {
        h = 12;
      } else if (h > 12) {
        h -= 12;
        session = "PM";
      }

      const h_string = h < 10 ? `0${h}` : `${h}`;
      const m_string = m < 10 ? `0${m}` : `${m}`;
      const s_string = s < 10 ? `0${s}` : `${s}`;

      return `${h_string}:${m_string}:${s_string} ${session}`;
    };

    const timer = setInterval(() => {
      setTime(getTimeString(new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div id="clock">Time now: {time}</div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div id="game-root"></div>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          color={toastColor}
          message={toastMessage}
          duration={2500}
          buttons={[
            {
              text: "Close",
              role: "cancel",
              side: "end",
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Game;
