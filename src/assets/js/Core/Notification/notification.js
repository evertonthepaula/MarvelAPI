export default (function(){

  function checkpermission()
  {
    if (!('Notification' in window)) {
      console.log('This browser does not support system notifications');
      return false;
    }

    if((Notification.permission === 'default')){
      Notification.requestPermission();  
    }

    if((Notification.permission === 'denied')){
      return false;
    }

    return true;
  }

  function notificationMessage(title, obj)
  {
    if (checkpermission()) {
      new Notification(title,obj);
    }
  }

  return {
    check: checkpermission,
    message: notificationMessage,
  };

})();