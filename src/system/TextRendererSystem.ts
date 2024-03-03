import { Entity, System } from "../engine";
import { TextComponent } from "../components/TextComponent";

export class TextRendererSystem extends System {
  update(entities: Entity[]): void {
    for (const entity of entities) {
      const textComponent = entity.getComponent(TextComponent);
      if (textComponent) {
        entity.element.innerText = textComponent.text;
      }
    }
  }
}
