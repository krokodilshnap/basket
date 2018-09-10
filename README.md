

# Smart Basket

Smart Basket - это бесплатный плагин, позволяющий легко и быстро реализовать корзину на вашем сайте, используя лишь JavaScript.

Прежде всего, Smart Basket создан для сайтов, на которых уже есть набор карточек товаров, имеющих такие параметры, как артикул, изображение товара, цена товара и т.д., но заказать можно только каждый товар по - отдельности, посредством отправки  формы заказа для каждого товара.

Smart Basket позволяет сформировать таблицу заказов, которую вы можете использовать в дальнейшем для отправки с помощью формы.

## Начало работы

Для использования Smart Basket в своем проекте достаточно лишь скопировать репозиторий с помощью Git Bush, использую команду ниже:

    git clone https://github.com/krokodilshnap/basket.git
Также можно скачать архив .zip из GitHub, нажав на клавишу![enter image description here](https://lh3.googleusercontent.com/Wszy5I_B_9sVJNyeqS5lr-WhD_LkyBybpzpOQL7JfBk2T5OH-ybLrukG0fBmlkHk2rEXVz9ZHEjM)

> Необходимо использовать файлы только из папки /dist

**Установка**

Подключите файлы к вашему проекты из папки /dist

Файл стилей для таблицы сформированных заказов:

    <link rel="stylesheet" href="smartBasket.css">
Плагин:

    <script type="text/javascript" src="smartBasket.js"></script>
## Настройка и инициализация
Основная идея работы плагина заключается в том, что на первоначальном этапе необходимо определить классы контейнеров, в которых находятся параметры ваших карточек товаров. Например, контейнеры для артикула, цены и количества товаров. 

Затем, данные полученные из контейнеров карточек помещаются в LocalStorage, откуда могут быть использованы на любой другой странице. В нашем случае, на детальной странице корзины, содержащей таблицу со всеми добавленными товарами.

Пример с использованием всех параметров плагина при инициализации:

    var basket = new SmartBasket({  
	    wrapper: '.cart',  
	    name: '.cart__name',  
	    art: '.cart-art__value',  
	    submitBtn: '.cart__submit',  
	    basket: '.basket__count',  
	    pic: '.cart__pic',  
	    amount: '.cart-count input',  
	    mark: '.cart-model__select',  
	    markOption: '.cart-model__div',  
	    markSelectedClass: 'selected',  
	    price: '.cart-price__value',  
	    currency: '.cart-price__currency',  
	    clearBtn: '.clear-basket__btn',  
	    numberContainer: '.number-container',  
	    picContainer: '.pic-container',  
	    artContainer: '.art-container',  
	    nameContainer: '.name-container',  
	    markContainer: '.mark-container',  
	    priceContainer: '.price-container',  
	    amountContainer: '.amount-container',  
	    sumContainer: '.sum-container',  
	    removeContainer: '.remove-container',  
	    validateByMark: 'on'  
    });

**Параметры**

*Карточка товара:*
|Парметр|Значение  |
|--|--|
|wrapper|Класс обертки карточки товара *(обязательно)*|
|name|Класс обертки названия товара|
|art|Класс обертки артикула|
|pic|Класс обертки изображения|
|amount|Класс `<input />` с количеством товара|
|mark|Класс `<select>` с выбором модели товара|
|markOption|Класс контейнера модели товара, если выбор товара реализован не через `<select>`|
|markSelectedClass|Класс для выбранной модели, при использовании параметра **markOption**. Например, "selected"|
|price|Класс обертки цены|
|currency|Класс обертки валютного символа|
|submitBtn|Класс кнопки добавления в корзину|


*Элементы перехода в корзину и очистки:*
|Парметр|Значение  |
|--|--|
|basket|Класс элемента для подсчета товара в корзине |
|clearBtn|Класс кнопки очистки всей корзины|


*Корзина заказов:*
|Парметр|Значение  |
|--|--|
|numberContainer|Класс обертки нумерации позиции в корзине|
|picContainer|Класс контейнера изображения|
|artContainer|Класс контейнера артикула|
|nameContainer|Класс контейнера названия товара|
|markContainer|Класс контейнера модели товара |
|priceContainer|Класс контейнера цены товара|
|amountContainer|Класс контейнера количества товара|
|sumContainer|Класс контейнера суммарной цены товара|
|removeContainer|Класс контейнера кнопки удаления одного товара из корзины|
|validateByMark|Валидация выбора марки товара. Если "on", то при использовании `<select>` для выбора модели, необходимо первому `<option>` добавить атрибут `disabled`|
