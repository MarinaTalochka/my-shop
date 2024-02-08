function prepareShopItems(shopItems) {
    const { title, description, tags, img, rating, price } = shopItems;

    const clone = template.content.cloneNode(true);

    clone.querySelector("img").src = img;
    clone.querySelector("h1").textContent = title;
    clone.querySelector("p").textContent = description;
    clone.querySelector("span.price").textContent = `&{price}`;

    const ratingContainer = clone.guerySelector('.rating');
    for (let i = 0; i < rating; i++) {
        const star = document.createElement('i');
        star.classList.add('fa', 'fa-star');
        ratingContainer.append(star);
    }

    const tagsHolder = document.guerySelector('.tags');
    tags.forEach(tag => {
        // Создаем элемент span для каждого тега
        const span = document.createElement("span");
        span.textContent = tag;
        // Добавляем его в div с классом tags
        clone.querySelector("div.tags").appendChild(span);
    });
    // Добавляем клонированный элемент в элемент с id shop-items
    document.getElementById("shop-items").appendChild(clone);
}
