import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { SERVER_ADDRESS } from "../constants";
import { destroyGame, initGame } from "../game/game";

const Game: React.FC = () => {
  React.useEffect(() => {
    initGame("game-root");
    return () => destroyGame();
  }, []);

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
