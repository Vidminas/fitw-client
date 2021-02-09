import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/Login";
import AuthVerify from "./pages/AuthVerify";
import Game from "./pages/Game";

const App: React.FC = () => {
  const [isAuthed, setIsAuthed] = React.useState(false);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet animated={true}>
          <Redirect exact path="/" to="/home" />
          <Route exact path="/home" component={Home} />
          <Route exact path="/game" component={Game} />
          <Route
            exact
            path="/login"
            render={(props) => <Login setIsAuthed={setIsAuthed} {...props} />}
          />
          <Route
            exact
            path="/auth/verify"
            render={(props) => (
              <AuthVerify setIsAuthed={setIsAuthed} {...props} />
            )}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
