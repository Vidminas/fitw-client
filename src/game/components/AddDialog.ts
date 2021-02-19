import InputText from "phaser3-rex-plugins/plugins/inputtext.js";
import Button from "./Button";

class AddDialog {
  constructor(
    scene: Phaser.Scene & { rexUI: any },
    x: number,
    y: number,
    callback: Function
  ) {
    const background = scene.rexUI.add.roundRectangle(
      0,
      0,
      100,
      100,
      20,
      0xf57f17
    );
    const title = scene.rexUI.add.label({
      background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0xbc5100),
      text: scene.add.text(0, 0, "Add to world:", {
        fontSize: "20px",
      }),
      space: {
        left: 15,
        right: 15,
        top: 10,
        bottom: 10,
      },
    });
    const inputBox = new InputText(scene, 0, 0, 400, 60, {
      color: "white",
      fontSize: "24px",
      placeholder: "Type in something",
      backgroundColor: "#333333",
      valign: "center",
    });
    inputBox.setStyle("border-radius", "25px");
    scene.add.existing(inputBox);

    const confirmButton = new Button(
      scene,
      0,
      0,
      "buttons",
      "Button_174.png",
      "Button_175.png",
      "Button_176.png",
      () => {
        console.log("confirm");
      }
    ).setDisplaySize(64, 64);
    const cancelButton = new Button(
      scene,
      0,
      0,
      "buttons",
      "Button_180.png",
      "Button_181.png",
      "Button_182.png",
      () => {
        console.log("cancelled");
      }
    ).setDisplaySize(64, 64);

    const dialog = scene.rexUI.add
      .dialog({
        x,
        y,
        background,
        title,
        content: inputBox,
        actions: [cancelButton, confirmButton],
        actionsAlign: "left",
        space: {
          title: 10,
          action: 5,
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      })
      .layout()
      .pushIntoBounds()
      .popUp(500);

    dialog.on(
      "button.click",
      (button: Button, groupName: string, index: number) => {
        dialog.scaleDownDestroy(100);
        if (button === confirmButton) {
          callback(inputBox.text);
        }
      }
    );
  }
}

export default AddDialog;
