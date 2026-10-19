// Muuttujat DOM-elementeille
const productInput = document.getElementById('product-input');
const addBtn = document.getElementById('add-btn');
const saveBtn = document.getElementById('save-btn');
const wishlist = document.getElementById('wishlist');
const toast = document.getElementById('toast');

// Taulukko, johon tallennetaan tuotteet
let items = [];

// Ladataan tallennetut tiedot localStorage-muistista, kun sivu avataan
window.addEventListener('DOMContentLoaded', () => {
    const savedItems = localStorage.getItem('toiveostokset_items');
    if (savedItems) {
        items = JSON.parse(savedItems);
    } else {
        // Esimerkkituotteet, jos muisti on tyhjä (vastaa rautalankamallia)
        items = [
            { id: 1, name: 'Noise-cancelling headphones', completed: false },
            { id: 2, name: 'Reusable water bottle', completed: false },
            { id: 3, name: 'Weekend backpack', completed: false },
            { id: 4, name: 'Desk lamp', completed: false }
        ];
    }
    renderList();
});

// Toiminto listan piirtämiselle DOM:iin
function renderList() {
    wishlist.innerHTML = '';

    items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'wishlist-item';

        li.innerHTML = `
            <div class="item-left">
                <input type="checkbox" ${item.completed ? 'checked' : ''} data-id="${item.id}">
                <span class="item-text ${item.completed ? 'completed' : ''}">${escapeHtml(item.name)}</span>
            </div>
            <div class="item-buttons">
                <button class="btn-action btn-delete-selected" data-id="${item.id}">Poista kohde</button>
                <button class="btn-action btn-clear-bought" data-id="${item.id}">Tyhjennä kaikki ostetut</button>
            </div>
        `;

        wishlist.appendChild(li);
    });
}

// Uuden tuotteen lisääminen
function addItem() {
    const text = productInput.value.trim();
    if (text === '') return;

    const newItem = {
        id: Date.now(),
        name: text,
        completed: false
    };

    items.push(newItem);
    productInput.value = '';
    renderList();
}

// Painikkeiden ja ruutujen tapahtumankuuntelu listassa (Event Delegation)
wishlist.addEventListener('click', (e) => {
    const id = Number(e.target.dataset.id);

    // Valintaruudun muuttaminen (ostettu / ei ostettu)
    if (e.target.type === 'checkbox') {
        items = items.map(item => item.id === id ? { ...item, completed: e.target.checked } : item);
        renderList();
    }

    // Poista valittu tuote
    if (e.target.classList.contains('btn-delete-selected')) {
        items = items.filter(item => item.id !== id);
        renderList();
    }

    // Poista kaikki ostetut tuotteet (tai poista tämä ostettu tuote)
    if (e.target.classList.contains('btn-clear-bought')) {
        items = items.filter(item => !item.completed);
        renderList();
    }
});

// Lisää-painikkeen klikkaus ja Enter-näppäin
addBtn.addEventListener('click', addItem);
productInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addItem();
    }
});

// Muutosten tallentaminen localStorage-muistiin
saveBtn.addEventListener('click', () => {
    localStorage.setItem('toiveostokset_items', JSON.stringify(items));
    showToast();
});

// Ilmoituksen näyttäminen
function showToast() {
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 2000);
}

// Turvallisuus: Estää HTML-koodin suorittamisen tekstikentästä (XSS-suoja)
function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}