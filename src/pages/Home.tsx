import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import Book from "../components/Book";
import { SERVER_USERS_ENDPOINT } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_FETCH, USER_LOADED } from "../redux/actionTypes";
import { Dispatch } from "redux";
import IUser from "../api/user";

const fetchUser = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<any>
) => (dispatch: Dispatch) => {
  dispatch({ type: USER_FETCH });
  setLoading(true);
  axios
    .get(SERVER_USERS_ENDPOINT)
    .then((response) => {
      dispatch({ type: USER_LOADED, payload: response.data[0] });
      setLoading(false);
    })
    .catch((error) => {
      setError(error);
      setLoading(false);
    });
};

const Home: React.FC = () => {
  const user: IUser = useSelector((state: any) => state.user?.user);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<any>(undefined);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchUser(setLoading, setError));
  }, [dispatch]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {loading && (
            <IonTitle>Connecting to {SERVER_USERS_ENDPOINT}</IonTitle>
          )}
          {error && (
            <IonTitle>
              Error while connecting to {SERVER_USERS_ENDPOINT}. Please report
              this to the developer.
            </IonTitle>
          )}
          {!loading && !error && (
            <IonTitle>Welcome to Fill In The World!</IonTitle>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {!loading && !error && user && <Book user={user} />}
      </IonContent>
    </IonPage>
  );
};

export default Home;
