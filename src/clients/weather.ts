import axios from 'axios';
import * as xml2js from 'xml2js';

export type WeatherType = 'NRM' | 'HVA' | 'T E' | 'FUNDEFINEDG' | 'SRO';

export interface WeatherResult {
  type: WeatherType;
}

interface WeatherResponse {
  report: {
    code: WeatherType[];
    message: string[];
  };
}

class Weather {
  constructor(private gameId: number) { }

  public async getWeather(): Promise<WeatherResult> {
    const response = await axios.get<{}>(
      `http://www.dragonsofmugloar.com/weather/api/report/${this.gameId}`,
    );
    return new Promise<WeatherResult>((res, rej) => {
      xml2js.parseString(response.data, (err, parsed: WeatherResponse) => {
        res({ type: parsed.report.code[0] });
      });
    });
  }
}
export default Weather;
