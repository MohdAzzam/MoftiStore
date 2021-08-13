/**
 * get info by key from localstorage
 * 
 * @param {String} key 
 * @returns {null|*}
 */
export function get(key) {
    if (localStorage === null || localStorage === undefined) return null;
    let value = localStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
  /**
   * Set in local storage
   * 
   * @param {String} key 
   * @param {String} value 
   * @param {Boolean} isRaw  if isRaw true set without stringify the data else stringify the data and set it to local storage
   * @returns 
   */
  export function set(key, value, isRaw) {
    if (localStorage === null || localStorage === undefined) return null;
    if (isRaw) {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
  /**
   * Check if the key found in local storage
   * 
   * @param {String} key 
   * @returns {Boolean}
   */
  export function has(key) {
    if (localStorage === null || localStorage === undefined) return false;
    let value = localStorage.getItem(key);
    return value !== null;
  }
  /**
   * Remove the key from localstorage
   * 
   * @param {String} key 
   * 
   */
  
  export function remove(key) {
    if (localStorage === null || localStorage === undefined) return null;
    localStorage.removeItem(key);
  }
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default { get, set, has, remove };