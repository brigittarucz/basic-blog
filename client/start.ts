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
    mazeArr: string[];
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
        size: 10,
        mazeArr: [],
    };

    return {
        // In order to call 'state' as a prop not as a method
        get state() {
            return state;
        },
        setState: (newMaze: maze) => {
            state = { ...newMaze };
        },
    };
};

const mazeState = useState();

const handleMazeSize = (e: InputEvent) => {
    const newMaze: maze = {
        size: Number((e.target as HTMLInputElement).value),
        mazeArr: [],
    };

    mazeState.setState(newMaze);
    document.querySelectorAll(domSelectors.mazeSizeDisplay).forEach((item) => {
        item.textContent = String(mazeState.state.size);
    });
};

const handleSubmit = (e: Event) => {
    e.preventDefault();
    const data = new FormData(<HTMLFormElement>e.target);
    const mazeSizeInput = Number(data.get("mazeSize"));

    if (mazeSizeInput > 16 || mazeSizeInput < 8 || !String(mazeSizeInput)) {
        return;
    }

    createMaze();
};

function createMaze() {
    const container = getElement(domSelectors.mazeContainer) as HTMLElement;

    if (container.children.length) {
        container.innerHTML = "";
    }

    container.style.gridTemplateColumns = `repeat(${mazeState.state.size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${mazeState.state.size}, 1fr)`;

    const template = getElement(
        domSelectors.mazeTemplate
    ) as HTMLTemplateElement;

    let rowBooleans = "";

    for (let i = 0; i < Math.pow(mazeState.state.size, 2); i++) {
        const templateCopy = template.content.cloneNode(true);

        if (Math.round(Math.random())) {
            (<HTMLDivElement>(
                (<HTMLTemplateElement>templateCopy).querySelector(
                    ".maze-square"
                )
            )).style.backgroundColor = "black";

            if (i % mazeState.state.size !== 0 || i === 0) {
                rowBooleans += 0;
            } else {
                rowBooleans += " 0";
            }
        } else {
            if (i % mazeState.state.size !== 0 || i === 0) {
                rowBooleans += 1;
            } else {
                rowBooleans += " 1";
            }
        }
        container.appendChild(templateCopy);
    }

    mazeState.setState({
        ...mazeState.state,
        mazeArr: rowBooleans.split(" "),
    });

    validateMaze();
}

// Compose dir type
type dirT = Record<string, unknown> | boolean;

class NodeClass {
    constructor(
        public posX: number,
        public posY: number,
        public dirLeft: dirT,
        public dirRight: dirT,
        public dirTop: dirT,
        public dirBottom: dirT
    ) {}
}

function getLeft(currentPosX: number, currentPosY: number, mdMaze) {
    // If it touches boundaries
    if (currentPosX === 0) {
        return false;
    }

    // If its 0 or 1
    return Number(mdMaze[currentPosY][currentPosX - 1])
        ? { childPosX: currentPosX - 1, childPosY: currentPosY }
        : false;
}

function getRight(currentPosX: number, currentPosY: number, mdMaze) {
    if (currentPosX === mdMaze[0].length - 1) {
        return false;
    }

    return Number(mdMaze[currentPosY][currentPosX + 1])
        ? { childPosX: currentPosX + 1, childPosY: currentPosY }
        : false;
}

function getTop(currentPosX: number, currentPosY: number, mdMaze) {
    if (currentPosY === 0) {
        return false;
    }

    return Number(mdMaze[currentPosY - 1][currentPosX])
        ? { childPosX: currentPosX, childPosY: currentPosY - 1 }
        : false;
}

function getBottom(currentPosX: number, currentPosY: number, mdMaze) {
    if (currentPosY === mdMaze[0].length - 1) {
        return false;
    }

    return Number(mdMaze[currentPosY + 1][currentPosX])
        ? { childPosX: currentPosX, childPosY: currentPosY + 1 }
        : false;
}

function setDirection(dfsNode) {
    if (dfsNode.dirBottom) {
        return { dir: dfsNode.dirBottom, dirStr: "bottom" };
    }
    if (dfsNode.dirLeft) {
        return { dir: dfsNode.dirLeft, dirStr: "left" };
    }
    if (dfsNode.dirRight) {
        return { dir: dfsNode.dirRight, dirStr: "right" };
    }
    if (dfsNode.dirTop) {
        return { dir: dfsNode.dirTop, dirStr: "top" };
    }
}

function validateMaze() {
    const mazeArr = mazeState.state.mazeArr;
    const mazeSize = mazeState.state.size;

    // Build multidimensional arr
    const multidimensionalMaze = [];
    for (let i = 0; i < mazeArr.length; i++) {
        multidimensionalMaze[i] = [];
        console.log(mazeArr[i]);
        for (let j = 0; j < mazeArr[i].length; j++) {
            multidimensionalMaze[i].push(Number(mazeArr[i][j]));
        }
        multidimensionalMaze.push(multidimensionalMaze[i]);
    }

    const initPosX = multidimensionalMaze[0].findIndex(
        (emptySquare, emptySquareIndex) => {
            if (emptySquare === 1) {
                return String(emptySquareIndex);
            }
        }
    );

    console.log(initPosX);

    // Initialize dfs root node
    const rootNode = new NodeClass(
        Number(initPosX),
        0,
        getLeft(Number(initPosX), 0, multidimensionalMaze),
        getRight(Number(initPosX), 0, multidimensionalMaze),
        getTop(Number(initPosX), 0, multidimensionalMaze),
        getBottom(Number(initPosX), 0, multidimensionalMaze)
    );

    const deadEnd = false;
    const depthString = [];
    const depthStack = [];

    let currentNode = rootNode;
    depthStack.push(currentNode);

    let stopInfiniteLoop = 0;

    // TODO: focus the code on the root node for historical data regarding traversals

    while (stopInfiniteLoop < 50) {
        if (
            !currentNode.dirLeft &&
            !currentNode.dirRight &&
            !currentNode.dirBottom &&
            !currentNode.dirTop
        ) {
            return (stopInfiniteLoop = 30);
        }
        let nextPath: any = setDirection(currentNode);
        stopInfiniteLoop++;

        // Is nextPath previousPath
        if (depthStack.length >= 2) {
            const previousPath = depthStack[depthStack.length - 2];
            if (
                previousPath.posX === nextPath.dir.childPosX &&
                previousPath.posY === nextPath.dir.childPosY
            ) {
                nextPath = false;
            }
        }

        if (nextPath) {
            depthString.push(nextPath.dirStr);

            currentNode[nextPath.dirStr] = new NodeClass(
                nextPath.dir.childPosX,
                nextPath.dir.childPosY,
                getLeft(
                    nextPath.dir.childPosX,
                    nextPath.dir.childPosY,
                    mazeArr
                ),
                getRight(
                    nextPath.dir.childPosX,
                    nextPath.dir.childPosY,
                    mazeArr
                ),
                getTop(nextPath.dir.childPosX, nextPath.dir.childPosY, mazeArr),
                getBottom(
                    nextPath.dir.childPosX,
                    nextPath.dir.childPosY,
                    mazeArr
                )
            );

            currentNode = currentNode[nextPath.dirStr];
            depthStack.push(currentNode);
        } else {
            depthStack.pop();
            currentNode = depthStack[depthStack.length - 1];

            let previousDepthString = depthString[depthString.length - 1];
            console.log("HERE", previousDepthString);

            previousDepthString =
                previousDepthString.charAt(0).toUpperCase() +
                previousDepthString.slice(1);

            console.log(currentNode);
            console.log(currentNode[`dir${previousDepthString}`]);

            // Been there
            currentNode[`dir${previousDepthString}`] = false;
            depthString.pop();
        }

        console.log(nextPath);
        stopInfiniteLoop++;
    }

    // Depth first search
    console.log(multidimensionalMaze);
}

initialize().addEvents();
