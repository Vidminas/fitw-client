import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCol,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonNote,
  IonPopover,
  IonRow,
} from "@ionic/react";
import { playOutline, trashOutline, warningOutline } from "ionicons/icons";
import "./WorldDialog.css";
import IWorld from "../api/world";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { USER_ENTER_WORLD, WORLD_DELETE } from "../redux/actionTypes";

interface WorldDialogProps {
  isOpen: boolean;
  onDismiss: () => void;
  world: IWorld | null;
}

type FormValues = {
  worldName: string;
};

const WorldDialog: React.FC<WorldDialogProps> = ({
  isOpen,
  onDismiss,
  world,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { worldName: "" },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!world) {
      dispatch({
        type: USER_ENTER_WORLD,
        payload: {
          name: data.worldName,
          background: undefined,
          fitwicks: [],
        },
      });
    } else {
      dispatch({ type: USER_ENTER_WORLD, payload: world });
    }
    onDismiss();
    history.push("/game");
  };

  React.useEffect(() => {
    if (isOpen) {
      setValue("worldName", world?.name || "");
    }
  }, [isOpen, setValue, world]);

  return (
    <IonModal
      isOpen={isOpen}
      cssClass="world-dialog"
      backdropDismiss={true}
      onDidDismiss={() => onDismiss()}
    >
      <IonCard>
        <form>
          <IonCardHeader>
            <IonItem className="world-name">
              <IonLabel position="floating" color="primary">
                World Name
              </IonLabel>
              <Controller
                render={({ name, onChange, onBlur, value }) => (
                  <IonInput
                    name={name}
                    required={true}
                    spellcheck={true}
                    placeholder={"Choose a world name"}
                    value={value}
                    onIonChange={onChange}
                    onIonBlur={onBlur}
                  ></IonInput>
                )}
                control={control}
                name="worldName"
                rules={{
                  required: true,
                  minLength: 3,
                }}
              ></Controller>
              {errors.worldName && (
                <IonNote color="warning">
                  This world needs a name (at least 3 letters long)!
                </IonNote>
              )}
            </IonItem>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonRow>
                    <IonCardSubtitle>World owner: nobody</IonCardSubtitle>
                  </IonRow>
                  <IonRow>
                    <IonCardSubtitle>Shared with: nobody</IonCardSubtitle>
                  </IonRow>
                  <IonRow>
                    <IonCol size="4">
                      {/* using onClick as a workaround because type="submit" for some reason
                  is not enough to trigger the form onSubmit handler */}
                      <IonFabButton
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                      >
                        <IonIcon icon={playOutline}></IonIcon>
                      </IonFabButton>
                    </IonCol>
                    <IonCol size="4">
                      <IonFabButton
                        color="danger"
                        onClick={(e: any) => {
                          e.persist();
                          setShowPopover({ showPopover: true, event: e });
                        }}
                        disabled={!world || !!errors.worldName}
                      >
                        <IonIcon icon={trashOutline}></IonIcon>
                      </IonFabButton>
                    </IonCol>
                  </IonRow>
                </IonCol>
                <IonCol>
                  {world?.background && (
                    <IonImg
                      src={`assets/backgrounds/${world.background}`}
                      alt="world background"
                    />
                  )}
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonPopover
              event={popoverState.event}
              isOpen={popoverState.showPopover}
              onDidDismiss={() =>
                setShowPopover({ showPopover: false, event: undefined })
              }
            >
              <IonGrid>
                <IonRow>
                  <IonCol size="1">
                    <IonIcon color="warning" icon={warningOutline}></IonIcon>
                  </IonCol>
                  <IonCol>
                    <IonLabel color="warning" className="ion-text-wrap">
                      Are you sure you want to delete "{getValues("worldName")}
                      "?
                    </IonLabel>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonButton
                    onClick={() => {
                      if (world?.id) {
                        dispatch({ type: WORLD_DELETE, payload: world.id });
                      }
                      setShowPopover({ showPopover: false, event: undefined });
                      onDismiss();
                    }}
                    color="danger"
                  >
                    Yes
                  </IonButton>
                  <IonButton
                    onClick={() =>
                      setShowPopover({ showPopover: false, event: undefined })
                    }
                  >
                    No
                  </IonButton>
                </IonRow>
              </IonGrid>
            </IonPopover>
          </IonCardContent>
        </form>
      </IonCard>
    </IonModal>
  );
};

export default WorldDialog;
