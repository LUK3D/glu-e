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