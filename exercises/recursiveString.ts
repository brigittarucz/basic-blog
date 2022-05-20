let str = "";

function myRecFn(userInput) {
    // Termination case
    if (typeof userInput !== "string") {
        return;
    }

    // Base case
    if (userInput.length === 0) {
        return str.trim();
    } else {
        // Sanitizing userInput
        userInput = userInput.trim();
        const words: any = userInput.split(" ");
        words.filter((word) => word.length > 0);

        // Recursion itself
        str += words[words.length - 1] + " ";
        words.splice(-1);

        const composedInput = words.reduce(
            (accumulator, currentValue) => accumulator + currentValue + " ",
            ""
        );
        console.log(composedInput);
        return myRecFn(composedInput);
    }
}

console.log(myRecFn("I AM A CAT"));
