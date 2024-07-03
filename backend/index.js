const express = require("express");
const { ApolloServer } = require("@apollo/server");
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const cors = require("cors");

const { default: axios } = require("axios");
const { expressMiddleware } = require("@apollo/server/express4");



async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs: `
  
              type User {
            
            
              username: String
              name:String
              avatar: String
              ranking: String
              gitHub: String
              solved: Solved
            
            
            }

             type Solved {
             
               solvedProblem: String
               easySolved: String
               mediumSolved: String
               hardSolved: String
             }
            

            type Query{
             
             getUser(usernames:[String]): [User]
             
            }


              
              `,

    resolvers: {


        User: {
            solved: async (User) => 
               
             ( await axios.get(`https://alfa-leetcode-api.onrender.com/${User.username}/solved`)).data
 
            
        },


      Query: {
        getUser: async (parent, { usernames }) => {
          try {
          const users = await Promise.all(//The map function returns an array of promises because the
            // axios.get call is asynchronous. You need to wait for all promises to resolve before returning the data.
            usernames.map(async (username) => {
              const response = await axios.get(
                `https://alfa-leetcode-api.onrender.com/${username}`
              );
              return response.data;
            })
          );
          return users;
          } catch (error) {console.log(error)}
        },
      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start(); //graphql server ko start kiya

  app.use("/graphql", expressMiddleware(server)); //agr koi bhi req /graphql pe aati h , toh usko ye graphql server handle krega

  app.listen(9000, () => console.log("server started at port 9000"));
}

startServer();
