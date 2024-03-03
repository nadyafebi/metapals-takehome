import { ImageComponent } from "../components/ImageComponent";
import { Entity, System, EntityId } from "../engine";

export class ImageRendererSystem extends System {
  renderCache: Record<EntityId, string> = {};

  update(entities: Entity[]): void {
    for (const entity of entities) {
      const imageComponent = entity.getComponent(ImageComponent);

      // Update DOM only when the src changed.
      if (imageComponent && this.renderCache[entity.id] != imageComponent.src) {
        entity.element.setAttribute("src", imageComponent.src);
        this.renderCache[entity.id] = imageComponent.src;
      }
    }
  }
}
