const axios = require('axios');

const API_URL = 'http://localhost:3000/graphql';

const login = (input) => {
    const body = {
        query: `
        mutation {
            login(email:"nhat@gmail.com", password: "@1234") {
            token,
            user {
              id
              name
            }
          }
        }
        `
    }


    axios.post(API_URL)
}