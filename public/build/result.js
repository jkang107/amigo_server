/* 2015-06-12 */ var preURL = "http://findyourtravelbuddy.herokuapp.com";
//var preURL = "";

// kakaotalk

// KAKAO TALK JavaScript Key
Kakao.init('8153126b123d384678442ece2cfd1ed8');

// create login button
Kakao.Auth.createLoginButton({
    container: '#kakao-login-btn',
    success: function(authObj) {
        Kakao.API.request({
            url: '/v1/user/me',
            success: function(res) {
                sendLoginInfo(res);
                isLogin = true;
                afterLogin(res);
                //window.location.reload();
            },
            fail: function(error) {
                alert(JSON.stringify(error));
            }
        });
    },
    fail: function(err) {
        console.log(JSON.stringify(err));
    }
});

function sendLoginInfo(userInfo) {
    var url = preURL + "/sendLoginInfo";

    response = $.post(url, {
        userInfo: userInfo
    });

    response.success(function(e) {
        console.log("Message from server : " + e);

    });

    response.error(function(e) {
        // Handle any errors here.
    });
}

function afterLogin(kakao_userInfo) {
    $("#login_container").prepend('<img id="profil_img" src="' + kakao_userInfo.properties.thumbnail_image + '" class="img-circle profile">');
    $("#login_name").text(kakao_userInfo.properties.nickname);
    $("#login_name").css({
        "float": "left",
        "margin-left": "-13px"
    });
    $("#login_fade").css("display", "none");
    $("#login").css("display", "none");
    $("#login_container").addClass('dropdown dropdown-btn');
    $("#login_name").attr("data-toggle", "dropdown").addClass('dropdown-toggle').append("<b class='caret'></b>");
    $("#login_container").append('<ul class="dropdown-menu"><li><a href="/mylist">내가 올린 글 보기</a></li><li class="divider"></li><li><a onclick="javascript:kakao_logout()">Logout</a></li></ul>');
    if (isPressNewBtn) {
        $('#createTravel').css('z-index', '1040');
    }

    localStorage.setItem('id', kakao_userInfo.id);
    localStorage.setItem('thumbnail', kakao_userInfo.properties.thumbnail_image);
    localStorage.setItem('nickname', kakao_userInfo.properties.nickname);

}

function afterLogout() {
    //$('.dropdown-menu').toggle();
    $("#login_name").text("로그인");
    $("#login_name").css({
        "float": "",
        "margin-left": "0px"
    });
    $("#profil_img").remove();
    $("#login_name").removeAttr("data-toggle").removeClass('dropdown-toggle');
    $("b .caret").remove();
    $(".dropdown-menu").remove();
    localStorage.removeItem("id");
    localStorage.removeItem("thumbnail");
    localStorage.removeItem("nickname");
}

function viewMyAccount() {
    //$('.dropdown-menu').dropdown('toggle');
    window.location.href = '/mylist';
}
function loginWithKakao() {
    /*// 로그인 창을 띄웁니다.
    Kakao.Auth.login({
        success: function(authObj) {
            alert(JSON.stringify(authObj));
            $("#login_name").text(authObj.properties.nickname);
        },
        fail: function(err) {
            alert(JSON.stringify(err));
        }
    });*/
}

function kakao_logout() {
    Kakao.Auth.logout();
    isLogin = false;
    afterLogout();
    //$('.dropdown-menu').dropdown('toggle');
    /*return false;*/
}

google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {
    var options = {
        types: ['(cities)']
    };

    var input = document.getElementById('move_from');
    var autocomplete = new google.maps.places.Autocomplete(input, options);
}

// Login window

function popupLoginWindow() {
    if(!isLogin) {
       $("#login").css("display", "block");
        $("#login_fade").css("display", "block"); 
    }
}

var containerNum = 1;
var panelStyle, titleImage;
var user_kakaotalk_thumbnail;


var chooseTravelType = function() {
    var selectedType = event.target.id;
    console.log("select " + selectedType);

    $("#type" + containerNum + "_container").css("display", "none");

    switch (selectedType) {
        case "travelWith":
            containerNum = 1;
            break;
        case "moveWith":
            containerNum = 2;
            break;
        case "tourWith":
            containerNum = 3;
            break;
        case "foodWith":
            containerNum = 4;
            break;
    }

    $("#type" + containerNum + "_container").css("display", "block");
};

var addNewTravel = function() {
    $('#createTravel').modal('hide');
    
    var travelType = $("#travel_type").find(".active").get(0).id;

    var travelInfo = {
        userId: localStorage.getItem("id"),
        travel_type: travelType,
        sex: $("#client_gender").find(".active").children().get(0).id,
        age: $("#client_age").find(".active").children().get(0).id,
        when_from: null,
        when_to: null,
        country_from: null,
        city_from: null,
        country_to: null,
        city_to: null,
        transportation: null,
        tour_name: null,
        comment: "카카오톡 ID: " + $("#kakaoID").val() + '<br>',
        kakao_thumbnail: localStorage.getItem("thumbnail")
        
    };

    switch (travelType) {
        case "travelWith":
            var countryArr = [];
            $("#travel_country").find(".active").each(function() {
                countryArr.push($(this).text());
            });
            travelInfo['travel_type'] = travelType;
            travelInfo['when_from'] = $("#travel_date_from").val();
            travelInfo['when_to'] = $("#travel_date_to").val();
            travelInfo['country_from'] = countryArr;
            travelInfo['comment'] += $("#travel_detail1").val();

            panelStyle = "panel-success";
            titleImage = "travel_man_64.png";
            break;
        case "moveWith":
            travelInfo['travel_type'] = travelType;
            travelInfo['when_from'] = $("#move_when").val();
            travelInfo['country_from'] = $("#move_from_country option:selected").val();
            travelInfo['city_from'] = $("#move_from").val();
            travelInfo['country_to'] = $("#move_to_country option:selected").val();
            travelInfo['city_to'] = $("#move_to").val();
            travelInfo['transportation'] = $("#transportation_button").find(".active").children().get(0).id;
            travelInfo['comment'] += $("#travel_detail2").val();

            panelStyle = "panel-info";
            titleImage = "taxi_64.png";
            break;
        case "tourWith":
            travelInfo['travel_type'] = travelType;
            travelInfo['when_from'] = $("#tour_date_from").val();
            travelInfo['when_to'] = $("#tour_date_to").val();
            travelInfo['country_from'] = $("#tour_contry option:selected").val();
            travelInfo['tour_name'] = $("#tour_name").val();
            travelInfo['comment'] += $("#travel_detail3").val();

            panelStyle = "panel-warning";
            titleImage = "biking_64.png";
            break;
        case "foodWith":
            travelInfo['travel_type'] = travelType;
            travelInfo['when_from'] = $("#food_when").val();
            travelInfo['country_from'] = $("#food_country option:selected").val();
            travelInfo['city_from'] = $("#food_city").val();
            travelInfo['comment'] += $("#travel_detail4").val();

            panelStyle = "panel-danger";
            titleImage = "food_64.png";
            break;

    }

    createNewTravel(travelInfo);
    console.log("==== Create new travel! ====");
};

function returnTravelType(travelType) {
    switch (travelType) {
        case "travelWith":
            panelStyle = "panel-success";
            titleImage = "travel_man_64.png";
            break;
        case "moveWith":
            panelStyle = "panel-info";
            titleImage = "taxi_64.png";
            break;
        case "tourWith":
            panelStyle = "panel-warning";
            titleImage = "biking_64.png";
            break;
        case "foodWith":
            panelStyle = "panel-danger";
            titleImage = "food_64.png";
            break;
    }
}

var isLogin = false;
var isPressNewBtn = false;
var showTravelForm = function() {
    if (isLogin) {
        isPressNewBtn = true;
    } else {
        $('#createTravel').css('z-index', '-1');
        isPressNewBtn = true;
        popupLoginWindow();
    }
};

$("#login_fade").click(function() {
    $("#login_fade").css("display", "none");
    $("#login").css("display", "none");
});

$("#login_close_btn").click(function() {
    $("#login_fade").css("display", "none");
    $("#login").css("display", "none");
});

var tmp_new_travel;
function createNewTravel(travel) {
    tmp_new_travel = travel;
    stampCurrentTime();
    sendToServer(travel);
}
var numOfTravel = 0;
var info_div_width = 0;
function createNewObject(travel, count) {

    $("#accordion").prepend("<div id='object_" + count + "' class='mix panel panel-default " + panelStyle + "'></div>");

    $("#object_" + count).append("<div class='panel-heading' role='tab' id='heading_" + count + "'><div class='panel-title mylist-panel-title'><a index=" + travel.index + " data-toggle='collapse' id='heading_t_" + count + "' class='clipped line_container' data-parent='#accordion' href='#collapse_" + count + "' aria-expanded='false' aria-controls='collapse_" + count + "'></a></div></div>");

    $("#object_" + count).append("<div id='collapse_" + count + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='collapse_" + count + "'><div class='panel-body'>" + travel.comment + "<br/></div></div>");
    
    var _object = $("#heading_t_" + count);

    // ----------test ----------
    var inner1 = $("<div class='img_div'></div>");
    _object.append(inner1);
    //-----------test--------------

    //add kakaotalk
    inner1.append("<img src='" + travel.kakao_thumbnail + "' class='img-circle inner_list' alt='kakaotalk thumbnail' width='40' height='40'>");

    //add travel type
    inner1.append("<img src='./bootstrap/images/" + titleImage + "' class='inner_list' alt='travel' width='40' height='40'>");

    // -------------------test ---------------
    var inner2;
    if(info_div_width != undefined) {
        inner2 = $("<div class='info_div' style='width:" + info_div_width + "px'></div>");
    } else {
        inner2 = $("<div class='info_div'></div>");

    }

    _object.append(inner2);
    _object = inner2;

    // ---------------------------------------


    //add gender
    var tmp_gender = travel.sex;
    _object.append("<span id='_gender' class='inner_text'></span>");
    if (tmp_gender == "man") {
        tmp_gender = "남";
    } else if (tmp_gender == "woman") {
        tmp_gender = "여";
    } else {
        tmp_gender = "2명이상";
    }

    $("#_gender").text(tmp_gender).addClass("inner_text_gender");

    //add age
    var tmp_age = travel.age.split("_")[1] + "대";
    _object.append("<span id='_age' class='inner_text inner_text_gender'>" + tmp_age + "</span>");


    //transportation
    if (travel.transportation !== null) {
        var tmp_trans = travel.transportation;
        switch (tmp_trans) {
            case "bus":
                tmp_trans = "버스이동";
                break;

            case "taxi":
                tmp_trans = "택시이동";
                break;

            case "metro":
                tmp_trans = "지하철이동";
                break;
        }
        _object.append("<span id='_transportation' class='inner_text inner_text_trans'>#" + tmp_trans + "</span>");
    }

    var tmp_country_class;
    if(travel.country_from instanceof Array || travel.country_from.split(",").length > 1) {
        var tmp_travel_country_array = new Array;
        if(typeof travel.country_from == 'string') {
            tmp_travel_country_array = travel.country_from.split(",");
        } else {
            tmp_travel_country_array = travel.country_from;
        }
       for(var i = 0; i < tmp_travel_country_array.length; i++) {
            switch (tmp_travel_country_array[i]) {
                case "멕시코":
                    tmp_country_class = 'mexico';
                    break;
                case "콜롬비아":
                    tmp_country_class = 'colombia';
                    break;
                case "에콰도르":
                    tmp_country_class = 'equador';
                    break;
                case "페루":
                    tmp_country_class = 'peru';
                    break;
                case "볼리비아":
                    tmp_country_class = 'bolivia';
                    break;
                case "칠레":
                    tmp_country_class = 'chile';
                    break;
                case "아르헨티나":
                    tmp_country_class = 'argentina';
                    break;
                case "브라질":
                    tmp_country_class = 'brazil';
                    break;
            }
            $("#object_" + count).addClass(tmp_country_class);
        } 
    } else {
        switch (travel.country_from) {
            case "멕시코":
                tmp_country_class = 'mexico';
                break;
            case "콜롬비아":
                tmp_country_class = 'colombia';
                break;
            case "에콰도르":
                tmp_country_class = 'equador';
                break;
            case "페루":
                tmp_country_class = 'peru';
                break;
            case "볼리비아":
                tmp_country_class = 'bolivia';
                break;
            case "칠레":
                tmp_country_class = 'chile';
                break;
            case "아르헨티나":
                tmp_country_class = 'argentina';
                break;
            case "브라질":
                tmp_country_class = 'brazil';
                break;
        }
        $("#object_" + count).addClass(tmp_country_class);
    }
    
    //add travel country_from
    var tmp_str_country;
    if(typeof travel.country_from == 'string') {
        tmp_str_country = travel.country_from.split(",");
        if(tmp_str_country.length > 2) {
            tmp_str_country = tmp_str_country.slice(0,2).toString() + " 외 " + (tmp_str_country.length - 2) + "개국";
        }
        
    } else {
        if(travel.country_from.length > 2) {
            tmp_str_country = travel.country_from.slice(0,2) + " 외 " + (travel.country_from.length - 2) + "개국";
        } else {
            tmp_str_country = travel.country_from.toString();
        }
    }
    _object.append("<span id='_country_from' class='inner_text'>#" + tmp_str_country + "</span>");


    //add travel city_to
    if (travel.city_from !== null) {
        _object.append("<span id='_city_from' class='inner_text'>#" + travel.city_from + "</span>");
    }

    //add tour/trekking name
    if (travel.tour_name !== null) {
        _object.append("<span id='_tour_name' class='inner_text'>#" + travel.tour_name + "</span>");
    }

    //add travel date
    //when_from
    var tmp_from = travel.when_from.split("/");
    tmp_from = tmp_from[0] + "월" + tmp_from[1] + "일";

    //when_to
    if (travel.when_to !== null) {
        var tmp_to = travel.when_to.split("/");
        tmp_to = tmp_to[0] + "월" + tmp_to[1] + "일";
        _object.append("<span id='_when_to' class='inner_text inner_text_date'>" + tmp_from + " ~ " + tmp_to + "</span>");
    } else {
        _object.append("<span id='_when_to' class='inner_text inner_text_date'>" + tmp_from + "</span>");
    }


    if(isMyListPage) {
        if(window.innerWidth < 760) {
            _object.parent().append("<span id='delete_" + count+ "'class='mylist-delete-btn delete-item glyphicon glyphicon-remove-circle btn-lg' aria-hidden='true'></span>");

        } else { 
            _object.append("<span id='delete_" + count+ "'class='mylist-delete-btn delete-item glyphicon glyphicon-remove-circle btn-lg' aria-hidden='true'></span>");
        }
        $("#delete_" + count).click(function(e) {
            console.log(e.target);
            var tmpIndex;
            if(window.innerWidth < 760) {
                tmpIndex = parseInt($(e.target).prev().attr('index'));
            } else {
                tmpIndex = parseInt(e.target.parentNode.parentNode.attributes.index.value);
            }       
            bootbox.confirm({
                size: 'small',
                message: '정말 삭제하시겠습니까?',
                callback: function(result) {
                    if(result == true) {
                        deleteItem(tmpIndex, parseInt(e.target.id.split("_")[1]));
                    } 
                }
            }); 
            
        });
    }

    if(isNewElement) {
        $('#accordion').mixItUp('prepend', $("object_" + count), {filter: 'all'});
        isNewElement = false;
    }
    count++;
}

var currentTime;

function stampCurrentTime() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var m = today.getMinutes();
    var ss = today.getSeconds();

    currentTime = yyyy + "/" + mm + "/" + dd + " " + hh + ":" + m + ":" + ss;

}
var isNewElement = false;
function sendToServer(travelInfo) {
    /*var target = document.getElementById('travelList_container');
    var spinner = new Spinner().spin();
    target.appendChild(spinner.el);*/

    var url = preURL + "/sendTravelInfo";
    deferred = $.post(url, {
        /*userInfo: userInfo,*/
        travelInfo: travelInfo,
        time: currentTime
    });

    deferred.success(function(e) {
        //spinner.stop();
        console.log("Success Message from server : " + e);
        isNewElement = true;
        numOfTravel ++;
        createNewObject(tmp_new_travel, numOfTravel);
         
    });

    deferred.error(function(e) {
        //spinner.stop();
        console.log("Error Message from server : " + e);
        // Handle any errors here.
    });

}

function getTravelList() {
    var target = document.getElementById('travelList_container');
    var spinner = new Spinner().spin();
    target.appendChild(spinner.el);

    var url = preURL + "/getTravelList";
    $.ajax({
        type: 'GET',
        url: url,
        success: function(result) {
            spinner.stop();
            numOfTravel = result.length;
            for (var i = 0; i < numOfTravel; i++) {
                returnTravelType(result[i].type);
                createNewObject(result[i], i + 1);
            }
            $('#accordion').mixItUp({
                layout: {
                    display: 'block'
                }
            });
        },
        error: function(a, b) {
            spinner.stop();
            console.log("error: " + a + b);
        }
    });
}

function getMyList() {
    var target = document.getElementById('travelList_container');
    var spinner = new Spinner().spin();
    target.appendChild(spinner.el);

    var url = preURL + "/getMyList";

    deferred = $.post(url, {
        kakaoid: localStorage.getItem("id")
    });
    

    deferred.success(function(result) {
        spinner.stop();
        console.log("Message from server : " + result);
        numOfTravel = result.length;
        isMyListPage = true;
        for (var i = 0; i < numOfTravel; i++) {
            returnTravelType(result[i].type);
            createNewObject(result[i], i + 1);
        }
    });

    deferred.error(function(e) {
        spinner.stop();
    });
}
var tmp_delete_index = 0;
function deleteItem(item, parentDivIndex) {
    /*var target = document.getElementById("#object_" + parentDivIndex);
    var spinner = new Spinner().spin();
    target.appendChild(spinner.el);*/
    tmp_delete_index = parentDivIndex;
    var url = preURL + "/deleteItem";

    deferred = $.post(url, {
        index: item
    });
    

    deferred.success(function(result) {
        //spinner.stop();
        console.log("Message from server : " + result);
        //remove div
        $("#object_" + tmp_delete_index).remove();
    });

    deferred.error(function(e) {
        //spinner.stop();
    });
}

$("input#sendMail").click(function() {
    var url = preURL + '/sendMail';
    deferred = $.post(url, {
        name: $("#name2").val(),
        from: $("#email2").val(),
        message: $("#message2").val()
    });
    

    deferred.success(function(e) {
        console.log("Message from server : " + e);
        /*$("#receiveMsg").text('Thank you! Message has been sent.');
        event.preventDefault();*/
    });

    deferred.error(function(e) {
        // Handle any errors here.
        /*$("#receiveMsg").text('Sorry! Message was not sent.');
        event.preventDefault();*/
    });
});

var isMyListPage = false;
function checkLoginStatus() {
    if (localStorage.getItem("id") !== null && localStorage.getItem("thumbnail") !== null) {
        isLogin = true;
        $("#login_container").prepend('<img id="profil_img" src="' + localStorage.getItem("thumbnail") + '" class="img-circle profile">');
        $("#login_name").text(localStorage.getItem("nickname"));
        $("#login_name").css({
            "float": "left",
            "margin-left": "-13px"
        });
        $("#login_name").attr("data-toggle", "dropdown").addClass('dropdown-toggle').append("<b class='caret'></b>");
        $("#login_container").append('<ul class="dropdown-menu"><li><a href="/mylist">내가 올린 글 보기</a></li><li class="divider"></li><li><a onclick="javascript:kakao_logout()">Logout</a></li></ul>');
    }
}

function validate() {
    var kakaoID = $("#kakaoID");
    if(!kakaoID.val()) {
        console.log(" This field is required");
        // Stop submission of the form
        e.preventDefault();
    } else {
        console.log(" Good! ");

    }
}/*** concat separator ***//*** concat separator ***/(function($) {
    $(document).ready(function() {

        $(".banner-image").backstretch('images/DSC00605.JPG');
        $(".mylist-image").backstretch('images/portfolio-1.jpg');

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
            autoclose: true,
            disableTouchKeyboard: true
        });

        $('.datepicker-container input').datepicker({
            autoclose: true,
            todayHighlight: true,
            disableTouchKeyboard: true
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
            if(event.target.id == "login_name" && event.target.className != "dropdown-toggle") {
                $('.navbar-toggle:visible').click();

            }
        });

        if(window.innerWidth < 767) {
            info_div_width = window.innerWidth - 130;
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