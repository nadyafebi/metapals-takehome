# MetaPals Take-home Assignment

[Requirements](https://metapals.github.io/frontend-interview-test-lite/)

## Getting Started

```bash
git clone git@github.com:nadyafebi/metapals-takehome.git
cd metapals-takehome
npm install
npm run dev
```

## Engine

The game engine is a DOM-based Entity Component System (ECS) game engine:

- **Game**

  The game class and handles the game loop, entities, and systems. Must pass a root DOM node when initializing.

- **Entity**

  Each entity is linked to a DOM node. It can hold multiple components and can be created like this:

  ```javascript
  const entity = new Entity("div")
    .style("classA classB")
    .addComponent(new ComponentA())
    .addComponent(new ComponentB(param1, param2));

  game.addEntity(entity, parentEntity);
  ```

  If the parent is not specified, then it will be added to the root node.

- **Component**

  A component stores data on the entity, but it doesn't handle any game logic.

- **System**

  A system handles the game logic as it has an update function that gets called by the game loop every frame. The game loop will pass the list of registered entities for the system to process.

## Game

The game is incomplete, but the current version demonstrates how to use the game engine:

- Creating the game layout.

- Systems interacting with multiple entities and components.

- Handling inputs.
