function simplify(poly) {
    const expression = {};
    let value = "", minus = false, variable = "", newExp = "";
    for(let i = 0; i < poly.length; i++) {
        if(poly[i] === "-") {
            if(variable.length > 0)
                loadVar();
            minus = true;
        }
        if(poly[i] === "+") {
            if(variable.length > 0)
                loadVar();
            minus = false;
        }
        if(poly[i] == parseInt(poly[i]) || poly[i] === ".") {
            if(i !== 0){
                if(poly[i - 1] == parseInt(poly[i - 1]) || poly[i - 1] === ".") {
                    value += poly[i];
                } else {
                    value = poly[i];
                }
            } else {
                value = poly[i];
            }
        }
        if(poly[i].toLowerCase() !== poly[i].toUpperCase()) {
            if(i !== 0){
                if(poly[i - 1].toLowerCase() !== poly[i - 1].toUpperCase() && i !== 0) {
                    variable += poly[i];
                } else {
                    variable = poly[i];
                }
            } else {
                variable = poly[i];
            }
        }
    }

    function loadVar() {
        let newVar = variable.split("").sort().join("");
        let newVal = (value === "") ? 1 : parseFloat(value);
        variable = ""; value = "";
        if(expression.hasOwnProperty(newVar)) {
            if(minus) {
                expression[newVar] -= parseFloat(newVal);
            } else {
                expression[newVar] += parseFloat(newVal);
            }
        } else {
            if(minus) {
                expression[newVar] = parseFloat(newVal) * -1;
            } else {
                expression[newVar] = parseFloat(newVal);
            }
        }
    }

    function parseExp() {
        let order = mySort(Object.keys(expression));
        for(let i = 0; i < order.length; i++) {
            if(expression[order[i]] > 0) {
                if(expression[order[i]] === 1) {
                    if(i !== 0) {
                        newExp += order[i];
                    } else {
                        newExp += ("+" + order[i]);
                    }
                } else {
                    if(i !== 0){
                        newExp += ("+" + expression[order[i]] + order[i]);
                    } else {
                        newExp += (expression[order[i]] + order[i]);
                    }
                }
            } else if(expression[order[i]] < 0) {
                if(expression[order[i]] === -1) {
                    newExp += ("-" + order[i]);
                } else {
                    newExp += ("-" + expression[order[i]] + order[i]);
                }
            }
        }
        return newExp;
    }

    function mySort(arr) {
        let newArr = [];
        while(arr.length > 0) {
            let lowest = arr[0]
            for(let i = 0; i < arr.length; i++) {
                if(arr[i].length < lowest.length) {
                    lowest = arr[i];
                } else if(arr[i].length === lowest.length) {
                    if(lowest > arr[i]) {
                        lowest = arr[i];
                    }
                }
            }
            newArr.push(lowest);
            arr.splice(arr.indexOf(lowest), 1);
        }
        return newArr;
    }

    if(variable.length > 0) {
        loadVar();
    }

    return parseExp();
}
