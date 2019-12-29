/* eslint-disable */
const ATOMIC_DATA_TYPE = ['string', 'number', 'function', 'boolean', 'undefined'],
  cloneObject = (arg, purpose = 'clone') => {
    if ((ATOMIC_DATA_TYPE.indexOf(typeof arg) > -1) || arg === null) {
      return arg;
    }

    if (Array.isArray(arg)) {
      let i,
        len,
        arr = [];

      for (i = 0, len = arg.length; i < len; i++) {
        arr.push(cloneObject(arg[i], purpose));
      }

      return arr;
    } else if (typeof arg === 'object') {
      let cloneObj = {},
        key;

      for (key in arg) {
        if (key === 'data') {
          if (arg[key] && arg[key]._dataStore) {
            cloneObj[key] = (purpose === 'clone') ? arg[key] : '-'
          } else {
            cloneObj[key] = cloneObject(arg[key], purpose);
          }
        } else {
          cloneObj[key] = cloneObject(arg[key], purpose);
        }
      }

      return cloneObj;
    }
  };

export {
  cloneObject
};
