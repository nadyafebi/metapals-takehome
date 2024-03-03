import { Component, ComponentClass } from "./Component";

/**
 * An entity ID.
 */
export type EntityId = string;

/**
 * Represents an entity in the game.
 */
export class Entity {
  id: EntityId;
  element: HTMLElement;
  private components: Record<string, Component> = {};

  /**
   * Creates a new entity with the specified HTML tag.
   * @param tagName An HTML element tag name.
   */
  constructor(tagName: keyof HTMLElementTagNameMap) {
    this.id = crypto.randomUUID();
    this.element = document.createElement(tagName);
  }

  /**
   * Styles the entity with the specified class names.
   * @param className CSS class names.
   * @returns Instance of the entity.
   */
  style(className: string) {
    this.element.className = className;
    return this;
  }

  /**
   * Adds a component to the entity.
   * @param component Component to be added.
   * @returns Instance of the entity.
   */
  addComponent(component: Component) {
    this.components[component.constructor.name] = component;
    return this;
  }

  /**
   * Removes a component from the entity.
   * @param component Component to be removed.
   * @returns Instance of the entity.
   */
  removeComponent(component: Component) {
    delete this.components[component.constructor.name];
    return this;
  }

  /**
   * Gets component data based on type from entity.
   * @param componentClass Component type to be returned.
   * @returns Component data in the entity.
   */
  getComponent<T extends Component>(componentClass: ComponentClass<T>): T {
    return this.components[componentClass.name] as T;
  }
}
