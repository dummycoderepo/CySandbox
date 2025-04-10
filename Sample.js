let fruits = ["apple", "banana", "cherry", "orange", "grape"];
console.log(fruits.at(-4));

let supermarket = ["apple", "banana", "cherry", "orange", "grape", "kiwi", "mango", "pear", "peach"];
console.log(supermarket.length - 1 - supermarket.indexOf("kiwi"));

while (fruits.length < supermarket.length) {
    fruits.unshift(undefined);
}
console.log(fruits);