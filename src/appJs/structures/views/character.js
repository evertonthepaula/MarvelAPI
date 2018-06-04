import Characters from '../../services/Marvel/MarvelCharacters';
import Comics from '../../services/Marvel/MarvelComics';
import Series from '../../services/Marvel/MarvelSeries';
import Events from '../../services/Marvel/MarvelEvents';
import Stories from '../../services/Marvel/MarvelStories';
import characterDetails from '../templates/charactersDetails';

export default (function(){
  const appContainer = document.getElementById('mainContent');
  const modal = document.getElementById('defaultModal');
  const Details = {Comics, Series ,Events, Stories};

  function bind(id)
  {
    Characters
      .get(id)
      .then(() => {
        appContainer.innerHTML = htmlView();
        characterEvents();
      });
  }

  function htmlView()
  {
    return Characters.sources.map((character) => `
      <a onclick="window.history.back();" class="link">VOLTAR</a>    

      <section id="${character.id}" class="character">
        <div class="character-background" style="background-image:url(${character.thumbnail.path}.${character.thumbnail.extension})"></div>

        <div class="character-info">
          <img src="${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}" alt="${character.name}" height="450px" width="300" class="character-info-img"/>
          
          <h2 class="title">${character.name}</h2>
          
          <p class="character-info-desc">${addDescription(character)}</p>
          
          ${addWikis(character)}
        </div>

        <div class="character-collections">
          ${addComics(character)}
          ${addEvents(character)}
          ${addSeries(character)}
          ${addStories(character)}
        </div>
      </section>
    `);
  }

  function addDescription(character)
  {
    return (character.description)? character.description : 'Nenhuma descrição disponível.';
  }

  function addWikis(character)
  {
    if (!character.urls.length) {
      return '';
    }
      
    return ` 
      <h3 class="section_head">Para conhecer mais sobre o ${character.name} acesse:</h3>
      ${character.urls.map((item) => `<a href="${item.url}" target="_blank" class="link">${item.type}</a>`).join('')}
    `;    
  }

  function addComics(character)
  {
    if (!character.comics.available){
      return '';
    }

    return `
      <h3 class="section_head">HQs</h3>
      <ul class="character-collections-list" data-collection-details="Comics">
        ${character.comics.items.map((item) => `<li data-comic-uri="${item.resourceURI}" class="character-collections-list-item link">${item.name}</li>`).join('')}
      </ul>
    `;
  }

  function addEvents(character)
  {
    if (!character.events.available){
      return '';
    }
    
    return `
      <h3 class="section_head">Eventos</h3>
      <ul class="character-collections-list" data-collection-details="Events">
        ${character.events.items.map((item) => `<li data-comic-uri="${item.resourceURI}" class="character-collections-list-item link">${item.name}</li>`).join('')}
      </ul>
    `;    
  }

  function addSeries(character)
  {
    if (!character.series.available){
      return '';
    }
    
    return `
      <h3 class="section_head">Séries</h3>
      <ul class="character-collections-list" data-collection-details="Series">
        ${character.series.items.map((item) => `<li data-comic-uri="${item.resourceURI}" class="character-collections-list-item link">${item.name}</li>`).join('')}
      </ul>
    `;
  }

  function addStories(character)
  {
    if (!character.stories.available){
      return '';
    }
    
    return `
      <h3 class="section_head">Histórias</h3>
      <ul class="character-collections-list" data-collection-details="Stories">
        ${character.stories.items.map((item) => `<li data-comic-uri="${item.resourceURI}" class="character-collections-list-item link">${item.name}</li>`).join('')}
      </ul>
    `;
  }

  function characterEvents()
  {
    modalClose();
    getDetails();
  }

  function modalClose()
  {
    modal.addEventListener('click', (e) => {
      modal.classList.toggle('active');
    });
  }

  function getDetails()
  {
    let lists = document.querySelectorAll('[data-collection-details]');

    lists.forEach((elem) => {
      elem.addEventListener('click', (e) => {
        let resource = elem.dataset.collectionDetails;
        let id = regexID(e.target.dataset.comicUri);

        Details[resource].get(id)
          .then(() => {
            showDetails(resource);
          });
      });
    });
  }

  function regexID(str)
  {
    return /(\d+$)/gi.exec(str)[0];
  }

  function showDetails(resource)
  {
    modal.innerHTML = characterDetails.create(Details[resource].sources);
    modal.classList.toggle('active');
  }

  return {
    create: bind,
  };

})();
