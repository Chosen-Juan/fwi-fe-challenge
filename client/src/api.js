import axios from 'axios';
import sha1 from 'js-sha1';

import config from './config';

export class Api {
  constructor() {
    this.api = axios.create({
      baseURL: config.url,
    });
    this.imgApi = axios.create({
      baseURL: config.imgApi.url + config.imgApi.cloudName,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      params: {
        api_key: config.imgApi.apiKey
      }
    });
  }

  fetchPlayers(from) {
    return this.api.get('/players', { params: { from }});
  }

  createPlayer(player) {
    return this.api.post('/players', player);
  }

  uploadImage(file) {
    const timestamp = new Date().getTime();
    const signature = sha1(`timestamp=${timestamp}${config.imgApi.apiSecret}`);
    const formData = new FormData();
    formData.append('api_key', config.imgApi.apiKey);
    formData.append('file', file);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    return this.imgApi.post('/upload', formData);
  }
}

export default new Api(config);