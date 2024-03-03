import { ClickableComponent } from "../components/ClickableComponent";
import { Entity, System } from "../engine";

/**
 * Handles click events. Will mark target entity with ClickableComponent as clicked.
 */
export class InputSystem extends System {
  target: EventTarget | null = null;

  constructor() {
    super();
    // Subscribe to onclick events.
    document.onclick = (ev) => {
      this.target = ev.target;
    };
  }

  update(entities: Entity[]): void {
    // Do nothing if player didn't click anything.
    if (!this.target) return;

    for (const entity of entities) {
      const clickableComponent = entity.getComponent(ClickableComponent);
      if (clickableComponent && entity.element == this.target) {
        clickableComponent.clicked = true;
        this.target = null;
        break;
      }
    }
  }
}
