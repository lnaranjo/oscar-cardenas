# The Complete Guide to Advanced React Component Patterns

### Why advanced react patterns?

- Solve issues related to build reusable components using proven solutions.
- Development of highly cohesive components with minimal coupling.
- Better ways to share logic bwtween components.

# The Complete Guide to Advanced React Component Patterns

### ¿Qué patrones existen?

![Advanced React Patterns Ultrasimplified](./assets/classificationOfPatterns.png)

### ¿Cómo elegir el patrón adecuado?

- `Custom Hooks`: Used when all you want to share is user logic, not interface elements. Here is an example of a [ReactHooks](https://antonioru.github.io/beautiful-react-hooks/) library.
- `Reusable styles`: Used when the only thing that matters is to offer a UI interface, the implementation is simple and in terms of offering options to visually modify the component.
- `Compund components`: When you want to split into some kind of parent-child relationship, i.e. choose to decompose the interfaces into smaller components and generate a hierarchical parent-child relationship.
- `State initializers` & `Props Collection Getters & Setters`: Normally they are in the middle ground where it is required to offer logic and user interfaces, without significantly increasing the difficulty and implementation.
- `State Reducer` & `Control Props`: They allow you to transfer control of what you can control to determine what happens internally. No doubt they become more difficult to implement but they allow to offer more options for internal control and interfaces to the components.
