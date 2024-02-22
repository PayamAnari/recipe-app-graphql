import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import allTypeDefs from './schemas/index.schema.js';
import allResolvers from './resolvers/index.resolver.js';
import context from './context/context.js';

dotenv.config();

const server = new ApolloServer({
  typeDefs: allTypeDefs,
  resolvers: allResolvers,
  includeStacktraceInErrorResponses: false,
  introspection: true,
});
