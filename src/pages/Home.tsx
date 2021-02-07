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
import useAxios from "axios-hooks";

const Home: React.FC = () => {
  const [{ data, loading, error }] = useAxios(SERVER_USERS_ENDPOINT);

  if (!loading && !error) {
    console.log("data");
    console.log(data);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {loading && (
            <IonTitle>Connecting to {SERVER_USERS_ENDPOINT}</IonTitle>
          )}
          {error && (
            <IonTitle>
              Error while connecting to {SERVER_USERS_ENDPOINT}. Please report
              this to the developer.
            </IonTitle>
          )}
          {!loading && !error && (
            <IonTitle>Welcome to Fill In The World!</IonTitle>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {!loading && !error && <Book user={data[0]} />}
      </IonContent>
    </IonPage>
  );
};

export default Home;
