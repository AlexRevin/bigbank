import { Dragon } from './../resolver';
import axios from 'axios';
import * as xml2js from 'xml2js';

export interface Knight {
  name: string;
  attack: number;
  armor: number;
  agility: number;
  endurance: number;
}

interface GameResponse {
  gameId: number;
  knight: Knight;
}

interface FightResponse{
  status: string;
  message: string;
}

class GameClient {  
  public gameId: number;
  public weather;

  public async getGame(): Promise<GameResponse> {
    const response = await axios.get<GameResponse>('http://www.dragonsofmugloar.com/api/game');
    this.gameId = response.data.gameId;
    delete response.data.knight.name;
    return response.data;
  }

  public async sendSolution(dragon: Dragon): Promise<FightResponse> {
    return (await axios.put<FightResponse>(
      `http://www.dragonsofmugloar.com/api/game/${this.gameId}/solution`, 
      { dragon })
    ).data;
  }
}
export default GameClient;
