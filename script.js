const items = [
    {
        title: "Нежность",
        description: "Тюльпановидные розы, орхидея",
        tags: ["vip"],
        price: 300,
        img: "./img/1.jpg",
        rating: 3.4,
    },
    {
        title: "Яркая осень",
        description: "Розы, астры, самшит",
        tags: ["vip"],
        price: 150,
        img: "./img/2.jpg",
        rating: 3.8,
    },
    {
        title: "Ранняя весна",
        description: "Розы",
        tags: ["vip"],
        price: 130,
        img: "./img/3.jpg",
        rating: 4.4,
    },
    {
        title: "Микс",
        description: "Набор ярких цветов, котрые поднимут настроение",
        tags: ["vip"],
        price: 250,
        img: "./img/4.jpg",
        rating: 4.0,
    },
    {
        title: "Мило",
        description: "В состав входит нежность",
        tags: ["vip"],
        price: 400,
        img: "./img/5.jpg",
        rating: 5.4,
    },
    {
        title: "Яркий",
        description: "Яркий букет поднимет настроение",
        tags: ["vip"],
        price: 200,
        img: "./img/6.jpg",
        rating: 2.4,
    },
    {
        title: "Розы",
        description: "Нежно-розовый цвет",
        tags: ["vip"],
        price: 300,
        img: "./img/7.jpg",
        rating: 4.9,
    },
    {
        title: "Роскошь",
        description: "Любой день сделает праздником",
        tags: ["vip"],
        price: 150,
        img: "./img/8.jpg",
        rating: 5.3,
    },


];
  
  // Товары после применения поиска / фильтров
  // которые мы будем показывать пользователю
  let currentState = [...items];
  
  // Переменная с контейнером для товаров
  const itemsContainer = document.querySelector("#shop-items");
  // Шаблон для товара
  const itemTemplate = document.querySelector("#item-template");
  // Текст, если ничего не найдено
  const nothingFound = document.querySelector("#nothing-found");
  function prepareShopItem(shopItem) {
    // Деструктурируем свойства объекта
    const { title, description, tags, img, price, rating } = shopItem;
    // Берем за основу шаблон товара
    const item = itemTemplate.content.cloneNode(true);
    // Наполняем его информацией из объекта
    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price}P`;
  
    // Находим контейнер для рейтинга
    const ratingContainer = item.querySelector(".rating");
    // Рисуем нужное количество звездочек
    for (let i = 0; i < rating; i++) {
      const star = document.createElement("i");
      star.classList.add("fa", "fa-star");
      ratingContainer.append(star);
    }
  
    // Находим шаблон для тегов
    const tagsHolder = item.querySelector(".tags");
  
    // Отрисовываем теги для товара
    tags.forEach((tag) => {
      const element = document.createElement("span");
      element.textContent = tag;
      element.classList.add("tag");
      tagsHolder.append(element);
    });
  
  
    return item;
  }
  
 
  function renderItems(arr) {
  
    nothingFound.textContent = "";
   
    itemsContainer.innerHTML = "";
   
    arr.forEach((item) => {
     
      itemsContainer.append(prepareShopItem(item));
    });
    // Если массив товаров пустой, отображаем текст, что ничего не нашлось
    if (!arr.length) {
      nothingFound.textContent = "Ничего не найдено";
    }
  }
  
  // Функция-хелпер для сортировки товаров по алфавиту
  function sortByAlphabet(a, b) {
    // Смотрим на свойство title
    // Если title первого товара алфавитно больше второго...
    if (a.title > b.title) {
      return 1;
    }
    // Если title второго товара больше
    if (a.title < b.title) {
      return -1;
    }
    // Если они равны
    return 0;
  }
  
  
  renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));
  
 
  
  const sortControl = document.querySelector('#sort');
  sortControl.addEventListener('change', (event) => {
const selectedOption = event.target.value;
switch(selectedOption) {
    case 'expensive': {
        currentState.sort((a,b) => b.price - a.price);
        break;
    }
    case 'cheap': {
        currentState.sort((a,b) => a.price - b.price);
        break;
    }
    case 'rating': {
        currentState.sort((a,b) => b.rating - a.rating);
        break;
    }
    case 'alphabet': {
        currentState.sort((a,b) => sortByAlphabet(a, b));
        break;
    }
}
renderItems(currentState);
  });
  