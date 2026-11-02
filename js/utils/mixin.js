/*
  Copies the methods of one or more classes onto a target class.
  Used to split a large Web Component into smaller files while
  keeping `this` pointing at the component instance.
*/
export function mixin(target, ...sources) {
  for (const source of sources) {
    for (const name of Object.getOwnPropertyNames(source.prototype)) {
      if (name === "constructor") continue;
      Object.defineProperty(
        target.prototype,
        name,
        Object.getOwnPropertyDescriptor(source.prototype, name),
      );
    }
  }
}
