import { IonContent, IonHeader, IonPage } from "@ionic/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import * as Actions from "../redux/actionTypes";
import { AppState, UserStateStatus } from "../redux/store";
import "./LoginForm.css";

const Login: React.FC<RouteComponentProps> = ({ history, location }) => {
  const dispatch = useDispatch();
  const status = useSelector<AppState, UserStateStatus>(
    (state) => state.user.currentStatus
  );
  const response = useSelector<AppState, any>((state) => state.user.response);
  const error = useSelector<AppState, string | undefined>(
    (state) => state.user.error
  );

  const [email, setEmail] = React.useState("");
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  // Fetch user if auth token is present in the URL (link from auth email)
  // Otherwise, try loading the local user when this component is mounted
  // (this will automatically verify the user with the server if one is found)
  React.useEffect(() => {
    if (location.search) {
      dispatch({ type: Actions.USER_FETCH, payload: location.search });
    } else {
      dispatch({ type: Actions.USER_LOADLOCAL });
    }
  }, [location.search, dispatch]);

  // And redirect to home for when a user is loaded (local or remote auth)
  React.useEffect(() => {
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
      <IonHeader></IonHeader>
      <IonContent>
        <div id="book" className="closedFront">
          <div>
            {/* <div className="page-side-left"> */}
            <p>Login form</p>
            {status !== "sentAuthEmail" && status !== "loggedIn" && (
              <>
                <label htmlFor="email-input">
                  Please enter your email address:
                </label>
                <input
                  type="email"
                  name="email-input"
                  onChange={handleEmailChange}
                />
                <button onClick={handleSubmit} disabled={status === "loading"}>
                  Submit
                </button>
                {status === "error" && (
                  <>
                    <p>There was an error, you can try submitting again</p>
                    <p>
                      <code>{error?.toString()}</code>
                    </p>
                  </>
                )}
              </>
            )}
            {status === "sentAuthEmail" && (
              <>
                <p>Login token has been sent, check your email.</p>
                <p>The verification code is {response.code}</p>
              </>
            )}
            {/* </div> */}
            {/* <div className="page-side-right" /> */}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
