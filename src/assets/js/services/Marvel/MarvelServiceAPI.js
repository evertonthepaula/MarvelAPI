import config from './MarvelAPIConfig';
import http from '../Http/http';

export default class MarvelServiceAPI { 

  construct()
  {
    this.httpConfig;
  }

  get()
  {
    return http(this.httpConfig);
  }

  setHttpconfig(){
    return this.httpConfig = {
      params: {
        apikey: config.publicKey,
        ts: config.timestamp,
        hash: config.hash,
      },
    };
  }

  setSource(source)
  {
    this.httpConfig.url = source;
  }

  setLimit(limit)
  {
    this.httpConfig.params.limit = limit;
  }

  setOffset(offset)
  {
    this.httpConfig.params.offset = offset;
  }
  
  setName(name)
  {
    this.httpConfig.params.name = name;
  }

  setNameStart(name)
  {
    this.httpConfig.params.nameStartsWith = name;
  }

  setId(id)
  {
    this.httpConfig.params.id = id;
  }

  resetHttpconfig()
  {
    delete this.httpConfig.params.limit;
    delete this.httpConfig.params.offset;
    delete this.httpConfig.params.name;
    delete this.httpConfig.params.nameStartsWith;
    delete this.httpConfig.params.id;
  }
}
