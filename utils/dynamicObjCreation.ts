let counter = 0;
const currentDepth = ["right", "left", "right"];
const newObject = {};

const createObj = (obj) => {
    console.log(obj);
    if (counter >= currentDepth.length) {
        return obj;
    } else {
        if (counter === 0) {
            newObject[currentDepth[counter]] = {};
            const depth = newObject[currentDepth[counter]];
            counter += 1;
            return createObj(depth);
        } else {
            obj[currentDepth[counter]] = {};
            const depth = obj[currentDepth[counter]];
            console.log(obj);
            counter += 1;
            return createObj(depth);
        }
    }
};
