function nextSmaller(n) {debugger;
    let arr = n.toString().split(''), localMax = 0;
    let temp;
    for(let i = arr.length - 2; i >= 0; i--) {
        if(arr[i] > arr[i + 1]) {
            if(i === 0 && arr[1] == 0) {
                localMax = 1;
                for(let j = 1; j < arr.length; j++) {
                    if(arr[0] > arr[j] && arr[localMax] < arr[j]) {
                        localMax = j;
                    }
                }
                if(localMax === 1) {
                    return -1;
                } else {
                    temp = arr.splice(localMax, 1);
                    arr.sort().reverse();
                    arr.unshift(temp);
                    return parseInt(arr.join(''));
                }
            } else {
                localMax = i + 1;
                for(let j = i + 1; j < arr.length; j++) {
                    if(arr[i] > arr[j] && arr[localMax] < arr[j]) {
                        localMax = j;
                    }
                }
                let leftArr = arr.slice(0, i);
                let rightArr = arr.slice(i);
                temp = arr.splice(localMax, 1);
                temp = temp[0];
                rightArr.splice(rightArr.indexOf(temp), 1);
                rightArr.sort().reverse();
                rightArr.unshift(temp);
                arr = leftArr.concat(rightArr);
                return parseInt(arr.join(''));
            }
        }
    }
    return -1;
}
