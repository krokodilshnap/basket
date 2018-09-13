

# Smart Basket

Smart Basket - это бесплатный плагин, позволяющий легко и быстро реализовать корзину на вашем сайте, используя лишь JavaScript.

Прежде всего, Smart Basket создан для сайтов, на которых уже есть набор карточек товаров, имеющих такие параметры, как артикул, изображение товара, цена товара и т.д., но заказать можно только каждый товар по - отдельности, посредством отправки  формы заказа для каждого товара.

Smart Basket позволяет сформировать таблицу заказов, которую вы можете использовать в дальнейшем для отправки с помощью формы.

## Начало работы

Для использования Smart Basket в своем проекте достаточно лишь скопировать репозиторий с помощью Git Bush, использую команду ниже:

    git clone https://github.com/krokodilshnap/basket.git
Также можно скачать архив .zip из GitHub, нажав на клавишу

![enter image description here](https://lh3.googleusercontent.com/Wszy5I_B_9sVJNyeqS5lr-WhD_LkyBybpzpOQL7JfBk2T5OH-ybLrukG0fBmlkHk2rEXVz9ZHEjM)

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

| Параметр | Значение |
| -------- | -------- |
| wrapper | Селектор обертки карточки товара *(обязательно)* |
| name | Селектор обертки названия товара |
| art | Селектор обертки артикула |
| pic | Селектор обертки изображения |
| amount | Селектор `<input />` с количеством товара |
| mark | Селектор `<select>` с выбором модели товара |
| markOption | Селектор контейнера модели товара, если выбор товара реализован не через `<select>` |
| markSelectedClass | Класс для выбранной модели, при использовании параметра **markOption**. Например, "selected" |
| price | Селектор обертки цены |
| currency | Селектор обертки валютного символа |
| submitBtn | Селектор кнопки добавления в корзину |
validateByMark|Валидация выбора марки товара. Если "on", то при использовании `<select>` для выбора модели, необходимо первому `<option>` добавить атрибут `disabled`


*Элементы перехода в корзину и очистки:*

Параметр|Значение
--|--
basket|Селектор элемента для подсчета товара в корзине
clearBtn|Селектор кнопки очистки всей корзины


*Корзина заказов:*

Параметр|Значение
--|--
numberContainer|Селектор обертки нумерации позиции в корзине
picContainer|Селектор контейнера изображения
artContainer|Селектор контейнера артикула
nameContainer|Селектор контейнера названия товара
markContainer|Селектор контейнера модели товара
priceContainer|Селектор контейнера цены товара
amountContainer|Селектор контейнера количества товара
sumContainer|Селектор контейнера суммарной цены товара
removeContainer|Селектор контейнера кнопки удаления одного товара из корзины

**Инструкция по установке**

Рассмотрим установку плагина на примере страницы:

![enter image description here](https://lh3.googleusercontent.com/mo_BvEWbyPTbW9ROqCcfMI6NUcm2kttIB8AKnUb7QhJnwdeguke-WyQZcC4PVt2QXkK_CoxNtnHc)

Инициализируйте плагин на странице:

    var basket = new SmartBasket({
	    //options
    });
В качестве options укажите параметры карточки:

![enter image description here](https://lh3.googleusercontent.com/6g0HRQf99-Vli39PERidNiWnhsEiVLQfN0Ufr3bXiXZbNIkhKOTyo6laAOpwyQhYjN5pUOX9Mb33)

А также параметры для элемента подсчета количества позиций в корзине и кнопки очистки:

![enter image description here](https://lh3.googleusercontent.com/_jY0BcRZG7znwcezbebIZZxrd-ZvLxs1PacArkvOoh983OeqArU9_rtQgq9Ah873o-LBHyIAZ44W)

На странице, где будет формироваться таблица со всеми позициями в корзине, создайте разметку:

    <div  class="basket-hide empty-basket-message">
    
	    В корзине пока ничего нет
    
    </div>
    
    <table  class="basket-table basket-table-container">
    
	    <thead>
    
		    <tr>
    
			    <td>№</td>
    
			    <td>Артикул</td>
    
			    <td>Фото</td>
    
			    <td>Название</td>
    
			    <td>Марка</td>
    
			    <td>Цена</td>
    
			    <td>Количество</td>
    
			    <td>Сумма</td>
    
			    <td>Удалить</td>
    
		    </tr>
    
	    </thead>
    
	    <tbody>
    
		    <tr  class="basket-table-row basket-hide">
    
			    <td  class="number-container"></td>
    
			    <td  class="art-container"></td>
    
			    <td  class="pic-container"></td>
    
			    <td  class="name-container"></td>
    
			    <td  class="mark-container"></td>
    
			    <td  class="price-container"></td>
    
			    <td  class="amount-container"></td>
    
			    <td  class="sum-container"></td>
    
			    <td  class="remove-container">
    
				    <button  class="remove-basket-btn"  type="button">×</button>
    
			    </td>
    
		    </tr>
    
	    </tbody>
    
    </table>
    
Указанные классы являются обязательными. 
Для ячейки с классом `remove-container`наличие button не является обязательным. Если ячейка будет пустой, то, по умолчанию, при добавлении товара в корзину будет создана кнопка удаления строки.

**Некоторые особенности**

В качестве картинки товара может быть использован блок с `background-image` , либо блок, внутри которого находится `<img>`. В обоих случаях достаточно указать лишь класс этого блока.

В качестве выбора модели товара можно использовать как `<select>`, так и обычные блоки. Например, можно создать такую разметку:

    <div class="cart-model div-models">  
	    <div class="cart-model__select">  
		    <div class="cart-model__option cart-model__div selected">iPad</div>  
		    <div class="cart-model__option cart-model__div">iPad 2</div>  
		    <div class="cart-model__option cart-model__div">iPad 3</div>
		    <div class="cart-model__option cart-model__div">iPad Mini</div>
	     </div>
     </div>
     
На странице это будет выглядеть примерно так:

![enter image description here](https://lh3.googleusercontent.com/9_HNLu3mVUDrTHF9bfZuy1gyR5E0BYJrmmKGbLU6q9EQidI16HsssekL4MQyXaEDnvSl264UDBKz)

В таком случае следует использовать параметры `markOption` и `markSelectedClass`.

В случае, если суммарная стоимость товара высчитывается динамически для каждой карточки, например, при изменении количества товара, параметр `sumContainer` указывать не нужно. Финальная стоимость товара будет указана в графе "Цена".

В случае, если указан параметр validateByMark , разметка выбора модели должна быть следующей:

    <div class="cart-model">  
	    <select name="cart-model__select" id="select-model" class="cart-model__select">  
		    <option value="Выберите модель" class="cart-model__option" disabled selected>Выберите модель</option>  
		    <option value="Air 2013" class="cart-model__option">Air 2013</option>  
		    <option value="Pro 13'" class="cart-model__option">Pro 13'</option>  
		    <option value="Pro 15'" class="cart-model__option">Pro 15'</option>  
		    <option value="Air 2018" class="cart-model__option">Air 2018</option>  
	    </select>
    </div>

Как видно, первый `option ` должен быть `disabled` и `selected`. Тогда в случае, если ни одна модель не была выбрана, добавление в корзину не будет осуществлено, а `<select>` будет иметь класс `basket-error`.

