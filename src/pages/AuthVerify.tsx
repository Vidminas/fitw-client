import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import React from "react";
import { RouteComponentProps } from "react-router";
import { SERVER_AUTH_VERIFY } from "../constants";
import { useFetch } from "../hooks/useFetch";

const fetchParams = {
  method: "GET",
};

interface AuthVerifyProps extends RouteComponentProps {
  setIsAuthed: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthVerify: React.FC<AuthVerifyProps> = ({
  history,
  location,
  setIsAuthed,
}) => {
  console.log(SERVER_AUTH_VERIFY + location.search);
  const [data, status] = useFetch(
    SERVER_AUTH_VERIFY + location.search,
    fetchParams
  );

  if (status === "ok" || status === "error") {
    console.log("response from auth verify");
    console.log(data);
  }
  if (status === "ok") {
    setIsAuthed(true);
    history.push("/home", data);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {status === "loading" && <IonTitle>Logging in</IonTitle>}
          {status === "error" && (
            <IonTitle>
              Error while logging in. Please report this to the developer.
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
      </IonContent>
    </IonPage>
  );
};

export default AuthVerify;
