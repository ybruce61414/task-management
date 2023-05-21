
## React questions
1. ### What is React? Explain the main benefits of using React for building user interfaces.
   1. It's an open-source JavaScript library developed by Facebook.
   2. 
      1. **Component-based architecture**: 
         - React follows a component-based approach, where the user interface is divided into small, reusable components. This modular structure promotes code reusability, maintainability, and separation of concerns. Components can be composed and nested to build complex UIs efficiently.

      2. **Virtual DOM**: 
         - React utilizes a virtual DOM (Document Object Model) that provides an abstraction of the actual DOM. When there are changes in the application state, React efficiently updates the virtual DOM and then selectively updates only the necessary parts of the actual DOM. This approach reduces the number of direct manipulations to the DOM, resulting in improved performance and a smoother user experience.

      3. **Declarative syntax**: 
         - React uses a declarative syntax, where developers describe the desired outcome or state of the user interface, and React takes care of updating the actual DOM to reflect that state. This approach simplifies the code and makes it easier to understand, reason about, and maintain.

      4. **Efficient updates with reconciliation**: 
         - React's reconciliation algorithm efficiently updates the UI by determining the minimum number of changes required to reflect the new state. It compares the previous and current states of components and their children and updates only the necessary parts. This approach reduces unnecessary re-rendering and improves performance.

      5. **One-way data flow**: 
         - React enforces a unidirectional data flow, where data flows from parent components to child components. This pattern makes it easier to understand how data changes propagate through the UI, making debugging and testing more manageable.
      6. **Rich ecosystem and community**: 
         - React has a vibrant and active community that contributes to its ecosystem. It provides a vast collection of third-party libraries, tools, and resources, which can accelerate development, solve common challenges, and enhance productivity.

      7. **Cross-platform development**: 
         - React can be used to build user interfaces not only for web applications but also for mobile platforms using React Native. With React Native, developers can leverage their existing React knowledge to create native mobile apps for iOS and Android, sharing a significant amount of code between platforms.

      8. **Backed by Facebook**: 
         - React is developed and maintained by Facebook, which means it benefits from continuous updates, improvements, and support from a dedicated team. It also assures developers of the library's stability and long-term viability.

2. ### How would you create a reusable component in React? Can you provide an example?
   1. **Identify the component**: Determine the purpose and functionality of the component. Consider if it can be used in multiple places within your application or if it has a specific, isolated functionality.

   2. **Create a new component**: In your React project, create a new JavaScript file for your component or add it to an existing file.

   3. **Define the component**: Implement the component as a JavaScript function. The function should accept props as its argument and return JSX.
      > ``` jsx 
      > import React from 'react';
      > 
      > function MyComponent(props) {
      >   // Component logic and JSX rendering
      >   return (
      >     <div>
      >       <h1>{props.title}</h1>
      >       <p>{props.content}</p>
      >     </div>
      >   );
      > }
      > 
      > export default MyComponent;
      >```

   4. **Configure the component**: Identify the necessary properties (props) that the component needs to receive. Props allow you to pass data from the parent component to the child component. You can use the `props` object to access the values within your component.

   5. **Use the component**: Import your component into other parts of your application where you want to use it. Pass any required props to the component as attributes.
      > ``` jsx 
      > import React from 'react';
      > import MyComponent from './MyComponent';
      > 
      > function App() {
      >   return (
      >     <div>
      >       <MyComponent 
      >         title="Reusable Component" 
      >         content="This is a reusable component." 
      >       />
      >     </div>
      >   );
      > }
      > 
      > export default App;
      >```
      In this example, `MyComponent` is used in the `App` component, and the title and content props are passed to it.
   6. **Test and refine**: Test your reusable component in different scenarios to ensure it behaves as expected. Make any necessary adjustments or refinements based on the use cases and feedback.

3. ### How do you handle state in React? What are some common pitfalls to avoid when working with state in React?
   1. There are 3 common ways to handle state:
      1. Function Components with hooks `useState` and `useReducer`.
      2. Context API: The Context API allows you to share state across multiple components without passing props through intermediate components. It's useful for global state management. You can create a context using the `createContext` function and use the `Provider`.
      3. State management libraries: like *Redux*, *MobX*, or *Zustand*.
   2. Try to avoid:
      1. **Mutating state directly**: Directly mutating the state object can lead to unexpected behavior. Instead, always use the appropriate methods provided by React, such as `setState` or `useReducer`, to update the state. These methods ensure that React's internal mechanisms for state management and re-rendering are triggered correctly.
      2. **Overusing or over-nesting stateful components**: It's important to keep your component tree organized and avoid excessive nesting of stateful components. Overuse of stateful components can lead to unnecessary complexity and make it harder to manage state. Consider whether a component truly needs to maintain its own state or if it can rely on props from parent components.
      3. **Inefficient re-renders**: React is efficient in updating the DOM by selectively re-rendering only the necessary components. However, if your component structure or state updates are not optimized, you may experience unnecessary re-renders. Ensure that your components are structured in a way that minimizes re-renders, use memoization techniques (e.g., `React.memo` or `useMemo`) for expensive calculations, and avoid excessive re-renders caused by frequent state updates.
      4. **Mixing stateful and stateless logic**: It's important to separate the concerns of stateful and stateless logic. Stateful components should primarily handle state management, while stateless components (also known as presentational or dumb components) should focus on rendering UI based on the provided props. Mixing the two can make your code harder to understand and maintain. Consider using a container-component pattern or state management libraries like Redux to manage state separately from your presentational components.


4. ### Explain the difference between props and state in React. When would you use one over the other?
   1. props are used to pass data from a parent component to its child components, while state is used to manage and control data within a component itself. Props are read-only and passed from top to bottom, while state is owned and managed by the component and can be changed through specific methods.
   2. 
      1. When to use props over state:
        - Use props when passing data or behavior from a parent component to a child component.
        -   Props are useful for creating reusable and configurable components, as they allow you to customize the child component's behavior and appearance based on the parent's needs.
        - Props provide a clear separation of concerns, making it easier to reason about and test components independently.
      2. When to use state over props:
         - Use state when you need to manage and update data within a component itself.
         - State is used to handle component-specific data that can change over time, such as user input, toggling UI elements, or maintaining component-specific state.
         - State allows the component to maintain its own internal state and triggers re-rendering when it changes.
5. ### How would you optimize the performance of a React application? Can you provide some examples of techniques you might use?
   1. The ways to optimize the performance:
      1. Optimize expensive calculations:
         - Use useMemo or React.memo to memoize and cache the results of expensive calculations, preventing unnecessary recalculations during re-renders.
      2. Avoid unnecessary state updates:
         - Be mindful of how and when you update state. Use functional updates with setState or state hooks (`useState`, `useReducer`) to avoid unnecessary state updates caused by stale closures.
         - Leverage the `useCallback` hook to memoize the reference of event handler's function and prevent them from being recreated on each render.
      3. Split and lazily load code (using webpack):
         - Split your code into smaller, reusable components and use code-splitting techniques such as dynamic imports or React.lazy to load components only when needed. This can significantly improve initial loading times.
      4. Optimize network requests:
         - Minimize the size of assets by compressing and optimizing images, scripts, and stylesheets.
         - Implement caching and use techniques like HTTP caching and conditional fetching to reduce unnecessary network requests.
      5. Use module bundler for production code:
         - When deploying your React application, use production build tool like webpack. These builds apply various optimizations, such as minification, dead code elimination, and more, to reduce the size and improve the performance of your application.
      6. Implement virtualization:
         - For large lists or grids, consider using virtualization libraries like react-window or react-virtualized. These libraries render only the visible portion of a list, improving rendering performance by reducing the number of DOM elements.
      7. Throttle and Debounce
   2. Techniques I used:
      1. Using dynamic import and bundle the whole app using webpack.
      2. Infinite scroll with throttle.
      3. Using Redux to optimize rendering mechanism.

