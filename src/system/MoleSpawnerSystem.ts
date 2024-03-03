import { Entity, Game, System } from "../engine";
import { HoleComponent } from "../components/HoleComponent";
import { ImageComponent } from "../components/ImageComponent";
import mole from "../mole.png";
import { ClickableComponent } from "../components/ClickableComponent";
import { GameStateComponent } from "../components/GameStateComponent";

export class MoleSpawnerSystem extends System {
  shouldSpawn = true;
  moleEntity: Entity;
  game: Game;
  gameState: GameStateComponent;
  started = false;

  constructor(game: Game, singleton: Entity) {
    super();

    this.game = game;
    this.moleEntity = new Entity("img")
      .addComponent(new ImageComponent(mole))
      .addComponent(new ClickableComponent());
    this.gameState = singleton.getComponent(GameStateComponent);
  }

  update(entities: Entity[]): void {
    if (!this.started && this.gameState.started) {
      this.started = true;
      this.shouldSpawn = true;
    }

    if (this.started) {
      const holes = entities.filter((entity) =>
        entity.getComponent(HoleComponent)
      );
      this.handleClick(holes);
      this.spawnMole(holes);
    }
  }

  handleClick(holes: Entity[]) {
    const moleClickable = this.moleEntity.getComponent(ClickableComponent);
    if (moleClickable.clicked) {
      this.gameState.win = true;
      moleClickable.clicked = false;
    }

    for (const hole of holes) {
      const holeClickable = hole.getComponent(ClickableComponent);
      if (holeClickable.clicked) {
        // TODO: debounce
        this.gameState.clicks++;
        holeClickable.clicked = false;
      }
    }
  }

  spawnMole(holes: Entity[]) {
    if (this.shouldSpawn) {
      this.game.addEntity(this.moleEntity, this.pickRandomHole(holes));
      this.shouldSpawn = false;
    }
  }

  pickRandomHole(holes: Entity[]) {
    return holes[Math.floor(Math.random() * holes.length)];
  }
}
