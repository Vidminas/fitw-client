import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useLocation } from "react-router";
import User from "../api/user";
import World from "../api/world";
import { SERVER_ADDRESS } from "../constants";
import PhaserGame from "../game/PhaserGame";

type LocationState = {
  user: User;
  world?: World;
};

const Game: React.FC<{}> = () => {
  const { user, world } = useLocation<LocationState>().state;
  const [game] = React.useState(new PhaserGame());
  console.log("in game page");

  React.useEffect(() => {
    console.log(`Initialising game with`);
    console.log(user);
    console.log(world);
    game.init("game-root", user, world);
    return () => game.destroy();
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
