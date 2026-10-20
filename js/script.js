// Muuttujat DOM-elementeille HTML:n ID-tunnisteiden mukaan
const productInput = document.getElementById('product-input');
const addBtn = document.getElementById('add-btn');
const saveBtn = document.getElementById('save-btn');
const wishlist = document.getElementById('wishlist');

// Uuden tuotteen lisääminen listaan
addBtn.addEventListener('click', function () {
    const text = productInput.value.trim();

    // Tarkistetaan, että kenttä ei ole tyhjä (kuten kurssin lomakkeessa)
    if (text === '') {
        alert('Kirjoita tuotteen nimi!');
        return;
    }

    // 1. Luodaan uusi li-elementti
    const li = document.createElement('li');
    li.className = 'wishlist-item';

    // 2. Luodaan vasen puoli (checkbox ja tekstikenttä)
    const itemLeft = document.createElement('div');
    itemLeft.className = 'item-left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const span = document.createElement('span');
    span.className = 'item-text';
    span.textContent = text;

    // Checkboxin toiminnallisuus (yliviivaus kun valittu)
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            span.classList.add('completed');
        } else {
            span.classList.remove('completed');
        }
    });

    itemLeft.append(checkbox, span);

    // 3. Luodaan oikea puoli (napit)
    const itemButtons = document.createElement('div');
    itemButtons.className = 'item-buttons';

    // Poista kohde -nappi
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-action btn-delete-selected';
    deleteBtn.textContent = 'Poista kohde';

    deleteBtn.addEventListener('click', function () {
        li.remove(); // Poistaa tämän kyseisen rivin suoraan listasta
    });

    // Tyhjennä kaikki ostetut -nappi (tässä esimerkissä poistaa kyseisen, jos halutaan pitää rakenteet simppelinä)
    const clearBoughtBtn = document.createElement('button');
    clearBoughtBtn.className = 'btn-action btn-clear-bought';
    clearBoughtBtn.textContent = 'Tyhjennä';

    clearBoughtBtn.addEventListener('click', function () {
        if (checkbox.checked) {
            li.remove();
        } else {
            alert('Kohdetta ei ole merkitty ostetuksi!');
        }
    });

    itemButtons.append(deleteBtn, clearBoughtBtn);

    // 4. Yhdistetään kaikki osat li-elementtiin
    li.append(itemLeft, itemButtons);

    // 5. Lisätään valmis li-elementti wishlist-listaan
    wishlist.append(li);

    // Tyhjennetään syötekenttä
    productInput.value = '';
});

// Enter-näppäimen tuki lisäykselle
productInput.value = '';
productInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});

// Tallenna-painike (kurssin tyyliin tehty ilmoitus tai simulaatio, koska muistia ei käytetä)
saveBtn.addEventListener('click', function () {
    alert('Muutokset tallennettu!');
});