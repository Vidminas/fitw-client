import { IonContent, IonHeader, IonPage } from "@ionic/react";
import React from "react";
import { useCookies } from "react-cookie";
import { RouteComponentProps } from "react-router";
import { SERVER_AUTH } from "../constants";
import "./LoginForm.css";

type Status = "initial" | "loading" | "error" | "ok";

interface LoginProps extends RouteComponentProps {
  setIsAuthed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ history, setIsAuthed }) => {
  const [cookies] = useCookies();
  const [email, setEmail] = React.useState("");
  const [data, setData] = React.useState<any>(null);
  const [status, setStatus] = React.useState<Status>("initial");

  if (cookies["connect.sid"]) {
    console.log("Found session cookie!");
    setIsAuthed(true);
    history.push("/home");
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = () => {
    const fetchParams = {
      method: "POST",
      body: JSON.stringify({
        destination: email,
      }),
      headers: { "Content-Type": "application/json" },
    };
    const controller = new AbortController();

    fetch(SERVER_AUTH, {
      ...fetchParams,
      signal: controller.signal,
    })
      .then((response) => {
        console.log(response);
        setStatus(response.ok ? "ok" : "error");
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setStatus("error");
        setData(error);
        console.error(error);
      });
    return () => controller.abort();
  };

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent>
        <div id="book" className="closedFront">
          <div>
            {/* <div className="page-side-left"> */}
            <p>Login form</p>
            {(status === "initial" || status === "error") && (
              <>
                <label htmlFor="email-input">
                  Please enter your email address:
                </label>
                <input
                  id="email-input"
                  onChange={handleEmailChange}
                  type="email"
                />
              </>
            )}
            {status === "ok" && (
              <>
                <p>Login token has been sent, check your email.</p>
                <p>The verification code is {data.code}</p>
              </>
            )}
            {status === "error" && (
              <p>There was an error, you can try submitting again: {data}</p>
            )}
            <button
              onClick={handleSubmit}
              disabled={status !== "initial" && status !== "error"}
            >
              Submit
            </button>
            {/* </div> */}
            {/* <div className="page-side-right" /> */}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
