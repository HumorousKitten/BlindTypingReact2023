
export default class Server {
  constructor() {
    this.token = null;
  }

  async send(params = {}) {
    if (this.token) {
      params.token = this.token;
    }
    const query = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');
    const result = await fetch(`http://backbt/?${query}`);
    const answer = await result?.json();
    return answer.result === 'ok' ? answer.data : null;
  }

  async postSend(params = {}) {
    if (this.token) {
      params.token = this.token;
    }
    const responce = await fetch(`/api/?method=${params.method}`, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
  }

  async login(email, password) {
    const data = await this.send({ method: 'login', email, password });
    if (data) {
      document.cookie = `token=${data.token}; path=/; max-age=3600`;
    }
    return data;
  }

  async registration(login, password, email) {
    return await this.send({ method: 'registration', login, password, email });
  }

  async getLevel(level_id, sublevel) {
    return await this.send({ method: 'getLevel', level_id, sublevel });
  }

  async updateResultLevel(level_id, sublevel, token, cpm, wpm, accuracy) {
    return await this.send({
      method: 'updateResultLevel',
      level_id,
      sublevel,
      token,
      cpm,
      wpm,
      accuracy,
    });
  }

  async getUserData(token) {
    return await this.send({ method: 'getUserData', token });
  }

  async getBestResult(token){
    return await this.send({ method: 'getBestResult', token });
  }

  async getUserLevels(token){
    return await this.send({ method: 'getUserLevels', token });
  }

  readCookie(name) {
    var matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
          '=([^;]*)'
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

}
