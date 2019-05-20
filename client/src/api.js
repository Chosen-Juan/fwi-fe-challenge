import axios from 'axios';

import config from './config';

export class Api {
  constructor() {
    this.api = axios.create({
      baseURL: config.url,
      params: {
        limit: 25
      }
    });
  }

  fetchPlayers(from) {
    return this.api.get('/players', { params: { from }});
  }

  createPlayer(player) {
    return this.api.post('/players', player);
  }
}

export default new Api(config);