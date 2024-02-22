import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';



dotenv.config();

const server = new ApolloServer({
   typeDefs: 
})