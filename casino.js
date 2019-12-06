const getRandomValue = (myArray) => myArray[Math.floor(Math.random() * myArray.length)];

const betValues = [{
  value: 1
}, {
  value: 2
}, {
  value: 3
}]
let results = [];

for (let i = 0; i < 100; i++) {
  results.push(getRandomValue([1, 2, 3]));
}

let k = 0, flag = 0;
let Break = [];

for (let i = 0; i < results.length ; i++) {
  if (k <5) {
    if ( results[i] == 3) {  
      k++;
    } else if (k==0 || flag == 0 || flag == results[i]) {
      k++;
      flag = results[i];
    } else {   
      flag = results[i];
      Break.push(k);
      k = 1;
    }
  }
  else {
    Break.push(k);
    i--;
    k = 0;
    flag=0;
  }
 
};

console.log(results);
console.log("---------------------")
console.log(Break);
console.log("---------------------")

for (let i = 0; i < Break.length ; i++) {
  console.log(results.slice(0,Break[i]));
  results.splice(0,Break[i]);
}



