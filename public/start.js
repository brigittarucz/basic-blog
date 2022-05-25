console.log("I am the client");
(async () => {
    const res = await fetch("http://localhost:3000/start");
    console.log(await res.text());
})();
const getElement = (el) => document.querySelector(el);
const domSelectors = {
    mazeContainer: ".maze-container",
    mazeTemplate: "#maze-square-template",
    mazeSize: ".maze-size",
    mazeSquare: ".maze-square",
    mazeForm: ".maze-form",
    mazeSizeDisplay: ".maze-size-display",
};
// ADD currying
const addEvent = (domElement, event, fn) => getElement(domElement).addEventListener(event, fn);
const removeEvent = (domElement, event, fn) => getElement(domElement).removeEventListener(event, fn);
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
            state = Object.assign({}, newMaze);
        },
    };
};
const mazeState = useState();
const handleMazeSize = (e) => {
    const newMaze = {
        size: Number(e.target.value),
    };
    mazeState.setState(newMaze);
    getElement(domSelectors.mazeSizeDisplay).textContent = String(mazeState.state.size);
};
const handleSubmit = (e) => {
    console.log(e);
};
function createMaze() {
    const container = getElement(domSelectors.mazeContainer);
    const template = getElement(domSelectors.mazeTemplate);
    const templateCopy = template.content.cloneNode(true);
}
initialize().addEvents();
//# sourceMappingURL=start.js.map