const add2 = (num) => num + 2;

const add3 = (num) => num + 3;

const add4 = (num) => num + 4;

const pipe = (initialValue, ...args) => {
    const fcArgs = [...args];
    const res = fcArgs.reduce((accumulator, fn) => {
        return fn(accumulator);
    }, initialValue);
    return res;
};

console.log(pipe(2, add4, add3, add2));

console.log(add4(add3(add2(2))));

const add = (n1) => (n2) => n1 + n2;
const multiply = (n1) => (n2) => n1 * n2;

add(1)(2);
multiply(2)(3);

const addition = (initialValue) => {
    const addMultiply = (n1) => (n2) => (initialValue + n1) * n2;
    const addTwoMultiplyByThree = addMultiply(2)(3);

    return addTwoMultiplyByThree;
};
console.log(addition(2));
