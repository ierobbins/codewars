function calc(expression) {

    expression = expression.replace(/\s/g, '');

    const order     = { "(": 0, "-": 1, "+": 1, "*": 2, "/": 2 };
    const output    = [];
    const operators = [];

    for(let i = 0; i < expression.length; i++) {
        if( expression[i] == parseInt(expression[i]) || expression[i] === "." ) {
            if( expression[i - 1] == parseInt(expression[i - 1]) || expression[i - 1] === "." ) {
                output[output.length - 1] += expression[i];
            } else {
                output.push(expression[i]);
            }
        } else {
            if(expression[i] === "-") {
                let x = expression[i - 1]
                if( i !== 0 && (x == parseInt(x) || x === ")") ) {
                    handleOperators(expression[i]);
                } else {
                    output.push(-1);
                    if(expression[i - 1] === "/") {
                        operators.push("*");
                    } else {
                        handleOperators("*");
                    }
                }
            } else {
                handleOperators(expression[i]);
            }
        }
    }

    function handleOperators(symbol) {
        let x = operators.length;
        if(symbol === ")") {
            for(let i = operators.length - 1; i >= 0; i--) {
                if(operators[i] === "(") {
                    operators.pop();
                    break;
                }
                if(i === 0 && operators[i] !== "(") {
                    return "Invalid Expression!";
                }
                output.push(operators.pop());
            }
        } else if(x === 0 || order[operators[x - 1]] < order[symbol] || operators[x - 1] === "(") {
            operators.push(symbol);
        } else {
            if(symbol === "(") {
                operators.push(symbol);
            } else {
                output.push(operators.pop());
                operators.push(symbol);
            }
        }
    }

    function compute() {
        if(output === "") {return 0;}
        var newArr = [], temp = 0;
        for(var i = 0; i < output.length; i++){
  	        if(checkNum(output[i])){
  		        if(output[i].length > 1){
  			        newArr.push(parseFloat(output[i]));
      		    } else {
      			    newArr.push(parseInt(output[i]));
      		    }
      	    } else {
          		if(output[i] === "+"){
          			temp = 0;
          			temp = newArr.pop();
          			temp += newArr.pop();
          			newArr.push(temp);
          		}
          		else if(output[i] === "-"){
          			temp = 0;
          			temp -= newArr.pop();
          			temp += newArr.pop();
          			newArr.push(temp);
          		}
          		else if(output[i] === "*"){
          			temp = 0;
          			temp = newArr.pop();
          			temp *= newArr.pop();
          			newArr.push(temp);
          		}
          		else {
          			temp = 0;
          			temp = newArr.pop();
          			temp = newArr.pop() / temp;
          			newArr.push(temp);
          		}
      	    }
        }
        function checkNum(num){
          	if(num.length > 1){
          		return true;
          	}
      	    return parseInt(num) == num;
        }
        return newArr[newArr.length - 1];
    }

    while(operators.length > 0) {
        output.push(operators.pop());
    }

    return compute();

}
