import { Entity, System } from ".";

/**
 * Handles and manages the game.
 */
export class Game {
  private entities: Entity[];
  private systems: System[];
  private root: HTMLElement;
  private setupFn: Function = () => {};
  private isGameRunning = false;
  private animationRequestId: number = 0;

  /**
   * Creates a new game under the specified root element.
   * @param root HTML element to be used as the root of entities.
   */
  constructor(root: HTMLElement) {
    this.entities = [];
    this.systems = [];
    this.root = root;
  }

  /**
   * Adds an entity to be managed by the game.
   * @param entity Entity to be added.
   * @param parent Parent of the entity. If not specified, then it will be the child of root element.
   */
  addEntity(entity: Entity, parent?: Entity) {
    this.entities.push(entity);

    if (!parent) {
      this.root.appendChild(entity.element);
    } else {
      parent.element.appendChild(entity.element);
    }
  }

  /**
   * Adds a system to be run by the game.
   * @param system System to be added.
   */
  addSystem(system: System) {
    this.systems.push(system);
  }

  /**
   * Set a setup function to be called each time the game starts.
   * @param setupFn A function to setup the game.
   */
  setup(setupFn: Function) {
    this.setupFn = setupFn;
  }

  /**
   * Starts the game loop.
   */
  start() {
    // If the game is still running, stop it.
    if (this.isGameRunning) {
      this.stop();
    }

    // Clear the game DOM.
    this.root.replaceChildren();

    // Run the initialize function.
    this.setupFn();

    // Create game loop.
    const gameLoop = () => {
      this.update();
      this.animationRequestId = requestAnimationFrame(gameLoop);
    };
    this.animationRequestId = requestAnimationFrame(gameLoop);
    this.isGameRunning = true;
  }

  /**
   * Runs update.
   */
  update() {
    for (const system of this.systems) {
      system.update(this.entities);
    }
  }

  /**
   * Stops the game loop.
   */
  stop() {
    cancelAnimationFrame(this.animationRequestId);
    this.animationRequestId = 0;
  }
}
