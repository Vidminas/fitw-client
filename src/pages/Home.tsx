import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";
import React, { useState } from "react";
import Book from "../components/Book";
import CreditsDialog from "../components/CreditsDialog";

const Home: React.FC = () => {
  const [showCreditsDialog, setShowCreditsDialog] = useState(false);

  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="primary">
          <IonButton onClick={() => setShowCreditsDialog(true)}>
            Credits
            <IonIcon icon={informationCircleOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <IonContent>
        <Book />
        <CreditsDialog
          isOpen={showCreditsDialog}
          onDismiss={() => setShowCreditsDialog(false)}
        ></CreditsDialog>
      </IonContent>
    </IonPage>
  );
};

export default Home;
