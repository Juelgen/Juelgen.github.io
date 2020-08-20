$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow:'<button type="button" class="slick-prev"><img src="icons/carousel/left.svg"></button>',
        nextArrow:'<button type="button" class="slick-next"><img src="icons/carousel/right.svg"></button>',
        responsive:[
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false,
                    variableWidth: true,
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__contant').removeClass('catalog__contant_active').eq($(this).index()).addClass('catalog__contant_active');
      });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(evt) {
                evt.preventDefault();
                $('.catalog-item__main-info').eq(i).toggleClass('catalog-item__main-info_active');
                $('.catalog-item__more-details').eq(i).toggleClass('catalog-item__more-details_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // modal

    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation' ).fadeIn();
    });

    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    $('.button_mini').each(function(i){
        $(this).on('click', function(){
            $('#order .modal__descr').text($('.catalog-item__subheader').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });
});