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

const itemsContainer = document.querySelector("#shop-items");

const itemTemplate = document.querySelector("#item-template");

const nothingFound = document.querySelector("#nothing-found");
function renderItems(arr) {
    // Сбрасываем текст "Ничего не найдено" после предыдущего поиска
    nothingFound.textContent = "";
    // И чистим контейнер с товарами на случай, если там что-то было
    itemsContainer.innerHTML = "";
    // Отрисовываем товары из переданного параметра arr
    arr.forEach((item) => {
      // Вызываем prepareShopItem для каждого товара
      // И подставляем результат в верстку
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
  
  // Вызываем функцию для отрисовки в самом начале
  // И тут же сортируем по алфавиту
  renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));
  
  // Функция для создания верстки конкретного товара
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
  
    // Возвращаем HTML-элемент
    return item;
  }
  
  // Инпут для поиска
  const searchInput = document.querySelector("#search-input");
  // Кнопка
  const searchButton = document.querySelector("#search-btn");
  
  // Функция для поиска по товарам (сбрасывает фильтры)
  function applySearch() {
    // Взяли значение инпута и "причесали" его
    // Привели к нижнему регистру, чтобы написание не мешало поиску
    const searchString = searchInput.value.trim().toLowerCase();
  
    // Нашли все товары, в title которых есть searchString
    currentState = items.filter((el) =>
      el.title.toLowerCase().includes(searchString)
    );
    // Отсортировали их по алфавиту
    currentState.sort((a, b) => sortByAlphabet(a, b));
    // Отрисовали результаты поиска
    renderItems(currentState);
    // По умолчанию сортировка "по алфавиту"
    sortControl.selectedIndex = 0;
  }
  
  // Обработчик при клике на кнопку поиска
  searchButton.addEventListener("click", applySearch);
  // Обработчик события поиска при взаимодействии с инпутом
  searchInput.addEventListener("search", applySearch);
  
  // Селект с опциями сортировки
  const sortControl = document.querySelector("#sort");
  // Обработчик события выбора опции из селекта
  sortControl.addEventListener("change", (event) => {
    // Атрибут value опции селекта, что выбрал пользователь
    const selectedOption = event.target.value;
    // В зависимости от вида сортировки упорядочиваем массив товаров
    switch (selectedOption) {
      case "expensive": {
        // Сначала дорогие
        currentState.sort((a, b) => b.price - a.price);
        break;
      }
      case "cheap": {
        // Сначала дешевые
        currentState.sort((a, b) => a.price - b.price);
        break;
      }
      case "rating": {
        // От более высокого рейтинга к более низкому
        currentState.sort((a, b) => b.rating - a.rating);
        break;
      }
      case "alphabet": {
        // По алфавиту
        currentState.sort((a, b) => sortByAlphabet(a, b));
        break;
      }
    }
    // Массив упорядочили — осталось его отрисовать
    renderItems(currentState);
  });
  