console.log("Before 1.");
console.log("Before 2.");
console.log("Before 3.");

const testPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Test Promise Done after 1000ms");
  }, 0.00000000000000000005);
});

testPromise.then((result) => {
  console.log(result);
});

console.log("After 1.");
console.log("After 2.");
console.log("After 3.");
console.log("After 4.");
console.log("After 5.");
console.log("After 6.");
console.log("After 7.");
console.log("After 8.");
console.log("After 9.");
console.log("After 10.");
console.log("After 11.");
console.log("After 12.");
console.log("After 13.");
console.log("After 14.");
console.log("After 15.");
console.log("After 16.");
console.log("After 17.");
console.log("After 18.");
console.log("After 19.");
console.log("After 20.");
