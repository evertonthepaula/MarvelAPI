import Characters from '../../services/Marvel/MarvelCharacters';
import searchBox from '../../widgets/searchBox/searchBox';
import charactersTable from '../templates/charactersTable';
import pageNav from '../../widgets/PageNav/pageNav';
import searching from '../templates/searching';
import sessionStorage from '../../Core/Storages/session';

export default (function(){
  const appContainer = document.getElementById('mainContent');
  const charactersLimit = 10;
  let charactersContainer; 

  function bind()
  {
    appContainer.innerHTML = searching.create();
    template();
  }

  function template()
  {
    let offset;
    
    (!(offset = sessionStorage.getStorage('currentOffset')))? offset = 0 : offset;

    Characters
      .load(charactersLimit, offset)
      .then(() => {
        appContainer.innerHTML = htmlView();
        setCharactersContainer();
      });
  }

  function htmlView()
  {
    return `
      <div class="character-searchBox">
        ${setSearchBox()}
      </div>
      
      <div id="charactersContainer">
        ${setCharactersTable(Characters.sources)}
      </div>
      
      <div class="home-pagination">
        ${setPageNav(Characters.total)}
      </div>
    `;
  }

  function setSearchBox()
  {
    searchBox.config.inputCallback = findCharacters;
    return searchBox.create();
  }

  function findCharacters(name)
  {
    if(!name){
      return bind();
    }

    document.getElementById('paginationBox').style.display = 'none';
   
    Characters
      .find(name)
      .then(() => {
        charactersContainer.innerHTML = setCharactersTable(Characters.sources);
      });
  }

  function setCharactersTable(characters)
  {
    return charactersTable.create(characters);
  }

  function setPageNav(total)
  {
    pageNav.config.total = total;
    pageNav.config.maxNavs =  (window.innerWidth > 360)? 6 : 3;
    pageNav.config.maxPerPage = charactersLimit;

    pageNav.config.nextCallback = loadCharacters;
    pageNav.config.prevCallback = loadCharacters;
    pageNav.config.pageCallback = loadCharacters;

    return pageNav.create();
  }

  function loadCharacters(limit,offset)
  {
    charactersContainer.innerHTML = searching.create();

    Characters
      .load(limit,offset)
      .then(() => {
        charactersContainer.innerHTML = setCharactersTable(Characters.sources);
      });
  }

  function setCharactersContainer()
  {
    charactersContainer = appContainer.querySelector('#charactersContainer'); 
  }

  return {
    create: bind,
  };

})();
