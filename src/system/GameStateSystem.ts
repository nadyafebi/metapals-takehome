import { ClickableComponent } from "../components/ClickableComponent";
import { GameStateComponent } from "../components/GameStateComponent";
import { Entity, System } from "../engine";

export class GameStateSystem extends System {
  startButton: Entity;
  gameState: GameStateComponent;
  started = false;

  constructor(startButton: Entity, singleton: Entity) {
    super();
    this.startButton = startButton;
    this.gameState = singleton.getComponent(GameStateComponent);
  }

  update(_entities: Entity[]): void {
    const startClickable = this.startButton.getComponent(ClickableComponent);
    if (startClickable.clicked) {
      this.gameState.started = true;
      this.gameState.clicks = 0;
      this.gameState.time = 0;
      this.startButton.element.setAttribute("disabled", "true");
      this.started = true;
      startClickable.clicked = false;
    }

    if (this.started && !this.gameState.started) {
      this.started = false;
      this.startButton.element.removeAttribute("disabled");
    }

    if (this.gameState.win) {
      setTimeout(() => {
        alert(
          `Gotcha! time to catch ${this.gameState.time} seconds and ${this.gameState.clicks} clicks`
        );
      }, 100);
      this.gameState.started = false;
      this.gameState.win = false;
    }
  }
}
