import { GameStateComponent } from "../components/GameStateComponent";
import { TextComponent } from "../components/TextComponent";
import { Entity, System } from "../engine";

export class StatusSystem extends System {
  gameState: GameStateComponent;
  winText: Entity;
  clickCounter: Entity;
  timeCounter: Entity;

  constructor(
    singleton: Entity,
    winText: Entity,
    clickCounter: Entity,
    timeCounter: Entity
  ) {
    super();
    this.gameState = singleton.getComponent(GameStateComponent);
    this.winText = winText;
    this.clickCounter = clickCounter;
    this.timeCounter = timeCounter;
  }

  update(_entities: Entity[]): void {
    if (this.gameState.started) {
      this.clickCounter.getComponent(
        TextComponent
      ).text = `Clicks: ${this.gameState.clicks}`;
      this.timeCounter.getComponent(
        TextComponent
      ).text = `Elapsed time: ${this.gameState.time}`;
    }

    if (this.gameState.win) {
      this.winText.getComponent(TextComponent).text = "You win!";
    }
  }
}
