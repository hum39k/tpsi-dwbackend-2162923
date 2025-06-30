import axios from 'axios';
//const axios = require('axios'); // legacy way

// Make a request for a user with a given ID
  axios.get('http://localhost:3000/users/5')
  .then(function (response) {
    // handle success
    console.log(response.data["firstname"]);
    console.log(response.data.firstname);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

  axios.get('http://localhost:3000/users')
  .then(function (response) {
    // handle success
    console.log(response.data.data[1].firstname);
    console.log(response.data.data[1]["firstname"]);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });