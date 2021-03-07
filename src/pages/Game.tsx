import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useSelector } from "react-redux";
import IUser from "../api/user";
import IWorld from "../api/world";
import PhaserGame from "../game/PhaserGame";
import "./Clock.css";
import { useHistory } from "react-router";

const Game: React.FC<{}> = () => {
  const history = useHistory();
  const user: IUser = useSelector((state: any) => state.user?.user);
  const world: IWorld = useSelector((state: any) => state.world?.world);
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    const newGame = new PhaserGame(user, world, () => {
      history.push("/home");
    });
    newGame.init("game-root");
    return () => newGame.destroy();
  }, [user, world, history]);

  React.useEffect(() => {
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
      </IonContent>
    </IonPage>
  );
};

export default Game;
