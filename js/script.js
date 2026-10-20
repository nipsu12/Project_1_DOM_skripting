// Muuttujat DOM-elementeille
const productInput = document.getElementById('product-input');
const addBtn = document.getElementById('add-btn');
const saveBtn = document.getElementById('save-btn');
const wishlist = document.getElementById('wishlist');

// Uuden tuotteen lisääminen
addBtn.addEventListener('click', function () {
    const text = productInput.value.trim();

    // Kenttä uudelle tuotteelle
    if (text === '') {
        alert('Kirjoita tuotteen nimi...');
        return;
    }

    // Syötetty tuote
    const li = document.createElement('li');
    li.className = 'wishlist-item';

    // checkbox ja tuotteen nimi
    const itemLeft = document.createElement('div');
    itemLeft.className = 'item-left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const span = document.createElement('span');
    span.className = 'item-text';
    span.textContent = text;

    // Tuotteen yliviivaus, kun checkbox on valittu
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            span.classList.add('completed');
        } else {
            span.classList.remove('completed');
        }
    });

    itemLeft.append(checkbox, span);

    // Painikkeet
    const itemButtons = document.createElement('div');
    itemButtons.className = 'item-buttons';

    // Poista kohde -painike
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-action btn-delete-selected';
    deleteBtn.textContent = 'Poista kohde';

    deleteBtn.addEventListener('click', function () {
        li.remove(); // Poistaa tämän kyseisen rivin suoraan listasta
    });

    // Tyhjennä valitut -painike
    const clearBoughtBtn = document.createElement('button');
    clearBoughtBtn.className = 'btn-action btn-clear-bought';
    clearBoughtBtn.textContent = 'Poista valitut';

    clearBoughtBtn.addEventListener('click', function () {
        if (checkbox.checked) {
            li.remove();
        } else {
            alert('Kohdetta ei ole merkitty ostetuksi!');
        }
    });

    itemButtons.append(deleteBtn, clearBoughtBtn);

    // lisätään ylemmät laatikkoon
    li.append(itemLeft, itemButtons);


    wishlist.append(li);

    // syötekentän tyhjennys
    productInput.value = '';
});

// enter-näppäin ominaisuus
productInput.value = '';
productInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});

// Tallennettu -ilmoitus
saveBtn.addEventListener('click', function () {
    alert('Muutokset tallennettu!');
});