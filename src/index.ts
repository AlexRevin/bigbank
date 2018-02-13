import { GameClient, WeatherClient } from './clients';
import { trainDragon } from './resolver';

const play = async (): Promise<string> => {
  const gameClient = new GameClient();
  const gameData = await gameClient.getGame();

  const weatherClient = new WeatherClient(gameData.gameId);
  const weather = await weatherClient.getWeather();

  const dragon = trainDragon(gameData.knight, weather);
  const fight = await gameClient.sendSolution(dragon);
  return fight.status;
};

Promise.all([...Array(100)].map(play)).then((codes) => {
  console.log('played enough', codes.reduce( 
    (sum, n) => {
      sum[n] ? sum[n] += 1 : sum[n] = 1;
      return sum;
    }, 
    {}));
});

