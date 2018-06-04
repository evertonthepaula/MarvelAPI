import notifications from '../../Core/Notification/notification';

export default (function(){

  bind();

  function bind()
  {
    window.addEventListener('load', function() {
      window.addEventListener('offline',() => message('OFFLINE'), false);
      window.addEventListener('online', () => message('ONLINE'), false);
    });
  }
  
  function message(status)
  {
    return notifications.message('Internet is now:', {body:status});
  }

})();
