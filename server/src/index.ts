import createServer from './utils/createServer';

const app = createServer();

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
