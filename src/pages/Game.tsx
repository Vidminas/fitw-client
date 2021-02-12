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
import { SERVER_ADDRESS } from "../api/constants";
import PhaserGame from "../game/PhaserGame";

const Game: React.FC<{}> = () => {
  const user: IUser = useSelector((state: any) => state.user?.user);
  const world: IWorld = useSelector((state: any) => state.world?.world);

  React.useEffect(() => {
    const newGame = new PhaserGame(user, world);
    newGame.init("game-root");
    return () => newGame.destroy();
  }, [user, world]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Connecting to {SERVER_ADDRESS}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div id="game-root"></div>
      </IonContent>
    </IonPage>
  );
};

export default Game;
