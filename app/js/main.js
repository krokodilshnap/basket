function SmartBasket(options) {
    var wrapper, art, picture, name, amount, mark, price, submit, currency, basket;
    var data;
    var basketItemId = "smartBasketItem";
    var basket = document.querySelector(options.basket);

    countBasket();

    document.onclick = function(event) {
        if (event.target.closest(options.wrapper)) {
            wrapper = event.target.closest(options.wrapper);
            art = wrapper.querySelector(options.art);
            picture = wrapper.querySelector(options.pic);
            name = wrapper.querySelector(options.name);
            amount = wrapper.querySelector(options.amount);
            mark = wrapper.querySelector(options.mark);
            price = wrapper.querySelector(options.price);
            submit = wrapper.querySelector(options.submitBtn);
            currency = wrapper.querySelector(options.currency);

            data = {
                art: art.textContent,
                name: name.textContent
            };



        }

        if (event.target != submit) return;

        dataToBasket();

        countBasket();


    }

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
        console.log(object)
        var str = JSON.stringify(object);
        localStorage.setItem(basketItemId + ' - ' + Math.random(10000), str);
        compareObjects();
    }

    function compareObjects() {
        var buffer = {};

        for (var key in localStorage) {
            if (key.indexOf(basketItemId) != -1) {
                var itemDetails = JSON.parse(localStorage[key]);
                buffer[key] = itemDetails;
            }
        }

        for (var key in buffer) {
            for (var item in data) {
                console.log(buffer[key][item]);
            }
        }


        console.log(buffer);

    }

}