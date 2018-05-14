import MarvelServiceAPI from './MarvelServiceAPI';

class MarvelComics { 

  constructor()
  {
    this.api = new MarvelServiceAPI();
    // Implementação de um service container devolvolvia sempre o mesmo objeto em todas as classes.

    this.api.setHttpconfig();
    this.api.setSource('/comics');

    this.sources;
    this.total;
  }

  load(limit = 2, offset = 0)
  {
    return new Promise(resolve => {
      this.api.resetHttpconfig();
      this.api.setLimit(limit);
      this.api.setOffset(offset);
      this.request(resolve);
    });
  }

  get(id)
  {
    return new Promise(resolve => {
      this.api.resetHttpconfig();
      this.api.setId(id);
      this.request(resolve);
    });
  }

  request(resolve)
  {
    return this.api
      .get()
      .then((response) => {
        this.setComicsSources(response);
        this.setTotalComics(response);
        resolve(response);
      })
      .catch(error => console.log(error));
  }

  setComicsSources(response)
  {
    this.sources = response.data.data.results;
  }

  setTotalComics(response)
  {
    this.total = response.data.data.total;
  }

}

export default new MarvelComics();