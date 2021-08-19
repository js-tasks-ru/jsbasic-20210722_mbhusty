/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = this.render(rows);
  }

  render(rows) {
    const table = document.createElement("table");
    let list = rows.reduce(function(resultList, currentRow) {
      return resultList + `
          <tr>
          <td>${currentRow.name}</td>
          <td>${currentRow.age}</td>
          <td>${currentRow.salary}</td>
          <td>${currentRow.city}</td>
          <td><button>X</button></td>
          </tr>`;
    }, '');

    table.innerHTML = `
      <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>${list}</tbody>
      </table>
    `;

    table.addEventListener("click", (event) => event.target.closest('tr').remove());
    return table;
  }
}
