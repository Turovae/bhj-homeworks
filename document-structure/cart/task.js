// Вопрос: почему в localStorage ключи сохраняются в рандомном порядке?

class Shop {
    constructor(cart, products) {
        this.cart = cart;
        this.products = products;

        this.registerEvents();
        this.restoreFromStorage();
    }

    registerEvents() {
        this.products.addEventListener('click', this.changeValue);
        this.products.addEventListener('click', this.addToBasket.bind(this));
        this.cart.addEventListener('click', this.deleteProduct.bind(this));
    }

    changeValue(event) {
        const productQuantityControl = event.target.closest('.product__quantity-control');
        if (!productQuantityControl) {
            return;
        }
        event.preventDefault();

        const productQuantityValue = productQuantityControl
                                        .closest('.product__quantity-controls')
                                        .querySelector('.product__quantity-value');

        let value = productQuantityValue.textContent;

        if (productQuantityControl.classList.contains('product__quantity-control_inc')) {
            value++;
            productQuantityValue.textContent = value;
        }

        if (productQuantityControl.classList.contains('product__quantity-control_dec')) {
            value--;
            productQuantityValue.textContent = value >= 0 ? value : 0;
        }
    }

    addToBasket(event) {
        const productAddButton = event.target.closest('.product__add');
        if (!productAddButton) {
            return;
        }
        event.preventDefault();

        const product = productAddButton.closest('.product');
        const productId = product.dataset.id;
        const productCount = product.querySelector('.product__quantity-value').textContent.trim();
        let isFirstAdding = true;

        let addedProduct = this.cart.querySelector(`[data-id="${productId}"]`);
        if (addedProduct) {
            let value = +addedProduct.querySelector('.cart__product-count').textContent;
            value += +productCount;
            addedProduct.querySelector('.cart__product-count').textContent = value;
            isFirstAdding = false;
        } else {
            isFirstAdding = true;
            const productImgSrc = product.querySelector('.product__image').src;

            addedProduct = this.createProductCart(productId, productCount, productImgSrc);

            this.cart.querySelector('.cart__products').appendChild(addedProduct);
        }
        this.toggleBasketVisibility();
        this.pushToStorage(addedProduct);
        this.visualizationAddProduct(product, addedProduct, isFirstAdding);

    }

    createProductCart(id, count, imageSrc) {
        const productCart = document.createElement('div');
        productCart.classList.add('cart__product');
        productCart.dataset.id = id;
        productCart.innerHTML = `
            <img class="cart__product-image" src=${imageSrc}>
            <div class="cart__product-count">${count}</div>
            <div class="cart__product-remove">&times;</div>
        `;

        return productCart;
    }

    deleteProduct(event) {
        const removeButton = event.target.closest('.cart__product-remove');
        if (!removeButton) {
            return;
        }

        const cartProduct = removeButton.closest('.cart__product');
        this.deleteFromStorage(cartProduct);
        cartProduct.remove();
        this.toggleBasketVisibility();
    }

    toggleBasketVisibility() {
        if (this.cart.querySelectorAll('.cart__product').length > 0) {
            this.cart.classList.remove('cart-hidden');
        } else {
            this.cart.classList.add('cart-hidden');
        }
    }

    pushToStorage(product) {
        const productId = product.dataset.id;
        const productCount = product.querySelector('.cart__product-count').textContent.trim();

        localStorage.setItem(productId, productCount);
    }

    deleteFromStorage(product) {
        localStorage.removeItem(product.dataset.id);
    }

    restoreFromStorage() {
        for (let i = 0; i < localStorage.length; i++) {
            const id = localStorage.key(i);
            const count = localStorage.getItem(id);
            const imageSrc = this.products
                .querySelector(`[data-id="${id}"]`)
                .querySelector('.product__image')
                .src;

            this.cart.querySelector('.cart__products').appendChild(this.createProductCart(id, count, imageSrc));
        }

        this.toggleBasketVisibility();
    }

    visualizationAddProduct(productFrom, productTo, isFirst) {
        const countSteps = 50;

        const startElem = productFrom.querySelector('.product__image');

        const coordElem = {
            top: startElem.getBoundingClientRect().top,
            left: startElem.getBoundingClientRect().left
        }
        const coordTo = {
            top: productTo.getBoundingClientRect().top,
            left: productTo.getBoundingClientRect().left
        }
        const steps = {
            stepTop: (coordElem.top - coordTo.top) / countSteps,
            stepLeft: (coordElem.left - coordTo.left) / countSteps
        }

        const imgElem = startElem.cloneNode();
        imgElem.style.display = 'block';
        imgElem.style.position = 'fixed';
        imgElem.style.top = coordElem.top + 'px';
        imgElem.style.left = coordElem.left + 'px';

        if (isFirst) {
            productTo.style.visibility = 'hidden';
        }

        const move = () => {
            if (coordElem.top > coordTo.top) {
                coordElem.top -= steps.stepTop;
                coordElem.left -= steps.stepLeft;

                imgElem.style.top = coordElem.top + 'px';
                imgElem.style.left = coordElem.left + 'px';

                setTimeout(move, 5);
            } else {
                imgElem.remove();
                productTo.style.visibility = 'visible';
            }
        }

        move();

        document.body.appendChild(imgElem);
        
    }
}

new Shop( document.querySelector('.cart'), document.querySelector('.products') );