function highlight(table) {
  let tbody = table.getElementsByTagName('tbody')[0];
  let collectionsTrs = tbody.getElementsByTagName('tr');
  Array.from(collectionsTrs).forEach(
    (row) => {


      let status = row.getElementsByTagName('td')[3];
      if (!status.dataset.available) {
        row.hidden = true;
      } else if (status.dataset.available === "true") {
        row.classList.add('available');
      } else if (status.dataset.available === "false") {
        row.classList.add('unavailable');
      }

      let gender = row.getElementsByTagName('td')[2];
      if (gender.textContent === 'm') {
        row.classList.add('male');
      } else if (gender.textContent === 'f') {
        row.classList.add('female');
      }

      let age = row.getElementsByTagName('td')[1];
      if (Number(age.textContent) < 18) {
        row.style.textDecoration = 'line-through';
      }

    }
  );
}
