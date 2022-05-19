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

function handleMazeSize(e) {
    console.log(e);
}

function handleSubmit(e) {
    console.log(e);
}

function createMaze() {
    const container = getElement(domSelectors.mazeContainer);
    const template = getElement(
        domSelectors.mazeTemplate
    ) as HTMLTemplateElement;
    const templateCopy = template.content.cloneNode(true);
}

initialize().addEvents();
