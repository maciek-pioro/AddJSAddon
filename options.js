// Function to get items from storage
async function getItemsFromStorage() {
    let items = await browser.storage.sync.get("items");
    if (items) items = items.items;
    return items ? JSON.parse(items) : {};
}

document.addEventListener("DOMContentLoaded", async function () {
    const items = await getItemsFromStorage();
    for (const title in items) {
        console.log(`${title}: ${items[title]}`);
    }
});

document.addEventListener("DOMContentLoaded", async function () {
    const itemForm = document.getElementById("itemForm");
    const itemList = document.getElementById("itemList");
    // const clearListBtn = document.getElementById("clearListBtn");

    // Load items from storage when the page loads
    loadItemsFromStorage();

    // Handle form submission
    itemForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const titleInput = document.getElementById("titleInput");
        const contentInput = document.getElementById("contentInput");

        const title = titleInput.value;
        const content = contentInput.value;

        if (title && content) {
            addItemToList(title, content);
            saveItemToStorage(title, content);

            titleInput.value = "";
            contentInput.value = "";
        }
    });

    // Handle list item deletion
    itemList.addEventListener("click", function (e) {
        if (e.target && e.target.matches("button.delete-btn")) {
            const listItem = e.target.closest("li");
            const title = listItem.getAttribute("data-title");

            deleteItemFromList(listItem);
            deleteItemFromStorage(title);
        }
    });

    // Handle list clearing
    // clearListBtn.addEventListener("click", function () {
    //     clearList();
    //     clearStorage();
    // });

    // Function to add an item to the list
    function addItemToList(title, content) {
        const listItem = document.createElement("li");
        listItem.setAttribute("data-title", title);

        const itemContent = document.createElement("div");
        itemContent.innerHTML = `<h3>${title}</h3><p>${content}</p>`;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        listItem.appendChild(itemContent);
        listItem.appendChild(deleteBtn);
        itemList.appendChild(listItem);
    }

    // Function to delete an item from the list
    function deleteItemFromList(listItem) {
        itemList.removeChild(listItem);
    }

    // Function to clear the list
    function clearList() {
        itemList.innerHTML = "";
    }

    // Function to save an item to storage
    async function saveItemToStorage(title, content) {
        const items = await getItemsFromStorage();
        items[title] = content;
        browser.storage.sync.set({ items: JSON.stringify(items) });
    }

    // Function to delete an item from storage
    async function deleteItemFromStorage(title) {
        const items = await getItemsFromStorage();
        delete items[title];
        browser.storage.sync.set({ items: JSON.stringify(items) });
    }

    // Function to clear storage
    function clearStorage() {
        localStorage.removeItem("items");
    }



    // Function to load items from storage
    async function loadItemsFromStorage() {
        const items = await getItemsFromStorage();
        for (const title in items) {
            addItemToList(title, items[title]);
        }
    }
});
