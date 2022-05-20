// THROUGH RECURSION

const totalChangeFactory = {
    quarter: 0,
    cents: 0,
    nickels: 0,
    pennies: 0,
};
const totalChange = { ...totalChangeFactory };
const coinCounter = (money: number) => {
    // Termination case
    if (typeof money !== "number") {
        return;
    }
    if (money !== 0 && String(money).split(".")[1].length > 2) {
        money = Number(money.toFixed(2));
        if (money < 0.0) {
            return;
        }
    }

    let change = money;
    if (change === 0) {
        // Base case / default
        const keyValues = Object.entries(totalChange);
        let coinCounterAnswer = "";
        for (const i in keyValues) {
            for (const j in keyValues[i]) {
                coinCounterAnswer += " " + keyValues[i][j];
            }
        }
        console.log(coinCounterAnswer);
        return coinCounterAnswer;
    } else {
        // Recursion itself
        if (change / 0.25 > 1) {
            const quarters = Math.floor(change / 0.25);
            change -= quarters * 0.25;
            totalChange.quarter = quarters;
            coinCounter(change);
        }

        if (change / 0.1 > 1) {
            const cents = Math.floor(change / 0.1);
            change -= cents * 0.1;
            totalChange.cents = cents;
            coinCounter(change);
        }

        if (change / 0.05 > 1) {
            const nickels = Math.floor(change / 0.05);
            change -= nickels * 0.05;
            totalChange.nickels = nickels;
            coinCounter(change);
        }

        if (change / 0.01 > 1) {
            const pennies = Math.floor(change / 0.01);
            change -= pennies * 0.01;
            totalChange.pennies = pennies;
            coinCounter(change);
        }
    }
};

coinCounter(4.99);

// THROUGH CLOSURE

const closureCoinCounter = () => {
    const totalChange = {
        quarter: 0,
        cents: 0,
        nickels: 0,
        pennies: 0,
    };

    const myRecursiveCoinCounter = (money: number) => {
        // Termination case
        if (typeof money !== "number") {
            return;
        }
        if (money !== 0 && String(money).split(".")[1].length > 2) {
            money = Number(money.toFixed(2));
            if (money < 0.0) {
                return;
            }
        }

        let change = money;
        if (change === 0) {
            // Base case / default
            const keyValues = Object.entries(totalChange);
            let coinCounterAnswer = "";
            for (const i in keyValues) {
                for (const j in keyValues[i]) {
                    coinCounterAnswer += " " + keyValues[i][j];
                }
            }

            return coinCounterAnswer;
        } else {
            // Recursion itself
            if (change / 0.25 > 1) {
                const quarters = Math.floor(change / 0.25);
                change -= quarters * 0.25;
                totalChange.quarter = quarters;
            }

            if (change / 0.1 > 1) {
                const cents = Math.floor(change / 0.1);
                change -= cents * 0.1;
                totalChange.cents = cents;
            }

            if (change / 0.05 > 1) {
                const nickels = Math.floor(change / 0.05);
                change -= nickels * 0.05;
                totalChange.nickels = nickels;
            }

            if (change / 0.01 > 1) {
                const pennies = Math.floor(change / 0.01);
                change -= pennies * 0.01;
                totalChange.pennies = pennies;
            }

            return myRecursiveCoinCounter(change);
        }
    };

    return myRecursiveCoinCounter;
};

closureCoinCounter()(4.99);
