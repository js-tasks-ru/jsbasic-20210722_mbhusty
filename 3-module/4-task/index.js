function showSalary(users, age) {
  let arUsers = users.filter(item => item.age <= age);
  let result = [];

  arUsers.map(function (item, index) {
    result[index] = [item.name, item.balance].join(', ');
  });

  return result.join('\n');
}
