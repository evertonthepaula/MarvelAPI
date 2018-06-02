import view from '../../Core/View/view';
import sessionStorage from '../../storages/session';

export default (function(){

  const LocalprivateKey = process.env['PRIVATE_KEY'];
  const LocalpublicKey = process.env['PUBLIC_KEY'];
  const SessionprivateKey = sessionStorage.getStorage('PRIVATE_KEY');
  const SessionpublicKey = sessionStorage.getStorage('PUBLIC_KEY');

  if (LocalpublicKey && LocalprivateKey) {
    return true;
  }

  if (SessionpublicKey && SessionprivateKey) {
    return true;
  }

  view.load('apiKeys');

  return false;

});
