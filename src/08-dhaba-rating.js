/**
 * 🍛 Highway Dhaba Rating System - Higher-Order Functions
 *
 * Highway pe dhabas ki rating system bana raha hai. Higher-order functions
 * (HOF) use karne hain — aise functions jo doosre functions ko parameter
 * mein lete hain YA return karte hain.
 *
 * Functions:
 *
 *   1. createFilter(field, operator, value)
 *      - Returns a FUNCTION that filters objects
 *      - Operators: ">", "<", ">=", "<=", "==="
 *      - e.g., createFilter("rating", ">=", 4) returns a function that
 *        takes an object and returns true if object.rating >= 4
 *      - Unknown operator => return function that always returns false
 *
 *   2. createSorter(field, order = "asc")
 *      - Returns a COMPARATOR function for Array.sort()
 *      - order "asc" => ascending, "desc" => descending
 *      - Works with both numbers and strings
 *
 *   3. createMapper(fields)
 *      - fields: array of field names, e.g., ["name", "rating"]
 *      - Returns a function that takes an object and returns a new object
 *        with ONLY the specified fields
 *      - e.g., createMapper(["name"])({name: "Dhaba", rating: 4}) => {name: "Dhaba"}
 *
 *   4. applyOperations(data, ...operations)
 *      - data: array of objects
 *      - operations: any number of functions to apply SEQUENTIALLY
 *      - Each operation takes an array and returns an array
 *      - Apply first operation to data, then second to result, etc.
 *      - Return final result
 *      - Agar data not array, return []
 *
 * Hint: HOF = functions that take functions as arguments or return functions.
 *   createFilter returns a function. applyOperations takes functions as args.
 *
 * @example
 *   const highRated = createFilter("rating", ">=", 4);
 *   highRated({ name: "Punjab Dhaba", rating: 4.5 }) // => true
 *
 *   const byRating = createSorter("rating", "desc");
 *   [{ rating: 3 }, { rating: 5 }].sort(byRating)
 *   // => [{ rating: 5 }, { rating: 3 }]
 */
export function createFilter(field, operator, value) {
  // Your code here

  const greaterThan = (obj) => {
    return obj[field] > value;
  };
  const lessThan = (obj) => {
    return obj[field] < value;
  };
  const greaterThanEqualTo = (obj) => {
    return obj[field] >= value;
  };
  const lessThanEqualTo = (obj) => {
    return obj[field] <= value;
  };
  const equals = (obj) => {
    return obj[field] === value;
  };
  const none = () => false;
  // Operators: ">", "<", ">=", "<=", "==="
  return operator === ">"
    ? greaterThan
    : operator === "<"
      ? lessThan
      : operator === ">="
        ? greaterThanEqualTo
        : operator === "<="
          ? lessThanEqualTo
          : operator === "==="
            ? equals
            : none;
}

export function createSorter(field, order = "asc") {
  return (a, b) => {
    const valA = a[field];
    const valB = b[field];

    let result;

    if (typeof valA === "number" && typeof valB === "number") {
      result = valA - valB;
    } else {
      result = String(valA).localeCompare(String(valB));
    }

    return order === "asc" ? result : -result;
  };
}

export function createMapper(fields) {
  // Your code here
  const mapper = (obj) => {
    const newObj = {};
    for (let field of fields) {
      if (!Object.hasOwn(obj, field)) return null;
      else if (Object.hasOwn(obj, field)) newObj[field] = obj[field];
    }

    return newObj;
  };
  return mapper;
}

export function applyOperations(data, ...operations) {
  // Your code here
  if (!Array.isArray(data)) return [];
  let ans = data;
  for (let operation of operations) {
    ans = operation(ans);
  }
  return ans;
}
