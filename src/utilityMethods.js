export const setLocalStorageItem = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting data in localStorage:', error);
    }
  };
  
  // Utility method to get data from localStorage
  export const getLocalStorageItem = (key) => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error('Error getting data from localStorage:', error);
      return null;
    }
  };


   