console.log("I am the client");

(async () => {
    const res = await fetch("http://localhost:3000/start");
    console.log(await res.text());
})();

const getElement = (el: string) => document.querySelector(el);

const domSelectors = {
    mazeContainer: ".maze-container",
    mazeTemplate: "#maze-square-template",
    mazeSize: ".maze-size",
    mazeSquare: ".maze-square",
    mazeSizeDisplay: ".maze-form",
};

interface maze {
    size: number;
}

const useState = function () {
    let state: maze = {
        size: 0,
    };

    const getState = () => state;

    const setState = (newState) => {
        state = { ...newState };
    };

    return [getState, setState];
};

// ADD currying
const addEvent = (domElement: string, event: string, fn: (e) => void) =>
    getElement(domElement).addEventListener(event, fn);

const removeEvent = (domElement: string, event: string, fn: (e) => void) =>
    getElement(domElement).removeEventListener(event, fn);

const initialize = function () {
    const addEvents = () => {
        addEvent(domSelectors.mazeSize, "input", handleMazeSize);
        addEvent(domSelectors.mazeSizeDisplay, "submit", handleSubmit);
    };

    const cleanupEvents = () => {
        removeEvent(domSelectors.mazeSize, "input", handleMazeSize);
        removeEvent(domSelectors.mazeSizeDisplay, "submit", handleSubmit);
    };

    return {
        addEvents,
        cleanupEvents,
    };
};

const handleMazeSize = (e: InputEvent) => {
    const [state2, useState2] = useState();

    const newMaze: maze = {
        size: Number((e.target as HTMLInputElement).value),
    };

    // console.log(state2());
    // useState2(newMaze);
    // console.log(state2());
};

const handleSubmit = (e) => {
    console.log(e);
};

function createMaze() {
    const container = getElement(domSelectors.mazeContainer);
    const template = getElement(
        domSelectors.mazeTemplate
    ) as HTMLTemplateElement;
    const templateCopy = template.content.cloneNode(true);
}

initialize().addEvents();

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
