export function autoBind(instance: any) {
  // Get the prototype of the instance
  const prototype = Object.getPrototypeOf(instance);

  // Loop over each property in the prototype
  Object.getOwnPropertyNames(prototype).forEach((name) => {
    // Skip problematic properties
    if (
      name === "constructor" ||
      name === "caller" ||
      name === "callee" ||
      name === "arguments"
    ) {
      return;
    }

    const property = prototype[name]; // Access from prototype

    // Check if the property is a method
    if (typeof property === "function") {
      // Bind the method to the instance
      instance[name] = property.bind(instance);
    }
  });
}
