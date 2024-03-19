import _ from "lodash";

const myArray = [1, 2, 3, 4];
// let sum = myArray.reduce((prev, curr) => {
//   return prev + curr;
// });
let sum = _.sum(myArray);
console.log(sum);
