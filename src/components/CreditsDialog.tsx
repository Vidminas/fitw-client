import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonRow,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import React from "react";
import "./CreditsDialog.css";

interface CreditsItemProps {
  url?: string;
  comment?: string;
}

const CreditsItem: React.FC<CreditsItemProps> = ({
  url,
  comment,
  children,
}) => {
  return (
    <IonItem lines="full">
      <IonGrid className="credits-item">
        <IonRow class="ion-align-items-stretch ion-justify-content-start ion-wrap">
          <IonCol>{children}</IonCol>
          {url && (
            <IonCol>
              <IonItem href={url}>
                <IonLabel>{url}</IonLabel>
              </IonItem>
            </IonCol>
          )}
          {comment && (
            <IonCol>
              <IonNote>{comment}</IonNote>
            </IonCol>
          )}
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

interface CreditsDialogProps {
  isOpen: boolean;
  onDismiss: () => void;
}

const CreditsDialog: React.FC<CreditsDialogProps> = ({ isOpen, onDismiss }) => {
  return (
    <IonModal
      isOpen={isOpen}
      cssClass="credits"
      backdropDismiss={true}
      onDidDismiss={onDismiss}
    >
      <IonCard>
        <IonCardHeader>
          <IonItem>
            <IonCardTitle slot="start">Credits</IonCardTitle>
            <IonIcon
              slot="end"
              role="button"
              icon={closeOutline}
              onClick={onDismiss}
            />
          </IonItem>
        </IonCardHeader>
        <IonCardContent>
          <IonList>
            <IonItemGroup>
              <IonItemDivider>
                <IonLabel>Concept and programming</IonLabel>
              </IonItemDivider>
              <IonItem>
                <IonLabel slot="start">Vidminas Mikucionis</IonLabel>
                <IonItem slot="end" href="https://github.com/Vidminas">
                  <IonLabel>https://github.com/Vidminas</IonLabel>
                </IonItem>
              </IonItem>
            </IonItemGroup>
            <IonItemGroup>
              <IonItemDivider>
                <IonLabel>Audio assets</IonLabel>
              </IonItemDivider>
              <CreditsItem>
                All voice recordings: Vidminas Mikucionis
              </CreditsItem>
              <CreditsItem comment="Licensed to Vidminas Mikucionis">
                Game background music: "Calm Bear", "Playing In Water",
                "Treasure" from "Chronicles of the Illusion World" by Nicolas
                Jeudy (Dark Fantasy Studio)
              </CreditsItem>
            </IonItemGroup>
            <IonItemGroup>
              <IonItemDivider>
                <IonLabel>Graphical assets</IonLabel>
              </IonItemDivider>
              <CreditsItem
                url="https://pzuh.itch.io/free-game-gui"
                comment="Creative Commons Zero (CC0) public domain license"
              >
                Buttons GUI (packed using TexturePacker)
              </CreditsItem>
              <CreditsItem
                url="https://opengameart.org/content/snowman-2"
                comment="Creative Commons Zero (CC0) public domain license"
              >
                snowman.png
              </CreditsItem>
              <CreditsItem
                url="https://openclipart.org/detail/240399/yellow-planet-1"
                comment="Public Domain"
              >
                Yellow-planet-01.svg
              </CreditsItem>
              <CreditsItem
                url="https://openclipart.org/detail/311429/crowd-of-women-infinity-prismatic"
                comment="Public Domain"
              >
                crowd-infinity.svg
              </CreditsItem>
              <CreditsItem
                url="https://openclipart.org/detail/102541/hat-tip-snowman"
                comment="Public Domain"
              >
                hat-tip-snowman.svg
              </CreditsItem>
              <CreditsItem
                url="https://openclipart.org/detail/95239"
                comment="Public Domain"
              >
                toolbox_01.svg
              </CreditsItem>
              <CreditsItem
                url="https://openclipart.org/detail/327751/stove-with-a-pot"
                comment="Public Domain"
              >
                stoveovenpot-cdcpd.svg
              </CreditsItem>
              <CreditsItem
                url="https://openclipart.org/detail/1953/minimalist-monitor-and-computer"
                comment="Public Domain"
              >
                fortran-minimalist-monitor-and-computer.svg
              </CreditsItem>
              <CreditsItem
                url="https://openclipart.org/detail/316666/step-pyramid-2"
                comment="Public Domain"
              >
                step-pyramid.svg
              </CreditsItem>
              <CreditsItem
                url="https://openclipart.org/detail/190682/trace-tree"
                comment="Public Domain"
              >
                Trace-Tree.svg
              </CreditsItem>
            </IonItemGroup>
          </IonList>
        </IonCardContent>
      </IonCard>
    </IonModal>
  );
};

export default CreditsDialog;
