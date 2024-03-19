// const { coffeeStock, isCoffeeMachineReady } = require("./state");
import { coffeeStock, isCoffeeMachineReady } from "./state.js";

const displayStock = (stock) => {
  for (const type in stock) {
    console.log(type);
  }
};
displayStock(coffeeStock);

// const makeCoffee = (type, miligrams) => {
//   if (coffeeStock[type] >= miligrams) {
//     console.log("Kopi berhasil dibuat!");
//   } else {
//     console.log("Biji kopi habis!");
//   }
// };

// makeCoffee("robusta", 160);
console.log(coffeeStock);
console.log(isCoffeeMachineReady);

function getUserWeather(userId, callback) {
  getUser(userId, (error, user) => {
    if (error) {
      callback(error, null);
    }

    getWeather(user.location, (error, weather) => {
      if (error) {
        callback(error, null);
      }

      callback(null, { ...user, ...weather });
    });
  });
}

getUserWeather(1, (error, userWeather) => {
  if (error) {
    console.log(error);
  }

  console.log(userWeather); // { id: 1, name: 'John Doe', location: 'Jakarta', weather: 'Sunny', temperature: 30 }
});
