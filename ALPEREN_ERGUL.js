(() => {
  // jQuery kontrol etme ve yükleme fonksiyonu
  const ensureJQuery = (callback) => {
    if (typeof jQuery !== "undefined") {
      callback(jQuery);
    } else {
      const script = document.createElement("script");
      script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
      script.onload = () => callback(jQuery);
      document.head.appendChild(script);
    }
  };

  const isCorrectPage = () => {
    const currentUrl = window.location.href;
    const trueUrl = "https://www.e-bebek.com";

    if(currentUrl !== trueUrl){
        console.log("Yanlış Sayfa, lütfen kodu https://www.e-bebek.com adresinde çalıştırın");
        return;
    }
  }

  const init = () => {

    isCorrectPage()

    ensureJQuery(($) => {

      const section1 = document.querySelector(
        'cx-page-slot[position="Section1"]'
      );
      const section2 = document.querySelector(
        'cx-page-slot[position="Section2A"]'
      );

      if (section1 && section2) {
        buildHTML($, section2);
        buildCSS($);
        setEvents($);
        fetchProducts().then(()=>{
            loadFavoriteProducts();
            startCarousel()
        })
        
      } else {
        console.error(
          "Sectionlar bulunamadı, e-bebek site üzerinde değişiklik yapmış olabilir. Lütfen bu hatayı alırsanız benimle iletişime geçin"
        );
      }
    });
  };

  const buildHTML = ($, section2) => {
    const html = `
        <div class="carousel-main-section">
            <div>
                <h1 class="carousel-header">Beğenebileceğinizi düşündüklerimiz</h1>
            </div>
            
            <div class="carousel-section full-width">
                <button class="carousel-arrow carousel-arrow-left">
                    <i _ngcontent-serverapp-c197="" class="toys-icon toys-icon-arrow-left carousel-arrow-size"></i>
                </button>

                <div class="carousel-body">
                    

                
                </div>

                <button class="carousel-arrow carousel-arrow-right">
                    <i _ngcontent-serverapp-c197="" class="toys-icon toys-icon-arrow-right carousel-arrow-size"></i>
                </button>
            </div>
        </div>
        `;

    
    $(section2).before(html);
  };

  const buildCSS = () => {
    const css = `
            .carousel-main-section{
                margin-top: 20px;
                margin-bottom: 50px;
                display: flex;
                flex-direction: column;
                position: relative;
            }

            .carousel-section{
                
                display: flex;
                align-items: center;
                width: 100%;
                overflow: hidden;
            }

            .full-width{
                width: 100%;
            }

            .carousel-header{
                font-size: 24px;
                margin-left: 15px;
            }

            .carousel-body{
                margin-top: 10px;
                display: flex;
                transition: transform 0.3s ease;
            }

            .carousel-arrow {
                position: absolute;
                top: 50%;
                background: #0000;
                border: 1px solid #ddd;
                border-radius: 100%;
                width: 40px;
                height: 40px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10;
            }

            .carousel-arrow-left {
                left: -50px;
            }

            .carousel-arrow-right {
                right: -50px;
            }

            .carousel-arrow-size{
                width: 15px !important;
            }

            .carousel-card {
                background-color: white;
                min-width: 20%;
                padding: 0 12.5px;
            }

            .card-upper-content{
                background-color: white;
                width: 100%;
                border: 1px solid #f2f5f7;
                overflow: hidden;
                position: relative;
                cursor: pointer;
                border-radius: 8px;

            }

            .card-upper-content:hover {
                border: 1px solid #d1dbe0;
            }

            .card-image-parent{
                display: flex;
                justify-content: center;
            }

            .card-image {
                width: 100px;
                height: 200px;
                object-fit: cover;
            }

            .card-content {
                padding: 8px;
            }

            .card-title {
                font-size: 12px;
                color: #333;
                margin-bottom: 8px !important;
            }

            .product-name {
                font-weight: bold;
            }
        
            .card-description {
                color: #666;
                line-height: 1.4;
            }

            .carousel-star {
                color: #ff9500 !important;
                font-size: 10px;
                margin-right: 0 !important;
            }

            .star-number{
                color: #A2B1BC
            }

            .card-bottom{
                margin-top: 100px;
            }

            .card-bottom .original-price .price-container {
                font-weight: bold;
                color: #2B2F33
            }

            .original-price .price-container{
                margin: 0 !important;
            }

            .card-bottom .original-price .price-container > span:first-child {
                font-size: 20px;
            }

            .card-bottom .original-price .price-container > span:not(:first-child) {
                font-size: 14px;
            }

            .card-bottom .discount-price .discount-section {
                font-weight: bold;
                color: #2B2F33
            }

            .discount-price .discount-section{
                margin: 0 !important;
            }

            .card-bottom .discount-price .discount-section > span:first-child {
                font-size: 20px;
            }

            .card-bottom .discount-price .discount-section > span:not(:first-child) {
                font-size: 14px;
            }

            .add-button{
                position: absolute;
                right: 10px;
                bottom: 10px;
                border-radius: 100%;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                color: #fff;
                
                cursor: pointer;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.20);
            }

            .inner-add-button{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 15px;
                height: 15px;
                color: #0091d5;
                font-size: 24px;
            }

            .add-button:hover{
                background-color: #0091d5;
            }

            .add-button:hover .inner-add-button {
                color: #fff !important;
            }

            .card-best-seller{
                position: absolute;
                left: 5px;
                top: 5px;
                cursor: pointer;
            }

            .carousel-favorite{
                position: absolute;
                right: 15px;
                top: 20px;
                z-index: 5;

            }

            .carousel-favorite:hover {
                transform: scale(1.1);
                background: #fff8f0;
            }

            .heart-icon {
                font-size: 16px;
                color: #ccc;
                transition: color 0.3s ease;
                display: block;
                line-height: 1;
            }

            
            .carousel-favorite.active .heart-icon {
                color: #ff9500;
            }

            .discount-section{
                display: flex;
                align-items: center;
            }

            .no-discount-section{
                display: flex;
                align-items: flex-end;
            }

            .no-discount-section .old-price{
                color: #A2B1BC; 
                font-size: 12px;
                margin-bottom: 1px;
            }

            .discount-percent {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #00A365;
                border-radius: 35%;
                color: white;
                font-size: 11px;
                font-weight: bold;
                margin-left: 10px;
            }

            .discount-percent span{
                font-size: 14px;
                padding: 0px 5px;
            }
        `;

    if ($(".carousel-style").length === 0) {
      $("<style>").addClass("carousel-style").html(css).appendTo("head");
    }
  };

  let carouselItems = [
    
  ];

  const seperatePrice = (price) => {
    const priceString = price.toString();
    const parts = priceString.split(".");

    const integerPart = parts[0];
    const decimalPart = parts[1];

    return {
      integerPart,
      decimalPart,
    };
  };

  const createCarouselCarts = () => {
    const cardsBody = document.querySelector(".carousel-body");

    if (!cardsBody) {
      console.log("Body bulunamadı");
      return;
    }

    cardsBody.innerHTML = "";

    carouselItems.forEach((product) => {

        let priceHtml = ``;

        if(product.price === product.original_price){
            const seperatedPrice = seperatePrice(product.original_price);

            priceHtml = `
                <div class="original-price">
                    <p class="price-container">
                        <span>${seperatedPrice.integerPart}</span>
                        <span>,</span>
                        <span>${seperatedPrice.decimalPart}</span>
                        <span>TL</span>
                    </p>
                </div>
            `;
        } else {
            const seperatedOriginalPrice = seperatePrice(product.original_price);
            const seperatedPrice = seperatePrice(product.price);
            const discount = Math.round(((product.original_price - product.price) / product.original_price) * 100);

            priceHtml= `
                <div class="discount-price">
                    <div class="no-discount-section">
                        <span class="old-price"><span>${seperatedOriginalPrice.integerPart}</span>,<span>${seperatedOriginalPrice.decimalPart}</span> TL</span>
                        <div class="discount-percent">
                            <span>%${discount}</span>
                        </div>
                    </div>

                    <div class="discount-section">
                        <span>${seperatedPrice.integerPart}</span>
                        <span>,</span>
                        <span>${seperatedPrice.decimalPart}</span>
                        <span>TL</span>
                    </div>
                </div>
            
            `
            
        }

      

      const cardHtml = `
                <div class="carousel-card" id="${product.id}">
                    <div class="card-upper-content" data-product-url="${product.url}">
                        <div class="full-width card-image-parent">
                            <img src="${
                              product.img
                            }" alt="Kart 1 Fotoğraf" class="card-image">
                        </div>
                        <div class="card-content">
                            <p class="card-title"><span class="product-name">${
                              product.brand
                            }</span> - ${product.name}</p>
                            <div>
                                ${'<cx-icon class="carousel-star cx-icon fas fa-star ng-star-inserted"></cx-icon>'.repeat(
                                  6
                                )}
                                <span class="star-number">(6)</span>
                            </div>

                            <div class="card-bottom">
                                    
                                ${priceHtml}

                            </div>
                        </div>

                        <div class="add-button">
                            <div class="inner-add-button">
                                +
                            </div>
                        </div>

                        <div class="card-best-seller">
                            <i class="toys-icon toys-icon-most-seller-product ng-star-inserted"></i>
                        </div>

                        <div class= "carousel-favorite" data-product-id="${product.id}">
                            <span class="heart-icon">❤</span>
                        </div>
                    </div>
                </div>
            `;

      cardsBody.innerHTML += cardHtml;
    });
  };

    const startCarousel = () => {
        const body = document.querySelector('.carousel-body');
        const leftBtn = document.querySelector('.carousel-arrow-left');
        const rightBtn = document.querySelector('.carousel-arrow-right');
        const cards = document.querySelectorAll('.carousel-card');
    
        let currentIndex = 0;
    
        rightBtn.addEventListener('click', () => {
            if (currentIndex < cards.length - 5) {
                currentIndex++;
                body.style.transform = `translateX(-${currentIndex * 20}%)`;
            }
        });
    
        leftBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                body.style.transform = `translateX(-${currentIndex * 20}%)`;
            }
        });
    };

    const fetchProducts = async () => {

        if (localStorage.getItem('ProductList') !== null) {
            const productList = JSON.parse(localStorage.getItem('ProductList'));
            carouselItems = productList;
            createCarouselCarts();
            console.log("Veriler local storage'de bulundunğundan dolayı local storage'den çekildi");
        }else{
            try{    
                const response = await fetch('https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json');
                const products = await response.json();
            
                if(Array.isArray(products)){
                    carouselItems = products;
                    createCarouselCarts();
                    localStorage.setItem('ProductList', JSON.stringify(products));
                    console.log("Veriler local storage'de bulunmadığından dolayı URL ile çekildi ve gelen veriler local storage'e kayıt edildi");
                }
            }catch(error){
                console.log("Api Hatası", error);
            }
        }

        
    }

    
    const toggleFavorite = (productId, isFavorite) => {
        let favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    
        if (isFavorite) {
            favorites[productId] = true;
        } else {
            delete favorites[productId];
        }
    
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    
    const loadFavoriteProducts = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    
        $('.carousel-favorite').each(function() {
            const productId = $(this).data('product-id');
        
            if (favorites[productId]) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    };

    const setEvents = () => {
        
        $(document).on('click', '.card-upper-content', function(e) {
        
            if ($(e.target).closest('.carousel-favorite').length) {
                return false;
            }
        
            const productUrl = $(this).data('product-url');
        
            if (productUrl) {
                window.open(productUrl, '_blank');
            }
        });



        $(document).on('click', '.carousel-favorite', function(e) {
            e.preventDefault();
            e.stopPropagation();
    
            const $favorite = $(this);
            const productId = $favorite.data('product-id');
    
            $favorite.toggleClass('active');
            toggleFavorite(productId, $favorite.hasClass('active'));
        });

    };

  init();
})();
