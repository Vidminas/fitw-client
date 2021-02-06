import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import Book from "../components/Book";
import { SERVER_USERS_ENDPOINT } from "../constants";
import { useFetch } from "../hooks/useFetch";

const Home: React.FC = () => {
  const [data, status] = useFetch(SERVER_USERS_ENDPOINT);

  if (status === "ok") {
    console.log(data);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {status === "loading" && (
            <IonTitle>Connecting to {SERVER_USERS_ENDPOINT}</IonTitle>
          )}
          {status === "error" && (
            <IonTitle>
              Error while connecting to {SERVER_USERS_ENDPOINT}. Please report
              this to the developer.
            </IonTitle>
          )}
          {status === "ok" && (
            <IonTitle>Welcome to Fill In The World!</IonTitle>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Book />
      </IonContent>
    </IonPage>
  );
};

export default Home;
