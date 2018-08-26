function SmartBasket(options) {
    var wrapper, art, picture, name, amount, mark, price, submit, currency, basket, clearBtn;
    var data = {};
    var basketItemId = "smartBasketItem";
    var basketTable = document.querySelector('.basket-table-container');
    var counter = 1;

    var basket = document.querySelector(options.basket);
    var clearBtn = document.querySelector(options.clearBtn);
    var removeBtn = document.querySelector(options.removeContainer).firstElementChild || getRemoveBtn();
    
    countBasket();
    // showEmptyMassage();

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
                    price: price.innerHTML,
                    currency: currency.innerHTML
                },
                add: {
                    picture: getPictureUrl(picture)
                },
                total: {
                    amount: parseFloat(amount.value),
                    price: getTotalPrice(price, amount),
                    remove: removeBtn.outerHTML
                }

            };

            console.log(getSelectedMark(mark));

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

    //Удаление одной строки из корзины
    function removeBasketRow(target) {
        localStorage.removeItem(target.dataset.id);
        addToBasketContainer(options);
        countBasket();
    }

    //Получение картинки товара из img


    //Сообщение "В корзине пока ничего нет"
    //basket-table-container обязательный класс для контейнера таблицы корзины
    // function showEmptyMassage() {
    //     for (var key in localStorage) {
    //
    //         if (!localStorage.hasOwnProperty(key)) continue;
    //
    //         if (key.indexOf(basketItemId) != -1) {
    //             console.log('if')
    //             basketTable.classList.remove('basket-hide');
    //
    //         } else {
    //             console.log('else')
    //             basketTable.classList.add('basket-hide');
    //         }
    //     }
    // }


    //Создание кнопки удаления на случай если пользователь не задал собственный шаблон
    function getRemoveBtn() {
            var btn = document.createElement('button');

            btn.classList.add('remove-basket-btn');
            btn.setAttribute('type', 'button');
            btn.innerHTML = '×';

            return btn;

    }

    //Получение суммарной цены
    function getTotalPrice(price, amount) {
        return parseFloat(price.innerHTML.replace(' ', '')) * parseFloat(amount.value);

    }

    //Получение картинки из background
    function getPictureUrl(elem) {
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
        var markOptions = elem.querySelectorAll(options.markOption);

        console.log(markOptions);

        if (markOptions.length != 0) {
            console.log('if')
            markOptions.forEach(function(item) {
               if (item.classList.contains(options.markSelectedClass)) {
                   console.log(item.innerHTML)
                   return item.innerHTML;
               }
            });
        } else {
            console.log('else')
            for (var i = 0; i < elem.options.length; i++) {
                if (elem.options[i].selected) {
                    return elem.options[i].innerHTML;
                }
            }
        }

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
                    buffer[item].total.price += buffer[subitem].total.price;
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

