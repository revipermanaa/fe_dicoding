function getUsers(isOffline, callback) {
  // simulate network delay
  setTimeout(() => {
    const users = ["John", "Jack", "Abigail"];

    if (isOffline) {
      callback(new Error("cannot retrieve users due offline"), null);
      return;
    }

    callback(null, users);
  }, 3000);
}

function usersCallback(error, users) {
  if (error) {
    console.log("process failed:", error.message);
    return;
  }
  console.log("process success:", users);
}

getUsers(false, usersCallback); // process success: ['John', 'Jack', 'Abigail']
getUsers(true, usersCallback); // process failed: cannot retrieve users due offline

const { getUser, getWeather } = require("./utils");

const { getUser, getWeather } = require("./utils");

function getUserWeather(userId) {
  let user;

  return getUser(userId)
    .then((_user) => {
      user = _user;
      return getWeather(user.location);
    })
    .then((weather) => ({ ...user, ...weather }));
}

getUserWeather(1).then(console.log).catch(console.log);
