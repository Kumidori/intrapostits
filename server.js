import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './data/schema';
const path = require('path');
const mongoose = require('mongoose');
let uri = 'mongodb://Kumidori:Vanessa15@ds219832.mlab.com:19832/heroku_gcn7mzhz';

const GRAPHQL_PORT = process.env.PORT || 5000;
mongoose.connect(uri);


const graphQLServer = express();
graphQLServer.use(express.static(path.join(__dirname, 'frontend/build')));
graphQLServer.use('/api', bodyParser.json(), graphqlExpress(request => ({
  schema,
  context: request
})));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/api' }));
graphQLServer.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
});
graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
