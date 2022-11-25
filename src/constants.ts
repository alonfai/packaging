/**
 * Seperator char between maximum weight for a package and the list of items to choose from
 */
export const INPUT_ITEM_COLON_SEPERATOR = ':';

/**
 * Start char of an item info
 */
export const INPUT_ITEM_OPEN_SYMBOL = '(';

/**
 * End char of an item info
 */
export const INPUT_ITEM_CLOSE_SYMBOL = ')';

/**
 * Input file encoding format
 */
export const INPUT_FILE_ENCODING: BufferEncoding = 'utf8';

/**
 * Valid list of currencies for item cost
 */
export const INPUT_ITEM_CURRENCY_LIST = ['€'];

/**
 * List of possible erros in input file
 */
export const ERRORS = {
  /**
   * The maximum weight for package is invalid format
   */
  INVALID_MAX_WEIGHT: 'Item max weight is not a number',
  /**
   * Filename to read from is invalid path
   */
  INVALID_FILE_PATH: 'The test file path is invalid. Inner exception:',
  /**
   * Item information in input file is incorrectly formatted
   */
  INVALID_ITEM_RECORD: 'Invalid record inside the input file',
};
