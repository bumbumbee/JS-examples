$(document).ready(function () {
    $('.navbar .login').length && $('.navbar .dropdown-toggle').addClass('hide');
    var lastScrollTop = 0;
    var map = $('#map');
    var map2 = $('.additional-map #map');
    var mSwiper = $('.mob-row');
    toggleMap();
    setMapHeight();
    addMapClass();

    // checkCookies
    localStorage.getItem('cookies') !== 'true' &&
    $('#cookies-row').addClass('show');

    // set/close cookies
    $('.cookies .close-cookies').click(function () {
        localStorage.setItem('cookies', 'true');
        $(this).closest('#cookies-row').removeClass('show');
    });


    $(window).on('scroll', function () {
        // Navbar
        var st = $(this).scrollTop();
        st > lastScrollTop ?
            $('.navbar.mob-nav').css('position', 'relative') &&
            $('.nav2').css('margin-top', '0') &&
            map.css('margin-top', '-50px') &&
            ($(window).width() >= 992 && map.css('margin-top', '-90px'))
            :
            $('.navbar.mob-nav').css('position', 'fixed') &&
            $('.nav2.desktop').css('margin-top', '90px') &&
            map.css('margin-top', '0') &&
            $('.nav2.mobile').css('margin-top', '50px');

        lastScrollTop = st;
    });

    window.onresize = function () {
        toggleMap();
        setMapHeight();
        countBoxes();
        $(window).width() < 992 && $('.modal-backdrop').addClass('desktop');
        $(window).width() >= 767 && !$(".navbar-toggler").hasClass('collapsed') &&
        $(window).scrollTop(0) &&
        $('.navbar-collapse').css('height', '100vh');
        $(".navbar-toggler").hasClass('collapsed') && $('.navbar-collapse').css('height', 'auto')
    };

    var nav = $('.navbar-collapse');
    var mobNav = $('.mobile-navigation');
    $(".navbar-toggler").click(function () {
        nav.hasClass('show') ?
            $(this).addClass('back') &&
            $('html').css('overflow-y', 'auto') &&
            mobNav.removeClass('toggle') :
            $(this).removeClass('back') &&
            $('html').css('overflow-y', 'hidden') &&
            mobNav.addClass('toggle');
    });

    // dropdowns
    $(document).on('click', '.nav2 .dropdown-menu', function (e) {
        e.stopPropagation();
    });
    $('.filter-btn').click(function () {
        $(this).parents('.dropdown').find('button.dropdown-toggle').dropdown('toggle')
    });
    // mobile filters - collapse
    $('.filter-btn').click(function () {
        $(this).parents('.collapse').collapse('toggle')
    });

    jQuery('button').click(function (e) {
        jQuery('.collapse').collapse('hide');
    });

    $('.map-toggler .toggler').click(function () {
        $(this).parents('.map-toggler').find('input[type=checkbox]').click();
        toggleMap();
    });

    $('.onoffswitch').click(function () {
        toggleMap()
    });

    $('.btn-up').click(function () {
        $(window).scrollTop(0);
    });


    var infoBtn = $('.i-btn');
    var expRow = $('.rating .main-row');
    infoBtn.click(function () {
        expRow.toggleClass('expanded');
    });


    $(".month").text(function (index, currentText) {
        return currentText.substr(0, 3);
    });

    $('.more-info .more').click(function () {
        $(this).closest('.more-info').addClass('expanded');
    });

    function toggleMap() {
        var rest = $('.landing').find('.restaurants'),
            card = rest.find('.r-single');

        if ($(window).width() < 992) {
            $('.hide').hasClass('hidden') ? map.addClass('show') && mSwiper.removeClass('invisible')
                : map.removeClass('show') && mSwiper.addClass('hidden');
        } else {
            if ($('.onoffswitch-checkbox').is(':checked')) {
                rest.removeClass('col-12').addClass('col-6');
                card.removeClass('col-3').addClass('col-6');
                map.addClass('show');
            } else {
                rest.removeClass('col-6').addClass('col-12');
                card.removeClass('col-6').addClass('col-3');
                map.removeClass('show');
            }
        }
        setMapHeight();
    }

    $('.map-hidden .btn').click(function () {
        $(this).closest('.hide').addClass('hidden');
        $(this).closest('.landing').addClass('down');
        map.addClass('show');
        mSwiper.removeClass('hidden');
    });

    // Active menu
    var url = window.location.href;
    $('.menu li').find('.active').removeClass('active');
    $('.menu li a').filter(function () {
        return this.href === url;
    }).parent().addClass('active');

    $('.rest-nav ul li').click(function () {
        $('li').removeClass("active");
        $(this).addClass("active");
    });


    $('.datepicker').datepicker({
        format: 'yyyy.mm.dd',
        language: 'lt',
        autoclose: true,
        orientation: "bottom auto",
        todayHighlight: true
    });

    var row = $('.widget .single-option'),
        collapse = $('.widget #collapse');
    row.click(function () {
        $(this).hide();
        collapse.addClass('visible');
    });

    $('.desktop .quick-info .fade .btn-white').click(function () {
        var txt = $(this).closest('.text');
        txt.hasClass('show') ? $(this).text('DAUGIAU') : $(this).text('MAŽIAU');
        txt.toggleClass('show');
    });
    $('.mobile .quick-info .fade .btn-white').click(function () {
        var txt = $(this).closest('.text');
        txt.hasClass('show') ? $(this).text('DAUGIAU INFORMACIJOS') : $(this).text('MAŽIAU INFORMACIJOS');
        txt.toggleClass('show');
    });

    var form = $('.widget form'),
        firstStep = form.find('.first-form'),
        secondStep = form.find('.second-form');

    $('.btn.next').click(function (e) {
        e.preventDefault(e);
        firstStep.addClass('hide');
        secondStep.removeClass('hide')
    });

    $('.btn.back').click(function () {
        firstStep.removeClass('hide');
        secondStep.addClass('hide')
    });

    $('.btn-wrapper button').click(function () {
        $(this).toggleClass('clicked')
    });


    $('.code-wrapper span').click(function () {
        $(this).closest('.code-wrapper').toggleClass('show')
    });

    var modal = $('.modal');
    $('.close-modal').click(function () {
        modal.modal('toggle');
    });

    $("form .dropdown-menu .dropdown-item").click(function () {
        var selText = $(this).html();
        var drop = $(this).parents('.dropdown').find('.dropdown-toggle');
        drop.html(selText);
    });

    function setMapHeight() {
        var height = $('.r-wrapper').height() + 57;
        $(window).width() >= 992 ? map.css('height', height) :
            map.css('height', '100vh')
    }

    function addMapClass() {
        !$('.desktop .nav-3').length && map.parent('div').addClass('additional-map');
        $('.lunch-main').length && map.parent('div').addClass('lunch-map');

        $('.banquet').length && $('.nav-3-results').length &&
        map.parent('div').addClass('banquet-map').removeClass('additional-map');

        $('.banquet').length && !$('.nav-3-results').length &&
        map.parent('div').addClass('banquet-map-unfiltered').removeClass('additional-map');
    }

    // attachments
    var empty = $('.file.empty'),
        arr = [],
        count = arr.length;
    $('#file-upload').change(function () {
        if (this.value) {
            var file = $('#file-upload')[0].files[0].name;
            var div = document.createElement("div");
            div.classList.add('file');
            div.innerHTML = file;
            var span = document.createElement("span");
            span.innerHTML = "+";
            div.appendChild(span);
            empty.css('display', 'none');
            document.getElementById("attached").appendChild(div);
            arr.push(div);
            count++
        }
    });
    $(document).on('click', '.file span', function () {
        $(this).closest('.file').remove();
        arr.splice(-1, 1);
        count--;
        !count && empty.css('display', 'block');
    });


    // count checked
    var selected = 0,
        box,
        boxesAm,
        msg = $('.select-info'),
        redBtn = $('.main-buttons .red'),
        yBtn = $('.main-buttons .yellow'),
        closeM = $('.message .close-msg');
    countBoxes();

    function countBoxes() {
        if ($(window).width() >= 992) {
            box = $('.desktop .b-card input[type=checkbox]')
        } else {
            box = $('.mobile .b-card input[type=checkbox]')
        }
        boxesAm = box.toArray().length;
        yBtn.length && yBtn.find('span + span').text(boxesAm);
    };

    box.click(function () {
        $(this).is(':checked') ? selected++ : selected--;
        redBtn.find('span + span').text(selected);
    });

    redBtn.click(function (e) {
        $('body').removeClass('blur');
        msg.removeClass('show');
        if (selected < 1) {
            e.preventDefault();
            e.stopPropagation();
            msg.addClass('show');
            $('body').addClass('blur');
        }
    });

    yBtn.click(function () {
        if (parseInt(redBtn.find('span + span').text()) ===
            parseInt(yBtn.find('span + span').text())) {
            box.prop('checked', false);
            selected = 0;
            redBtn.find('span + span').text(0);
        } else {
            box.prop('checked', true);
            selected = box.toArray().length;
            redBtn.find('span + span').text(selected);
        }
    });

    closeM.click(function () {
        msg.removeClass('show');
        $('body').removeClass('blur');
    });

    var filters =  $('.openFilters'),
        filterList = $('.filters'),
        closeF =  $('.filters h4 span');

    filters.click(function () {
        filterList.addClass('show');
        $('html').css('overflow-y', 'hidden')
    });
    closeF.click(function () {
        filterList.removeClass('show');
        $('html').css('overflow-y', 'visible')
    })
});

