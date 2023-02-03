
const getKeysInArray = <T>(obj: T) => {
  const result = []

  for (let key in obj) {
    result.push({key: key, value: obj[key]})
  }

  return result
};

export { getKeysInArray };
