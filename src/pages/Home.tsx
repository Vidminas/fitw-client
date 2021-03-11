import { IonPage } from "@ionic/react";
import React from "react";
import Book from "../components/Book";

const Home: React.FC = () => {
  return (
    <IonPage>
      <Book />
    </IonPage>
  );
};

export default Home;
