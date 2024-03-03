import { Entity } from ".";

/**
 * A system that process entities each update.
 */
export abstract class System {
  /**
   * Updates entities.
   * @param entities List of entities to be updated.
   */
  abstract update(entities: Entity[]): void;
}
