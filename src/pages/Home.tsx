import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import Book from "../components/Book";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome to Fill In The World!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Book />
      </IonContent>
    </IonPage>
  );
};

export default Home;
