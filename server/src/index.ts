import gameRoutes from './routes/gameRoutes';
import scoresRoutes from './routes/scoresRoutes';
import createServer from './utils/createServer';

const app = createServer();

app.use('/game', gameRoutes);
app.use('/scores', scoresRoutes);

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
