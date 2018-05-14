import Characters from '../../services/Marvel/MarvelCharacters';
import searchBox from '../../widgets/searchBox/searchBox';
import charactersTable from '../templates/charactersTable';
import pageNav from '../../widgets/PageNav/pageNav';
import searching from '../templates/searching';

export default (function(){
  const appContainer = document.getElementById('mainContent');
  const charactersLimit = 10;
  let charactersContainer; 

  function bind()
  {
    appContainer.innerHTML = searching.create();

    Characters
      .load(charactersLimit, 0)
      .then(() => {
        template();
        setCharactersContainer();
      });
  }

  function template(){
    appContainer.innerHTML = htmlView();
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
    searchBox.params.inputCallback = findCharacters;
    return searchBox.create();
  }

  function findCharacters(name)
  {
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
    pageNav.params.total = total;
    pageNav.params.maxNavs =  (window.innerWidth > 360)? 6 : 3;
    pageNav.params.maxPerPage = charactersLimit;

    pageNav.params.nextCallback = loadCharacters;
    pageNav.params.prevCallback = loadCharacters;
    pageNav.params.pageCallback = loadCharacters;

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
