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
        $('.overlay, #consultation, .modal-main' ).fadeIn();
    });

    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #order, #thanks, .modal-main').fadeOut('slow');
    });

    $('.overlay').on('click', function(){
        $('.overlay, #consultation, #order, #thanks, .modal-main').fadeOut('slow');
    });


    $('.button_mini').each(function(i){
        $(this).on('click', function(){
            $('#order .modal__descr').text($('.catalog-item__subheader').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    // valid

    function validForm(form){
        $(form).validate({
            rules:{
                name: "required",
                phone: "required",
                email:{
                    required: true,
                    email: true
                }   
            },
            messages:{
                name: "Введите ваше имя!",
                phone: "Введите ваш номер телефона!",
                email:{
                    required: "Введите вашу почту!",
                    email: "Введите правильный адрес!"
                }
            }
        });
    };

    validForm('#consultation-form');
    validForm('#consultation form');
    validForm('#order form');

    // mask

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // send data to server

    $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //smooth and pageup

    $(window).scroll(function(){
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else{
            $('.pageup').fadeOut();
        }
    });

    $("a[href^=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();

});