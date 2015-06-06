/* Theme Name: Worthy - Free Powerful Theme by HtmlCoder
 * Author:HtmlCoder
 * Author URI:http://www.htmlcoder.me
 * Version:1.0.0
 * Created:November 2014
 * License: Creative Commons Attribution 3.0 License (https://creativecommons.org/licenses/by/3.0/)
 * File Description: Initializations of plugins 
 */

(function($) {
    $(document).ready(function() {

        $(".banner-image").backstretch('images/DSC00605.JPG');
        $(".banner-image.mylist-image").backstretch('../images/portfolio-1.jpg');

        // Fixed header
        //-----------------------------------------------
        $(window).scroll(function() {
            if (($(".header.fixed").length > 0)) {
                if (($(this).scrollTop() > 0) && ($(window).width() > 767)) {
                    $("body").addClass("fixed-header-on");
                } else {
                    $("body").removeClass("fixed-header-on");
                }
            };
        });

        $(window).load(function() {
            if (($(".header.fixed").length > 0)) {
                if (($(this).scrollTop() > 0) && ($(window).width() > 767)) {
                    $("body").addClass("fixed-header-on");
                } else {
                    $("body").removeClass("fixed-header-on");
                }
            };
        });

        //Scroll Spy
        //-----------------------------------------------
        if ($(".scrollspy").length > 0) {
            $("body").addClass("scroll-spy");
            $('body').scrollspy({
                target: '.scrollspy',
                offset: 152
            });
        }

        //Smooth Scroll
        //-----------------------------------------------
        if ($(".smooth-scroll").length > 0) {
            $('.smooth-scroll a[href*=#]:not([href=#]), a[href*=#]:not([href=#]).smooth-scroll').click(function() {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        var screenWidth = $(window).width();
                        var scrollLenght = 151;
                        if(screenWidth < 767) {
                            scrollLenght = scrollLenght - 76;//- 72;
                        }
                        $('html,body').animate({
                            scrollTop: target.offset().top - scrollLenght
                        }, 1000);
                        return false;
                    }
                }
            });
        }

        // Animations
        //-----------------------------------------------
        if (($("[data-animation-effect]").length > 0) && !Modernizr.touch) {
            $("[data-animation-effect]").each(function() {
                var $this = $(this),
                    animationEffect = $this.attr("data-animation-effect");
                if (Modernizr.mq('only all and (min-width: 768px)') && Modernizr.csstransitions) {
                    $this.appear(function() {
                        setTimeout(function() {
                            $this.addClass('animated object-visible ' + animationEffect);
                        }, 400);
                    }, {
                        accX: 0,
                        accY: -130
                    });
                } else {
                    $this.addClass('object-visible');
                }
            });
        };

        // Isotope filters
        //-----------------------------------------------
        if ($('.isotope-container').length > 0) {
            $(window).load(function() {
                $('.isotope-container').fadeIn();
                var $container = $('.isotope-container').isotope({
                    itemSelector: '.isotope-item',
                    layoutMode: 'masonry',
                    transitionDuration: '0.6s',
                    filter: "*"
                });
                // filter items on button click
                $('.filters').on('click', 'ul.nav li a', function() {
                    var filterValue = $(this).attr('data-filter');
                    $(".filters").find("li.active").removeClass("active");
                    $(this).parent().addClass("active");
                    $container.isotope({
                        filter: filterValue
                    });
                    return false;
                });
            });
        };

        //Modal
        //-----------------------------------------------
        if ($(".modal").length > 0) {
            $(".modal").each(function() {
                $(".modal").prependTo("body");
            });
        }

        /*$('body').css('overflow','hidden');
        $('body').css('position','fixed');
*/
        //Buddy


        $("#submit_travel").on('click touchstart', function(e) {
            /*var kakaoID = $("#kakaoID");
            if(!kakaoID.val()) {
                console.log(" This field is required");
                // Stop submission of the form
                e.preventDefault();
            } else {
                console.log(" Good! ");
                addNewTravel();
            }*/
            //addNewTravel();
            
        });

        $("#travel_type").on('click touchstart',chooseTravelType);
        $("#newTravelBtn").on('click touchend',showTravelForm);

        $('.datepicker-container-range .input-daterange').datepicker({
            todayBtn: true,
            todayHighlight: true,
            autoclose: true
        });

        $('.datepicker-container input').datepicker({
            autoclose: true,
            todayHighlight: true
        });

        $("#findBuddy").on('click touchstart',function() {
            $("#viewList").trigger("click");
        });

        $("#kakaoLogin").on('click touchstart',function() {
            $("#kakao-login-btn").trigger('click');
        });

        if(window.location.pathname == "/mylist") {
            getMyList();
        } else {
            getTravelList();
        }

        $('.navbar-collapse ul li a:not(.dropdown-toggle)').bind('click touchstart', function () {
            /*if(event.target.className != "dropdown-toggle" && event.target.id != "findBuddy") {
                $('.navbar-toggle:visible').click();
            }*/

            if(event.target.id == "login_name" && event.target.className != "dropdown-toggle") {
                $('.navbar-toggle:visible').click();

            }
        });

        if(window.innerWidth < 767) {
            var listHeight = window.innerHeight - 160;
            $("#travelList_container").css("height", listHeight);
        }

        $('form').validate({
            rules: {
                kakaotalkID: {
                    required: true
                },
                start: {
                    required: true
                },
                end: {
                    required: true
                }
            },
            messages: {
                kakaotalkID: {
                    required: "*"
                },
                start: {
                    required: "*"
                },
                end: {
                    required: "*"
                }
            },
            highlight: function(element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function(element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            errorElement: 'span',
            errorClass: 'help-block',
            errorPlacement: function(error, element) {
                if(element.parent('.input-group').length) {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            },
            submitHandler: function() { addNewTravel(); }
        });


    }); // End document ready

})(this.jQuery);
