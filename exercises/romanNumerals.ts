// The JavaScript switch statement can contain return statements if it is present inside a function. The function will return the value in the switch statement and the code after the switch statement will not be executed.

// Currying

const addNumbers = (n) => (m) => n + m;

console.log(addNumbers(2)(3));

const getUnits = (romanUnitNumeral, n, counter = 0) => {
    switch (n) {
        case 1:
        case 2:
        case 3:
            while (counter < n) {
                romanUnitNumeral += "I";
                counter++;
            }
            break;
        case 4:
            romanUnitNumeral += "IV";
            break;
        case 5:
            romanUnitNumeral += "V";
            break;
        case 6:
        case 7:
        case 8:
            romanUnitNumeral = "V";
            while (counter < n - 5) {
                romanUnitNumeral += "I";
                counter++;
            }
            break;
        case 9:
            romanUnitNumeral += "IX";
    }
    return romanUnitNumeral;
};

const getZecimals = (romanUnitNumeral, n, counter = 0) => {
    if (!n) {
        return romanUnitNumeral;
    }
    switch (n) {
        case 1:
        case 2:
        case 3:
            while (counter < n) {
                romanUnitNumeral = "X" + romanUnitNumeral;
                counter++;
            }
            break;
        case 4:
            romanUnitNumeral = "XL" + romanUnitNumeral;
            break;
        case 5:
            romanUnitNumeral = "L" + romanUnitNumeral;
            break;
        case 6:
        case 7:
        case 8:
            while (counter < n - 5) {
                romanUnitNumeral = "X" + romanUnitNumeral;
                counter++;
            }
            romanUnitNumeral = "L" + romanUnitNumeral;
            break;
        case 9:
            romanUnitNumeral = "XC" + romanUnitNumeral;
    }
    return romanUnitNumeral;
};

const getHundreds = (romanUnitNumeral, n, counter = 0) => {
    if (!n) {
        return romanUnitNumeral;
    }
    switch (n) {
        case 1:
        case 2:
        case 3:
            while (counter < n) {
                romanUnitNumeral = "C" + romanUnitNumeral;
                counter++;
            }
            break;
        case 4:
            romanUnitNumeral = "CD" + romanUnitNumeral;
            break;
        case 5:
            romanUnitNumeral = "D" + romanUnitNumeral;
            break;
        case 6:
        case 7:
        case 8:
            while (counter < n - 5) {
                romanUnitNumeral = "C" + romanUnitNumeral;
                counter++;
            }
            romanUnitNumeral = "D" + romanUnitNumeral;
            break;
        case 9:
            romanUnitNumeral = "CM" + romanUnitNumeral;
    }

    return romanUnitNumeral;
};

const getThousands = (romanUnitNumeral, n, counter = 0) => {
    if (!n || n >= 4) {
        return romanUnitNumeral;
    }
    while (counter < n) {
        romanUnitNumeral = "M" + romanUnitNumeral;
        counter++;
    }

    return romanUnitNumeral;
};

const romanNumeralsConverter = (num) => {
    if (typeof num !== "number") {
        throw new Error("not a number");
    }

    if (num > 3999 || num < 1) {
        throw new Error("not within reach");
    }

    const romanUnitNumeral = "";

    // METHOD 1
    return (n1) => (n2) => (n3) => (n4) =>
        getThousands(
            getHundreds(getZecimals(getUnits(romanUnitNumeral, n1), n2), n3),
            n4
        );

    // METHOD 2
    // return (n1) => {
    //     romanUnitNumeral = getUnits(romanUnitNumeral, n1);
    //     return (n2) => {
    //         romanUnitNumeral = getZecimals(romanUnitNumeral, n2);
    //         return (n3) => {
    //             romanUnitNumeral = getHundreds(romanUnitNumeral, n3);
    //             return (n4) => {
    //                 if (n4 >= 4) {
    //                     throw new Error("bigger than 3");
    //                 }
    //                 return getThousands(romanUnitNumeral, n4);
    //             };
    //         };
    //     };
    // };
};

// Piping

function pipeNumerals(initialValue, ...args) {
    return args.reduce((accumulator, item) => item(accumulator), initialValue);
}

console.log(
    pipeNumerals(
        2,
        (n) => n + 2,
        (n) => n + 3
    )
);

console.log(romanNumeralsConverter(3227)(7)(2)(2)(3));
