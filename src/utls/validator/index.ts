/**
 *  ## validateTableName 🚀
 * The validateTableName function takes a tableName parameter of type string.
 * 
 * It uses a regular expression pattern `^[a-zA-Z][a-zA-Z0-9_]*$` to define the valid format for a table name. This pattern ensures that the table name starts with a letter (case-insensitive) and can be followed by letters, numbers, or underscores.
 * 
 * The test method of the regular expression object is used to check if the tableName matches the defined pattern.
 * 
 * The function returns a boolean value indicating whether the table name is valid (true) 
 * @param tableName the name of the table
 * @returns 
 */
export function validateTableName(tableName: string): boolean {
    // Regular expression pattern to match valid table names
    const regexPattern = /^[a-zA-Z][a-zA-Z0-9_]*$/;
  
    // Check if the table name matches the pattern
    const isValid = regexPattern.test(tableName);
  
    return isValid;
  }


  export function areObjectsEqual(obj1: any, obj2: any): boolean {
    // Get the keys of the objects
    const keys = Object.keys(obj1) as Array<keyof any>;
  
    // Iterate over the keys and compare the corresponding values
    for (const key of keys) {
      const value1 = obj1[key];
      const value2 = obj2[key];
  
      // Check if the values are not equal
      if (value1 !== value2) {
        return false;
      }
    }
  
    // All values are equal
    return true;
  }