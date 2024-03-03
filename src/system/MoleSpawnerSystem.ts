import { Entity, Game, System } from "../engine";
import { HoleComponent } from "../components/HoleComponent";
import { ImageComponent } from "../components/ImageComponent";
import mole from "../mole.png";
import { ClickableComponent } from "../components/ClickableComponent";

export class MoleSpawnerSystem extends System {
  shouldSpawn = true;
  moleEntity: Entity;
  game: Game;

  constructor(game: Game) {
    super();

    this.game = game;
    this.moleEntity = new Entity("img")
      .addComponent(new ImageComponent(mole))
      .addComponent(new ClickableComponent());
  }

  update(entities: Entity[]): void {
    const moleClickable = this.moleEntity.getComponent(ClickableComponent);
    if (moleClickable.clicked) {
      // TODO: win
      moleClickable.clicked = false;
    }

    if (this.shouldSpawn) {
      const holes = entities.filter((entity) =>
        entity.getComponent(HoleComponent)
      );

      this.game.addEntity(this.moleEntity, this.pickRandomHole(holes));
      this.shouldSpawn = false;
    }
  }

  pickRandomHole(holes: Entity[]) {
    return holes[Math.floor(Math.random() * holes.length)];
  }
}
