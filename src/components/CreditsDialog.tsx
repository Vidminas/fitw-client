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
  const sizeOnLargerScreens =
    url && comment ? "4" : url || comment ? "6" : "12";
  return (
    <IonRow class="ion-align-items-center ion-justify-content-between">
      <IonCol size="12" sizeSm={sizeOnLargerScreens}>
        <IonItem>{children}</IonItem>
      </IonCol>
      {url && (
        <IonCol size="12" sizeSm={sizeOnLargerScreens}>
          <IonItem href={url} target="_blank">
            {url}
          </IonItem>
        </IonCol>
      )}
      {comment && (
        <IonCol size="12" sizeSm={sizeOnLargerScreens}>
          <IonNote>{comment}</IonNote>
        </IonCol>
      )}
    </IonRow>
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
          <IonItemDivider>
            <IonLabel>Concept and programming</IonLabel>
          </IonItemDivider>
          <IonGrid>
            <CreditsItem url="https://github.com/Vidminas">
              Vidminas Mikucionis
            </CreditsItem>
          </IonGrid>

          <IonItemDivider>
            <IonLabel>Audio assets</IonLabel>
          </IonItemDivider>
          <IonGrid>
            <CreditsItem>All voice recordings: Vidminas Mikucionis</CreditsItem>
            <CreditsItem comment="Licensed to Vidminas Mikucionis">
              Game background music: "Calm Bear", "Playing In Water", "Treasure"
              from "Chronicles of the Illusion World" by Nicolas Jeudy (Dark
              Fantasy Studio)
            </CreditsItem>
          </IonGrid>

          <IonItemDivider>
            <IonLabel>GUI assets</IonLabel>
          </IonItemDivider>
          <IonGrid>
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
          </IonGrid>

          <IonItemDivider>
            <IonLabel>Game background assets</IonLabel>
          </IonItemDivider>
          <IonGrid>
            <CreditsItem
              url="https://craftpix.net/freebies/free-underwater-world-parallax-game-backgrounds/"
              comment="CraftPix royalty-free license"
            >
              underwater_background_1.png, underwater_background_2.png,
              underwater_background_3.png, underwater_background_4.png
            </CreditsItem>
            <CreditsItem
              url="https://opengameart.org/content/winter-platformer-game-tileset"
              comment="Creative Commons Zero (CC0) public domain license"
            >
              winter_background.png
            </CreditsItem>
            <CreditsItem
              url="https://www.freepik.com/vectors/background"
              comment="Created by macrovector, FreePik license"
            >
              scifi_background.jpg
            </CreditsItem>
            <CreditsItem
              url="https://www.freepik.com/vectors/snow"
              comment="Created by macrovector, FreePik license"
            >
              floating_islands.jpg
            </CreditsItem>
            <CreditsItem
              url="https://opengameart.org/content/seamless-cave-background"
              comment="Creative Commons Zero (CC0) public domain license"
            >
              back_cave.png
            </CreditsItem>
            <CreditsItem
              url="https://opengameart.org/content/abandon-city-seamless-background"
              comment="Creative Commons Zero (CC0) public domain license"
            >
              Background city Seamless.png
            </CreditsItem>
            <CreditsItem
              url="https://www.kenney.nl/assets/background-elements-redux"
              comment="Creative Commons Zero (CC0) public domain license"
            >
              backgroundColorDesert.png, backgroundColorFall.png,
              backgroundColorForest.png, backgroundColorGrass.png,
              backgroundEmpty.png
            </CreditsItem>
          </IonGrid>

          <IonItemDivider>
            <IonLabel>Game object assets</IonLabel>
          </IonItemDivider>
          <IonGrid>
            <CreditsItem
              url="https://www.kenney.nl/assets/background-elements-redux"
              comment="Creative Commons Zero (CC0) public domain license"
            >
              kenney_spritesheet.png and kenney_spritesheet.xml
            </CreditsItem>
            <CreditsItem
              url="https://www.kenney.nl/assets/generic-items"
              comment="Creative Commons Zero (CC0) public domain license"
            >
              genericItems_spritesheet_colored.png and
              genericItems_spritesheet_colored.xml
            </CreditsItem>
            <CreditsItem
              url="https://opengameart.org/content/winter-platformer-game-tileset"
              comment="Creative Commons Zero (CC0) public domain license"
            >
              winter_sprites.png (packed using ShoeBox)
            </CreditsItem>
            <CreditsItem
              url="https://craftpix.net/freebies/free-2d-rpg-desert-tileset/"
              comment="CraftPix royalty-free license"
            >
              desert_sprites.png (packed using ShoeBox)
            </CreditsItem>
            <CreditsItem
              url="https://craftpix.net/freebies/free-tropical-medieval-city-2d-tileset/"
              comment="CraftPix royalty-free license"
            >
              medieval_tropical_sprites.png (packed using Shoebox)
            </CreditsItem>
            <CreditsItem
              url="https://craftpix.net/freebies/free-underwater-world-2d-game-objects/"
              comment="CraftPix royalty-free license"
            >
              underwater_sprites.png (packed using ShoeBox)
            </CreditsItem>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    </IonModal>
  );
};

export default CreditsDialog;
