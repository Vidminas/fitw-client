import { IonToast } from "@ionic/react";
import React, { useState } from "react";
import "./BadgeSection.css";

const BadgeSection: React.FC<{}> = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const Badge = ({
    title,
    description,
    imgSrc,
  }: {
    title: string;
    description: string;
    imgSrc: string;
  }) => {
    const isObtained = false;

    return (
      <>
        <img
          className={isObtained ? "badge obtained" : "badge"}
          alt={`${title}. ${description}.`}
          src={imgSrc}
          onClick={(e) => {
            e.stopPropagation();
            setShowToast(true);
            setToastMessage(
              isObtained
                ? `You already have the ${title}!`
                : `You don't have the ${title} yet, x objects to go!`
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
          title="Snowman badge"
          description="You can get this badge by creating 10 winter-themed objects in a winter world"
          imgSrc="assets/ui/hat-tip-snowman.svg"
        />
        <Badge
          title="Toolbox badge"
          description="You can get this badge by creating 10 tool-themed objects in any world"
          imgSrc="assets/ui/toolbox_01.svg"
        />
        <Badge
          title="Kitchen badge"
          description="You can get this badge by creating 10 cooking-themed objects in any world"
          imgSrc="assets/ui/stoveovenpot-cdcpd.svg"
        />
        <Badge
          title="Computer badge"
          description="You can get this badge by creating 10 computer-themed objects in any world"
          imgSrc="assets/ui/fortran-minimalist-monitor-and-computer.svg"
        />
        <Badge
          title="Pyramid badge"
          description="You can get this badge by creating 10 desert-themed objects in a desert world"
          imgSrc="assets/ui/step-pyramid.svg"
        />
        <Badge
          title="Tree badge"
          description="You can get this badge by creating 10 different kinds of trees in a forest world"
          imgSrc="assets/ui/Trace-Tree.svg"
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
