function SmartBasket(options) {
    var wrapper, art, picture, name, amount, mark, price, submit, currency, basket;
    var data;
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

        }

        data = {
            art: art.textContent,
            name: name.textContent,
        };

        if (event.target != submit) return;

        artToBasket();


    }

    function artToBasket() {
        toBasket(data);

    }

    function localStorageCount() {
        var localStorageItems = 0;

        for (var key in localStorage) {
            if (key.indexOf('smartBasketItem') != -1) {
                localStorageItems++;
            }
        }

        return localStorageItems;

    }

    function countBasket() {
        basket.innerHTML = localStorageCount();
    }



    function toBasket(object) {
        var str = JSON.stringify(object);
        localStorage.setItem('smartBasketItem - ' + Math.random(10000), str);
    }

}