import { Entity, EntityId, System } from "../engine";
import { TextComponent } from "../components/TextComponent";

export class TextRendererSystem extends System {
  renderCache: Record<EntityId, string> = {};

  update(entities: Entity[]): void {
    for (const entity of entities) {
      const textComponent = entity.getComponent(TextComponent);

      // Update DOM only when the text changed.
      if (textComponent && this.renderCache[entity.id] != textComponent.text) {
        entity.element.innerText = textComponent.text;
        this.renderCache[entity.id] = textComponent.text;
      }
    }
  }
}
