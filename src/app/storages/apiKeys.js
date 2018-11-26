import sessionStorage from '../Core/Storages/session';

export default (function() {
  const LocalprivateKey = process.env['PRIVATE_KEY'];
  const LocalpublicKey = process.env['PUBLIC_KEY'];
  const SessionprivateKey = sessionStorage.getStorage('PRIVATE_KEY');
  const SessionpublicKey = sessionStorage.getStorage('PUBLIC_KEY');

  const getPublicKey = () =>
    LocalpublicKey ? LocalpublicKey : SessionpublicKey;

  const getPrivateKey = () =>
    LocalprivateKey ? LocalprivateKey : SessionprivateKey;

  return {
    getPublicKey: getPublicKey,
    getPrivateKey: getPrivateKey,
  };
})();
