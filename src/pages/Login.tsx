import { InputChangeEventDetail } from "@ionic/core";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import * as Actions from "../redux/actionTypes";
import { AppState, UserStateStatus } from "../redux/store";

const Login: React.FC<RouteComponentProps> = ({ history, location }) => {
  const dispatch = useDispatch();
  const status = useSelector<AppState, UserStateStatus>(
    (state) => state.user.currentStatus
  );
  const response = useSelector<AppState, any>((state) => state.user.response);
  const error = useSelector<AppState, string | undefined>(
    (state) => state.user.error
  );

  const [email, setEmail] = useState("");
  const handleEmailChange = (event: CustomEvent<InputChangeEventDetail>) => {
    setEmail(event.detail.value || "");
  };

  // Fetch user if auth token is present in the URL (link from auth email)
  // Otherwise, try loading the local user when this component is mounted
  // (this will automatically verify the user with the server if one is found)
  useEffect(() => {
    if (location.search) {
      dispatch({ type: Actions.USER_FETCH, payload: location.search });
    } else {
      dispatch({ type: Actions.USER_LOADLOCAL });
    }
  }, [location.search, dispatch]);

  // And redirect to home for when a user is loaded (local or remote auth)
  useEffect(() => {
    if (status === "loggedIn") {
      history.push("/home");
    }
  }, [status, history]);

  // Request an auth email if an email is submitted
  const handleSubmit = () => {
    dispatch({ type: Actions.USER_AUTH_EMAIL, payload: email });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login form</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {status !== "sentAuthEmail" && status !== "loggedIn" && (
          <>
            <form onSubmit={handleSubmit}>
              <IonItem>
                <IonLabel position="stacked">
                  Enter your email address to log in:
                </IonLabel>
                <IonInput
                  type="email"
                  inputmode="email"
                  onIonChange={handleEmailChange}
                  clearInput={true}
                  placeholder="player@xyz.com"
                  required={true}
                  pattern="[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})"
                ></IonInput>
              </IonItem>
              <IonButton type="submit" disabled={status === "loading"}>
                Submit
              </IonButton>
              <IonLoading
                isOpen={status === "loading"}
                message={"Please wait..."}
              />
            </form>
            {status === "error" && (
              <IonItem>
                <IonLabel position="stacked">
                  There was an error, you can try submitting again
                </IonLabel>
                <IonText color="danger">{error?.toString()}</IonText>
              </IonItem>
            )}
          </>
        )}
        {status === "sentAuthEmail" && (
          <IonItem>
            <IonText>Login token has been sent, check your email.</IonText>
            <IonText>The verification code is {response.code}</IonText>
          </IonItem>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Login;
