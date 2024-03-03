import "./style.css";
import { Game, Entity } from "./engine";
import { TextComponent } from "./components/TextComponent";
import { TextRendererSystem } from "./system/TextRendererSystem";
import { HoleComponent } from "./components/HoleComponent";
import { MoleSpawnerSystem } from "./system/MoleSpawnerSystem";
import { ImageRendererSystem } from "./system/ImageRendererSystem";
import { InputSystem } from "./system/InputSystem";
import { ClickableComponent } from "./components/ClickableComponent";
import { GameStateComponent } from "./components/GameStateComponent";
import { GameStateSystem } from "./system/GameStateSystem";
import { StatusSystem } from "./system/StatusSystem";

/*
  Setup game
*/
const gameContainer = document.getElementById("game");
if (!gameContainer) throw new Error("No element with id #game.");
gameContainer?.classList.add("container");

const game = new Game(gameContainer);

game.setup(() => {
  /*
      Create entities
  */
  game.addEntity(
    new Entity("h1")
      .style("title")
      .addComponent(new TextComponent("MetaPals Catch a Mole!"))
  );

  const holeContainer = new Entity("div").style("flex justify-center");
  game.addEntity(holeContainer);

  for (let i = 0; i < 3; i++) {
    const hole = new Entity("div")
      .style("hole mx-2")
      .addComponent(new HoleComponent())
      .addComponent(new ClickableComponent());
    game.addEntity(hole, holeContainer);
  }

  const winText = new Entity("div")
    .style("text-green-500 text-center py-4")
    .addComponent(new TextComponent());
  game.addEntity(winText);

  const clickCounter = new Entity("div")
    .style("text-center py-4")
    .addComponent(new TextComponent());
  game.addEntity(clickCounter);

  const timeCounter = new Entity("div")
    .style("text-center py-4")
    .addComponent(new TextComponent());
  game.addEntity(timeCounter);

  const startButtonContainer = new Entity("div").style("text-center py-4");
  game.addEntity(startButtonContainer);

  const startButton = new Entity("button")
    .style("button")
    .addComponent(new TextComponent("Start"))
    .addComponent(new ClickableComponent());
  game.addEntity(startButton, startButtonContainer);

  const singleton = new Entity("div").addComponent(new GameStateComponent());

  /*
      Create systems
  */
  game.addSystem(new InputSystem());
  game.addSystem(new GameStateSystem(startButton, singleton));
  game.addSystem(new MoleSpawnerSystem(game, singleton));
  game.addSystem(
    new StatusSystem(singleton, winText, clickCounter, timeCounter)
  );
  game.addSystem(new TextRendererSystem());
  game.addSystem(new ImageRendererSystem());
});

game.start();
