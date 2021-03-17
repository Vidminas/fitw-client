import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonItem,
  IonText,
} from "@ionic/react";
import { calendarOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState, UserState } from "../redux/store";

const WinningStreak: React.FC<{}> = () => {
  const userState = useSelector<AppState, UserState>((state) => state.user);
  const [streakDays, setStreakDays] = useState(0);

  useEffect(() => {
    // whether it's undefined or 0, useState(0) already has it covered
    if (userState.user?.winningStreak) {
      setStreakDays(userState.user.winningStreak);
    }
  }, [userState.user]);

  return (
    <IonCard>
      <IonCardHeader>
        <IonItem>
          <IonIcon icon={calendarOutline} slot="start" />
          <IonCardTitle>
            Winning streak: {streakDays} {streakDays === 1 ? "day" : "days"}
          </IonCardTitle>
        </IonItem>
      </IonCardHeader>
      <IonContent>
        <IonText>Fun</IonText>
      </IonContent>
    </IonCard>
  );
};

export default WinningStreak;
