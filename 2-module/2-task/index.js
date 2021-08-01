function isEmpty(obj) {
  for (let value in obj) {
    return false;
  }
  return true;
}
