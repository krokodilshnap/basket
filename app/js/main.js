function SmartBasket(options) {
    var wrapper, art, picture, name, amount, mark, price, submit, currency, basket, clearBtn;
    var data = {};
    var basketItemId = "smartBasketItem";
    var basketTable = document.querySelector('.basket-table-container');
    var counter = 1;
    var sumDefault = "-";

    var basket = document.querySelector(options.basket);
    var clearBtn = document.querySelector(options.clearBtn);
    // var removeBtn = document.querySelector(options.removeContainer).firstElementChild || getRemoveBtn();

    countBasket();
    // showEmptyMassage();

    document.onclick = function(event) {
        var target = event.target;

        if (target.closest(options.wrapper)) {
            wrapper = target.closest(options.wrapper);
            art = wrapper.querySelector(options.art) || 0;
            picture = wrapper.querySelector(options.pic) || 0;
            name = wrapper.querySelector(options.name) || 0;
            amount = wrapper.querySelector(options.amount) || 0;
            mark = wrapper.querySelector(options.mark) || 0;
            price = wrapper.querySelector(options.price) || 0;
            submit = wrapper.querySelector(options.submitBtn) || 0;
            currency = wrapper.querySelector(options.currency) || 0;


            data = {
                characters: {
                    art: getArt(art),
                    name: name.textContent,
                    mark: getSelectedMark(mark),
                    price: price.innerHTML,
                    currency: getCurrency(currency)
                },
                add: {
                    picture: getPictureUrl(picture)
                },
                total: {
                    amount: parseFloat(amount.value),
                    price: getTotalPrice(price, amount),
                    remove: getRemoveBtn()
                }

            };

            if (target != submit) return;

            toBasket(data);

            countBasket();

            addToBasketContainer(options);

        }

        if (target == clearBtn) {
            clearAllBasket();
            countBasket();
        }

        console.log(data)

        if (target.classList.contains('remove-basket-btn')) {
            removeBasketRow(target);
        }

    };

    //Получение артикула
    function getArt(elem) {
        return elem ? elem.textContent : "-";
    }

    //Валюта
    function getCurrency(elem) {
        return elem ? elem.innerHTML : "";
    }

    //Удаление одной строки из корзины
    function removeBasketRow(target) {
        localStorage.removeItem(target.dataset.id);
        addToBasketContainer(options);
        countBasket();
    }


    //Создание кнопки удаления на случай если пользователь не задал собственный шаблон
    function getRemoveBtn() {
        var removeBtn;
        try {
            var removeBtn = document.querySelector(options.removeContainer).firstElementChild;
        } catch {


            var removeBtn = document.createElement('button');

            removeBtn.classList.add('remove-basket-btn');
            removeBtn.setAttribute('type', 'button');
            removeBtn.innerHTML = '×';

        }

        return removeBtn.outerHTML;







    }

    //Получение суммарной цены
    function getTotalPrice(price, amount) {
        var totalSum = parseFloat(price.innerHTML.replace(' ', '')) * parseFloat(amount.value);
        var returnedSum;

        if (isNaN(totalSum)) {
            returnedSum = sumDefault;
        } else {
            returnedSum = parseFloat(price.innerHTML.replace(' ', '')) * parseFloat(amount.value);
        }

        return returnedSum;
    }

    //Получение картинки из background
    function getPictureUrl(elem) {

        if (!elem) return;

        var style = elem.style.backgroundImage || elem.firstElementChild.src;

        return style.replace(/(url\(|\)|")/g, '');
    }

    //Очистка всей корзины
    function clearAllBasket() {
        for (var key in localStorage) {
            if (key.indexOf(basketItemId) != -1) {
                localStorage.removeItem(key);
            }
        }

        addToBasketContainer(options);

    }

    // Получение марки из селекта
    function getSelectedMark(elem) {
        var mark;
        if (elem) {
            var markOptions = elem.querySelectorAll(options.markOption);

            if (markOptions.length != 0) {
                markOptions.forEach(function(item) {
                    if (item.classList.contains(options.markSelectedClass)) {
                        mark = item.innerHTML;
                    }
                });
            } else {
                for (var i = 0; i < elem.options.length; i++) {
                    if (elem.options[i].selected) {
                        if (elem.options[i].hasAttribute('disabled')) {
                            mark = null;
                        } else {
                            mark = elem.options[i].innerHTML;
                        }
                    }
                }
            }
        } else {
            mark = "-";
        }

        return mark;
    }


    // Возвращает количество итемов в LocalStorage
    function localStorageCount() {
        var localStorageItems = 0;

        for (var key in localStorage) {
            if (key.indexOf(basketItemId) != -1) {
                localStorageItems++;
            }
        }

        showEmptyMessage(localStorageItems);

        return localStorageItems;

    }

    //Показ сообщения "в корзине пока ничего нет"
    function showEmptyMessage(localStorageItems) {
        var emptyMessage = document.querySelector('.empty-basket-message');

        if (localStorageItems == 0) {
            basketTable.classList.add('basket-hide');
            emptyMessage.classList.remove('basket-hide');
        } else {
            basketTable.classList.remove('basket-hide');
            emptyMessage.classList.add('basket-hide');
        }
    }

    //Подсчет количества итемов в корзине
    function countBasket() {
        basket.innerHTML = localStorageCount();
    }


    // Добавление объекта в LocalStorage
    function toBasket(object) {

        if (object['characters']['mark'] === null && options.validateByMark == "on") {
            mark.classList.add('basket-error');
            return;
        }

        var str = JSON.stringify(object);

        if (mark && mark.classList.contains('basket-error')) {
            mark.classList.remove('basket-error');
        }


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

    //Получение js объекта из объекта localStorage
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
                    if (buffer[subitem].total.price != sumDefault) {
                        buffer[item].total.price += buffer[subitem].total.price;
                    }
                    // buffer[item].total.remove = removeBtn.outerHTML;
                    delete buffer[subitem];
                }

            }

        }

        getNumber(buffer);
        return buffer;
    }


    //Номер позиции
    function getNumber(buffer) {
        var counter = 0;

        for (var key in buffer) {
            counter++;
            buffer[key].total.number = counter;
        }
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
                sumContainer = row.querySelector(options['sumContainer']);

            var data = {
                characters: {
                    art: row.querySelector(options['artContainer']),
                    name: row.querySelector(options['nameContainer']),
                    mark: row.querySelector(options['markContainer']),
                    price: row.querySelector(options['priceContainer']),
                    currency: row.querySelector(options['priceContainer'])
                },
                add: {
                    picture: row.querySelector(options['picContainer'])
                },
                total: {
                    amount: row.querySelector(options['amountContainer']),
                    price: row.querySelector(options['sumContainer']),
                    number: row.querySelector(options['numberContainer']),
                    remove: row.querySelector(options['removeContainer'])
                }
            };

            for (var a in buffer[key]) {
                for (var b in buffer[key][a]) {
                    var span = document.createElement('span');
                    span.innerHTML = buffer[key]['characters']['currency'];

                    if (!data[a][b]) continue;

                    if (b == 'picture') {
                        var div = document.createElement('div');
                        div.className = "basket-pic-wrapper";
                        div.style.backgroundImage = "url(" + buffer[key][a][b] + ")";
                        data[a][b].appendChild(div);
                        continue;
                    }

                    if (b == 'remove') {
                        data[a][b].firstElementChild.dataset.id = key;
                        continue;
                    }



                    if (b == 'currency') {
                        data[a][b].appendChild(span);

                        continue;
                    }

                    if (b == 'price' && a == 'total') {
                        data[a][b].innerHTML = buffer[key][a][b];
                        data[a][b].appendChild(span);

                        continue;
                    }

                    if (!data[a][b]) {
                        continue;
                    }

                    data[a][b].innerHTML = buffer[key][a][b];
                }
            }


            row.classList.remove('basket-hide');
            basketRow.parentNode.appendChild(row);
        }

        // showEmptyMassage();

    }

    addToBasketContainer(options);



}

