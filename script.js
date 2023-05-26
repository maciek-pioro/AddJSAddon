async function getItemsFromStorage() {
    let items = await browser.storage.sync.get("items");
    if (items) items = items.items;
    return items ? JSON.parse(items) : {};
}

setTimeout(async () => {
    console.log('loaded')
    const items = await getItemsFromStorage();
    const currentURL = window.location.href;
    // console.log(xDD);
    // regex
    // console.log(items);
    for (const rgx in items) {
        // console.log(`${title}: ${items[title]}`);
        // debugger;
        const regex = new RegExp(rgx);

        // Check if the current URL matches the regular expression
        const isMatch = regex.test(currentURL);
        // debugger;
        if (isMatch) {
            // eval the code stored in items[rgs]
            eval(items[rgx]);
        }
    }
}, 0);
