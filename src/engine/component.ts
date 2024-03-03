/**
 * The base of component classes.
 */
export abstract class Component {}

/**
 * Helper type to get a component from an entity.
 */
export type ComponentClass<T extends Component> = new (...args: any[]) => T;
