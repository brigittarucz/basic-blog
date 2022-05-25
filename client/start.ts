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
    mazeForm: ".maze-form",
    mazeSizeDisplay: ".maze-size-display",
};

interface maze {
    size: number;
}

// ADD currying
const addEvent = (domElement: string, event: string, fn: (e) => void) =>
    getElement(domElement).addEventListener(event, fn);

const removeEvent = (domElement: string, event: string, fn: (e) => void) =>
    getElement(domElement).removeEventListener(event, fn);

const initialize = function () {
    const addEvents = () => {
        addEvent(domSelectors.mazeSize, "input", handleMazeSize);
        addEvent(domSelectors.mazeForm, "submit", handleSubmit);
    };

    const cleanupEvents = () => {
        removeEvent(domSelectors.mazeSize, "input", handleMazeSize);
        removeEvent(domSelectors.mazeForm, "submit", handleSubmit);
    };

    return {
        addEvents,
        cleanupEvents,
    };
};

const useState = () => {
    let state = {
        size: 0,
    };

    return {
        // In order to call 'state' as a prop not as a method
        get state() {
            return state;
        },
        setState: (newMaze) => {
            state = { ...newMaze };
        },
    };
};

const mazeState = useState();

const handleMazeSize = (e: InputEvent) => {
    const newMaze: maze = {
        size: Number((e.target as HTMLInputElement).value),
    };

    mazeState.setState(newMaze);
    getElement(domSelectors.mazeSizeDisplay).textContent = String(
        mazeState.state.size
    );
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
