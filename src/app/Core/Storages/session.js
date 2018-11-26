export default (() => {
  return {
    setStorage(key, value) {
      return sessionStorage.setItem(key, value);
    },

    getStorage(key) {
      return sessionStorage.getItem(key);
    },

    removeStorage(key) {
      return sessionStorage.removeItem(key);
    },

    clear() {
      return sessionStorage.clear();
    },
  };
})();
