import { pickBy, complement, isNil } from "ramda";

const filterNullishValues = object => pickBy(complement(isNil), object);

export default filterNullishValues;