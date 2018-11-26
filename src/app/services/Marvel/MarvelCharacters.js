import MarvelServiceAPI from './MarvelServiceAPI';

class MarvelCharacters {
  constructor() {
    this.api = new MarvelServiceAPI();
    // Implementação de um service container devolvolvia sempre o mesmo objeto em todas as classes

    this.api.setHttpconfig();
    this.api.setSource('/characters');

    this.sources;
    this.total;
  }

  load(limit = 2, offset = 0) {
    return new Promise(resolve => {
      this.api.resetHttpconfig();
      this.api.setLimit(limit);
      this.api.setOffset(offset);
      this.request(resolve);
    });
  }

  get(id) {
    return new Promise(resolve => {
      this.api.resetHttpconfig();
      this.api.setId(id);
      this.request(resolve);
    });
  }

  find(name, limit = 2, offset = 0) {
    return new Promise(resolve => {
      this.api.resetHttpconfig();
      this.api.setNameStart(name);
      this.api.setLimit(limit);
      this.api.setOffset(offset);
      this.request(resolve);
    });
  }

  request(resolve) {
    return this.api
      .get()
      .then(response => {
        this.setCharactersSources(response);
        this.setTotalCharacters(response);
        resolve(response);
      })
      .catch(error => console.log(error));
  }

  setCharactersSources(response) {
    this.sources = response.data.data.results;
  }

  setTotalCharacters(response) {
    this.total = response.data.data.total;
  }
}

export default new MarvelCharacters();
