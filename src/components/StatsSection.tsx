import { IonItem, IonLabel, IonList, IonListHeader } from "@ionic/react";
import React from "react";
import { useSelector } from "react-redux";
import { AppState, UserState } from "../redux/store";
import "./StatsSection.css";

const StatsSection: React.FC<{}> = () => {
  const userState = useSelector<AppState, UserState>((state) => state.user);
  const displayStats = userState.currentStatus === "loggedIn" && userState.user;

  return (
    <IonList className="stats-list">
      <IonListHeader color="primary">Statistics:</IonListHeader>
      {!displayStats && (
        <IonItem>
          <IonLabel>User not logged in, no stats available...</IonLabel>
        </IonItem>
      )}
      {displayStats && (
        <>
          <IonItem>
            <IonLabel>
              Total worlds created: {userState.user!.stats.createdWorlds}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              Total objects added: {userState.user!.stats.createdTotalObjects}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              Total unique objects added:{" "}
              {userState.user!.stats.createdUniqueObjects}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              Unique winter-themed objects added:{" "}
              {userState.user!.stats.createdUniqueWinterObjects}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              Unique tool-themed objects added:{" "}
              {userState.user!.stats.createdUniqueToolObjects}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              Unique cooking-themed objects added:{" "}
              {userState.user!.stats.createdUniqueCookingObjects}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              Unique electronics-themed objects added:{" "}
              {userState.user!.stats.createdUniqueElectronicsObjects}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              Unique desert-themed objects added:{" "}
              {userState.user!.stats.createdUniqueDesertObjects}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              Unique tree objects added:{" "}
              {userState.user!.stats.createdUniqueTreeObjects}
            </IonLabel>
          </IonItem>
        </>
      )}
    </IonList>
  );
};

export default StatsSection;
