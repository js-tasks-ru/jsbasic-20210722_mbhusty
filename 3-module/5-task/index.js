function getMinMax(str) {
  let strToArr = str.split(/[ ,]+/);
  let numbersArray = strToArr.filter(number => isFinite(number)).map(Number);
  return {
    min: Math.min(...numbersArray),
    max: Math.max(...numbersArray)
  };
}
