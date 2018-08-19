function SmartBasket(options) {
    var wrapper, art, picture, name, amount, mark, price, submit, currency, basket, clearBtn;
    var data = {};
    var basketItemId = "smartBasketItem";
    var basket = document.querySelector(options.basket);
    var clearBtn = document.querySelector(options.clearBtn);


    countBasket();



    document.onclick = function(event) {
        var target = event.target;

        if (target.closest(options.wrapper)) {
            wrapper = target.closest(options.wrapper);
            art = wrapper.querySelector(options.art);
            picture = wrapper.querySelector(options.pic);
            name = wrapper.querySelector(options.name);
            amount = wrapper.querySelector(options.amount);
            mark = wrapper.querySelector(options.mark);
            price = wrapper.querySelector(options.price);
            submit = wrapper.querySelector(options.submitBtn);
            currency = wrapper.querySelector(options.currency);



            data = {
                characters: {
                    art: art.textContent,
                    name: name.textContent,
                    mark: getSelectedMark(mark),
                    price: price.innerHTML
                },
                add: {
                    picture: getPictureUrl(picture)
                },
                total: {
                    amount: parseFloat(amount.value)
                }

            };

        }

        if (target == clearBtn) {
            clearAllBasket();
            countBasket();
        }
        console.log(data)


        if (target != submit) return;

        dataToBasket();

        countBasket();



        addToBasketContainer(options);



    };


    // Получение картинки из background
    function getPictureUrl(elem) {
        var style = elem.style.backgroundImage;

        return style.replace(/(url\(|\)|")/g, '');
    }

    //Очистка всей корзины
    function clearAllBasket() {
        for (var key in localStorage) {
            if (key.indexOf(basketItemId) != -1) {
                localStorage.removeItem(key);
            }
        }

    }

    // Получение марки из селекта
    function getSelectedMark(elem) {
        for (var i = 0; i < elem.options.length; i++) {
            if (elem.options[i].selected) {
                return elem.options[i].innerHTML;
            }
        }
    }

    // Добавление всех параметров в корзину
    function dataToBasket() {
        toBasket(data);
    }

    // Возвращает количество итемов в LocalStorage
    function localStorageCount() {
        var localStorageItems = 0;

        for (var key in localStorage) {
            if (key.indexOf(basketItemId) != -1) {
                localStorageItems++;
            }
        }

        return localStorageItems;

    }

    //Подсчет количества итемов в корзине
    function countBasket() {
        basket.innerHTML = localStorageCount();
    }

    
    // Добавление объекта в LocalStorage
    function toBasket(object) {
        var str = JSON.stringify(object);

        localStorage.setItem(basketItemId + ' - ' + Math.random(10000), str);

        getUniqueItems();
    }

    //Получаем только уникальные объекты из LocalStorage, плюсуем количество и записываем обратно
    function getUniqueItems() {

        var buffer = getLocalBuffer();

        clearAllBasket();

        for (var k in buffer) {
            var str = JSON.stringify(buffer[k]);

            localStorage.setItem('' + k, str);
        }

    }

    function getLocalBuffer() {
        var buffer = {};

        for (var key in localStorage) {
            if (key.indexOf(basketItemId) != -1) {
                var itemDetails = JSON.parse(localStorage[key]);
                buffer[key] = itemDetails;
            }
        }

        for (var item in buffer) {
            var firstElem = JSON.stringify(buffer[item].characters);

            for (var subitem in buffer) {
                if (subitem == item) continue;

                var secondElem = JSON.stringify(buffer[subitem].characters);

                if (firstElem == secondElem) {
                    buffer[item].total.amount += buffer[subitem].total.amount;
                    delete buffer[subitem];
                }

            }

        }

        return buffer;
    }


    //Промежуточная функция удаления всех итемов из таблицы корзины
    //Используется при динамическом добавлении по клику
    //Не очищает localStorage
    function deleteAllItems() {
        var allItems = document.querySelectorAll('.basket-table-row');

        allItems.forEach(function(item, i) {
            if (i !== 0) {
                item.parentNode.removeChild(item);
            }
        });
    }

    //Добавление итемов в таблицу корзины
    function addToBasketContainer(options) {

        var buffer = getLocalBuffer();
        deleteAllItems();


        for (var key in buffer) {
            var basketRow = document.querySelector('.basket-table-row');

            var row = basketRow.cloneNode(true);

            var numberContainer = row.querySelector(options['numberContainer']),
                sumContainer = row.querySelector(options['sumContainer']),
                deleteContainer = row.querySelector(options['deleteContainer']);

            var data = {
                characters: {
                    art: row.querySelector(options['artContainer']),
                    name: row.querySelector(options['nameContainer']),
                    mark: row.querySelector(options['markContainer']),
                    price: row.querySelector(options['priceContainer'])
                },
                add: {
                    picture: row.querySelector(options['picContainer'])
                },
                total: {
                    amount: row.querySelector(options['amountContainer'])
                }
            };

            for (var a in buffer[key]) {
                for (var b in buffer[key][a]) {
                    data[a][b].innerHTML = buffer[key][a][b];
                }
            }

            basketRow.parentNode.appendChild(row);
        }



    }

    addToBasketContainer(options);


}

