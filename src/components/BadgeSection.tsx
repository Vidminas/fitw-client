import { IonToast } from "@ionic/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppState, UserState } from "../redux/store";
import "./BadgeSection.css";

interface BadgeProps {
  title: string;
  description: string;
  imgSrc: string;
  obtainCount: number;
  countCollected?: number;
}

const BadgeSection: React.FC<{}> = () => {
  const userState = useSelector<AppState, UserState>((state) => state.user);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const Badge: React.FC<BadgeProps> = ({
    title,
    description,
    imgSrc,
    obtainCount,
    countCollected,
  }) => {
    const classNames =
      countCollected === undefined
        ? "badge disabled"
        : countCollected >= obtainCount
        ? "badge obtained"
        : "badge";

    return (
      <>
        <img
          className={classNames}
          alt={`${title}. ${description}.`}
          src={imgSrc}
          onClick={(e) => {
            e.stopPropagation();
            setShowToast(true);
            setToastMessage(
              countCollected === undefined
                ? "Badges are unavailable at the moment!"
                : countCollected >= obtainCount
                ? `You already have the ${title}!`
                : `You don't have the ${title} yet, ${
                    obtainCount - countCollected
                  } objects to go!`
            );
          }}
        />
        <div className="badge-details">
          <p>{title}</p>
          <p>{description}</p>
        </div>
      </>
    );
  };

  return (
    <>
      <p>Badges:</p>
      <section className="badgeContainer">
        <Badge
          title="Planet badge"
          description="You can get this badge by creating 5 new worlds"
          imgSrc="assets/ui/Yellow-planet-01.svg"
          countCollected={userState.user?.stats.createdWorlds}
          obtainCount={5}
        />
        <Badge
          title="Infinity badge"
          description="You can get this badge by creating 100 objects in any world"
          imgSrc="assets/ui/crowd-infinity.svg"
          countCollected={userState.user?.stats.createdTotalObjects}
          obtainCount={100}
        />
        <Badge
          title="Snowman badge"
          description="You can get this badge by creating 5 different winter-themed objects in any world"
          imgSrc="assets/ui/hat-tip-snowman.svg"
          countCollected={userState.user?.stats.createdUniqueWinterObjects}
          obtainCount={5}
        />
        <Badge
          title="Toolbox badge"
          description="You can get this badge by creating 20 different tool-themed objects in any world"
          imgSrc="assets/ui/toolbox_01.svg"
          countCollected={userState.user?.stats.createdUniqueToolObjects}
          obtainCount={20}
        />
        <Badge
          title="Kitchen badge"
          description="You can get this badge by creating 15 different cooking-themed objects in any world"
          imgSrc="assets/ui/stoveovenpot-cdcpd.svg"
          countCollected={userState.user?.stats.createdUniqueCookingObjects}
          obtainCount={15}
        />
        <Badge
          title="Electronics badge"
          description="You can get this badge by creating 10 different electronics-themed objects in any world"
          imgSrc="assets/ui/fortran-minimalist-monitor-and-computer.svg"
          countCollected={userState.user?.stats.createdUniqueElectronicsObjects}
          obtainCount={15}
        />
        <Badge
          title="Pyramid badge"
          description="You can get this badge by creating 5 different desert-themed objects in any world"
          imgSrc="assets/ui/step-pyramid.svg"
          countCollected={userState.user?.stats.createdUniqueDesertObjects}
          obtainCount={5}
        />
        <Badge
          title="Tree badge"
          description="You can get this badge by creating 5 different kinds of trees in any world"
          imgSrc="assets/ui/Trace-Tree.svg"
          countCollected={userState.user?.stats.createdUniqueTreeObjects}
          obtainCount={5}
        />
      </section>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        position="bottom"
        duration={2000}
      />
    </>
  );
};

export default BadgeSection;
