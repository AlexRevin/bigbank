import { WeatherResult } from './clients/weather';
import { Knight } from './clients/game';

export interface Dragon {
  scaleThickness: number;
  clawSharpness: number;
  wingStrength: number;
  fireBreath: number;
}

const skillMap: { [key: string]: keyof Dragon } = {
  attack: 'scaleThickness',
  armor: 'clawSharpness',
  agility: 'wingStrength',
  endurance: 'fireBreath',
};

export const trainDragon = (knight: Knight, weather: WeatherResult = { type: 'NRM' }): Dragon => {
  switch (weather.type) {
    case 'HVA':
      return { scaleThickness: 5, clawSharpness: 10, wingStrength: 5, fireBreath: 0 };
    case 'T E':
      return { scaleThickness: 5, clawSharpness: 5, wingStrength: 5, fireBreath: 5 };
    case 'SRO':
      return null;
    default:
      const knightSortedSkills = Object.keys(knight).reduce<[keyof Knight, number][]>(
        (sum, n) => {
          sum.push([<keyof Knight>n, knight[n]]);
          return sum;
        }, 
        [],
    ).sort((a, b) => a[1] - b[1]);

      const dragon = {
        scaleThickness: knight.attack,
        clawSharpness: knight.armor,
        wingStrength: knight.agility,
        fireBreath: knight.endurance,
      };

      const [skill, level] = knightSortedSkills.pop();
      dragon[skillMap[skill]] += 2;

      while (knightSortedSkills.length > 1) {
        const [skill, level] = knightSortedSkills.pop();
        dragon[skillMap[skill]] -= 1;
      }
      return dragon;
  }
};
