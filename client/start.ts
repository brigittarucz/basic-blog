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
// type dirT = Record<string, unknown> | boolean;

// class NodeClass {
//     constructor(
//         public posX: number,
//         public posY: number,
//         public dirLeft: dirT,
//         public dirRight: dirT,
//         public dirTop: dirT,
//         public dirBottom: dirT
//     ) {}
// }

class NodeClass {
    constructor(public value, public next = null) {}
}

class QueueClass {
    constructor(public first = null, public last = null, public length = 0) {}

    enqueue(value) {
        let node = new NodeClass(value)
        if(this.length === 0) {
            this.first = node
            this.last = node
        } else {
            this.last.next = node
            this.last = node
        }
        this.length++
        console.log(this)
        return this
    }

    dequeue() {
        if(this.length === 0) {
            return null
        } 
        if (this.first === this.last) {
            this.last = null
        }
        this.first = this.first.next 
        this.length--
        console.log(this)
        return this
    }
}

class TraversalManager {
    constructor (public currentPoint, public mazeArr, public queue = new QueueClass(), public visited = [currentPoint], public validVertices = []) {}

    createValidVertices() {
        for (let i = 0; i < this.mazeArr.length; i++) {
            let currentRow = this.mazeArr[i]
            for(let j = 0; j < currentRow.length; j++) {
                if(Number(currentRow[j])) {
                    this.validVertices.push({x: j, y: i})
                }
            }
        }
    }

    static getStartingPoint(arr) {
        return arr.findIndex(
            (emptySquare, emptySquareIndex) => {
                if (emptySquare === 1) {
                    return String(emptySquareIndex);
                }
            }
        );
    }

    run() {
        this.createValidVertices()

        // Logic for checking paths
        this.getNeighborVertices()

        console.log(this.queue)
    }

    changeVertex() {
        if(this.visited.length > 1) {
            this.visited.push = this.currentPoint
        }

        this.currentPoint = this.queue.dequeue()
    }

    getTraversalStatus() {
        return this
    }

    getNeighborVertices() {
        let leftNeighbour = this.findLeft()
        leftNeighbour && this.queue.enqueue(leftNeighbour)

        let rightNeighbour = this.findRight()
        rightNeighbour && this.queue.enqueue(rightNeighbour)

        let topNeighbour = this.findTop()
        topNeighbour && this.queue.enqueue(topNeighbour)

        let bottomNeighbour = this.findBottom()
        bottomNeighbour && this.queue.enqueue(bottomNeighbour)
    }

    findLeft() {
        return this.validVertices.find(point => point.x === this.currentPoint.x-1 && point.y === this.currentPoint.y)
    }

    findRight() {
        return this.validVertices.find(point => point.x === this.currentPoint.x+1 && point.y === this.currentPoint.y)
    }

    findTop() {
        return this.validVertices.find(point => point.x === this.currentPoint.x && point.y === this.currentPoint.y - 1)
    }

    findBottom() {
        return this.validVertices.find(point => point.x === this.currentPoint.x && point.y === this.currentPoint.y + 1)
    }
}

function validateMaze() {
    const mazeArr = mazeState.state.mazeArr;
    const mazeSize = mazeState.state.size;

    // Build arr of open and closed
    const multidimensionalMaze = [];
    for (let i = 0; i < mazeArr.length; i++) {
        multidimensionalMaze[i] = [];
        for (let j = 0; j < mazeArr[i].length; j++) {
            multidimensionalMaze[i].push(Number(mazeArr[i][j]));
        }
        multidimensionalMaze.push(multidimensionalMaze[i]);
    }

    const initPosX = TraversalManager.getStartingPoint(multidimensionalMaze[0])

    const traversalManager = new TraversalManager({x: initPosX, y: 0}, mazeArr)
        
    traversalManager.run()
}

initialize().addEvents();
