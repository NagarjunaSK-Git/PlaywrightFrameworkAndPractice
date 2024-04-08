"use strict";
class LetDemo {
    /** Block scope: Variables declared with let are only accessible within the block (curly braces {}) where they are defined.
     * This prevents accidental modification from outer scopes, promoting code clarity.
    Reassignment: You can update the value of a let variable after its declaration.*/
    demonstrateLet() {
        if (true) {
            let name = "Alice"; // Accessible only within this block
            console.log(name); // Output: Alice
        }
        // name is not accessible here (outside the block)
    }
}
let letDemo = new LetDemo();
letDemo.demonstrateLet();
// Example (avoid using var in new code)
class VarDemo {
    /** Function scope (avoid in modern TypeScript): Variables declared with var are accessible within the entire function
     * where they are defined, regardless of blocks. This can lead to unintended side effects and scoping issues. It's generally recommended to use let or const instead.
  Reassignment: Similar to let, you can modify the value of a var variable*/
    demonstrateVar() {
        var age = 30;
        if (true) {
            age = 25;
            console.log(age); // Output: 25 (accessible within the function)
        }
        console.log(age); // Output: 25 (accessible outside the block)
    }
}
class ConstDemo {
    /** Block scope: Like let, const variables are accessible within the block where they are defined.
  I mmutability: The value of a const variable cannot be changed after its initial assignment.
    This helps prevent accidental modifications and ensures data integrity.
    However, you can modify properties within objects or arrays declared with const.*/
    demonstrateConst() {
        const PI = 3.14159; // Constant value
        // Error: Cannot assign a value to a constant variable
        // PI = 3.14;
        const person = { name: "Bob" };
        person.name = "John"; // Modifying a property within the object is allowed
    }
}
class PrimitiveDataTypesDemo {
    /** Simple data types that cannot be further decomposed into smaller meaningful units.
   Built-in to TypeScript.
   Each primitive data type has a specific size and range of values it can store.
   Common primitive data types in TypeScript include:
   string: Represents a sequence of characters (text).
   number: Represents numeric values (integers, floating-point numbers).
   boolean: Represents logical values (true or false).
   symbol: A unique and immutable identifier.
   undefined: Indicates a variable that has been declared but not yet assigned a value.
   null: Represents the intentional absence of any object value.*/
    demonstratePrimitives() {
        const name = "Charlie";
        console.log(name);
        console.log(typeof name);
        // name = "test";
        const age = 42;
        console.log(age);
        console.log(typeof age);
        const isLoggedIn = true;
        console.log(isLoggedIn);
        console.log(typeof isLoggedIn);
        let someValue = undefined; // Initially undefined
        console.log(someValue);
        console.log(typeof someValue);
        let nothing = null; // Intentionally set to null
        console.log(nothing);
        console.log(typeof nothing);
    }
}
let ObjPrimitiveDataTypesDemo = new PrimitiveDataTypesDemo();
ObjPrimitiveDataTypesDemo.demonstratePrimitives();
/**Use const by default for variables whose values won't change. This promotes immutability and prevents unintended modifications.
If you need to reassign a variable, use let.
Avoid using var in modern TypeScript due to its potential scoping issues. */
