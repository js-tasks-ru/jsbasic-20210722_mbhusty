function namify(users) {
  let result = [];
  users.forEach(function(item) {
    result.push(item.name);
  });
  return result;
}
