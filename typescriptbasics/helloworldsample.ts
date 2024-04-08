/* More examples First Hello World Program
Run tsc helloworldsample.ts to generate the hellowordsample.js */

class Hello {
    static helloWorld() {
        console.log("Hello, world from static class");
    }
}
// Call the static method
Hello.helloWorld();


class HelloNonStatic {
    helloWorld() {
        console.log("Hello, world from non static class");
    }
}
// Call the non-static method
new HelloNonStatic().helloWorld();

(function() {
    console.log("Hello world from IIFE");
})();

console.log("Hello World from Global Scope");
  