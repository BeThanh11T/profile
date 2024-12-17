/* START: section_menu_width_banner */
$(function () {
    $('.section-menu-width-banner .slider').each(function () {
        $(this).slick({
            speed: 1000,
            dots: true,
            arrows: false,
            autoplay: true
        })
    });
    $('.section-menu-width-banner button.js-change-menu-tablet').click(function () {
        $(this).find('i').toggleClass('fa-bars').toggleClass('fa-times')
        let section = $(this).closest('.section-menu-width-banner')
        section.find('.menu-child-tablet:first').removeClass('webkit-menu-child-tablet')
        $(this).next().toggleClass('webkit-parent');
    })
    $('.section-menu-width-banner li.li-active').click(function () {
        if (window.outerWidth <= 768 && $(this).find('.listMenu_child').length) {
            let section = $(this).closest('.section-menu-width-banner') //listMenus-parent
            let child = $(this).find('.listMenu_child').html()
            section.find('.menu-child-tablet:first').html(child).addClass('webkit-menu-child-tablet')
        }
    })
    $('body').on('click', '.section-menu-width-banner li.tablet-show', function () {
        $(this).find('i').removeClass('fa-arrow-left').addClass('fa-arrow-right')
        let section = $(this).closest('.section-menu-width-banner')
        section.find('.menu-child-tablet:first').removeClass('webkit-menu-child-tablet')
    })
})
/* END: section_menu_width_banner */
const scrollToAnimation = () => {
    if($('.section-poster a.poster-a').length){
        $('.section-poster a.poster-a').filter(function() {
            return $(this).css('visibility') === 'hidden' && ($(this).offset().top <= ($(window).scrollTop() + $(window).height()));
        }).each(function () {
            $(this).addClass('animated').css({
                'visibility': 'visible',
                'animation-name': 'swing'
            })
        })
    }
    if($('.section-product-ads-layout-2 .hide_slide_section .slide-animation').length){
        $('.section-product-ads-layout-2 .hide_slide_section .slide-animation').filter(function() {
            return $(this).css('visibility') === 'hidden' && ($(this).offset().top <= ($(window).scrollTop() + $(window).height()));
        }).each(function () {
            $(this).addClass('animated').css({
                'visibility': 'visible',
                'animation-name': 'flipInX'
            })
        })
    }

    if($('.sc .section-banner .content-text').length){
        $('.sc .section-banner .content-text').each(function () {
            let height = $(this).outerHeight(), height_parent = $(this).closest('.section-banner').outerHeight()
            if(height + 20 > height_parent){
                $(this).closest('.section-banner').css('min-height', `${height + 20}px`)
            }
        })
    }
}
$(() => {
    $(window).scroll(scrollToAnimation)
    if($('.priview_live').length){
        $('.priview_live').scroll(scrollToAnimation)
    }
})
/* START: section_poster */


/* END: section_poster */


/* START: section_product_ads_layout_2 */

//flipInX
/* END: section_product_ads_layout_2 */

/* START: section-whychoice-v2-layout-2 */
$(() => {
    $('.section-whychoice-v2-layout-2 .left').each(function () {
        $(this).parent().css('min-height', $(this).outerHeight() + 'px')
    })
})
/* END: section-whychoice-v2-layout-2 */