import { IonItem, IonLabel, IonList, IonListHeader } from "@ionic/react";
import React from "react";
import { useSelector } from "react-redux";
import { AppState, UserState } from "../redux/store";
import "./StatsSection.css";

const StatsSection: React.FC<{}> = () => {
  const user = useSelector<AppState, UserState>((state) => state.user);

  return (
    <IonList className="stats-list" inset={true} lines="inset">
      <IonListHeader color="primary">Statistics:</IonListHeader>
      <IonItem>
        <IonLabel>Total objects added:</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Total unique objects added:</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Total worlds created:</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Winter-themed objects added:</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Tool-themed objects added:</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Cooking-themed objects added:</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Computer-themed objects added:</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Desert-themed objects added:</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Unique tree objects added:</IonLabel>
      </IonItem>
    </IonList>
  );
};

export default StatsSection;
