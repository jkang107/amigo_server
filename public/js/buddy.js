//var preURL = window.location.href.indexOf('8080') == -1 
    //? "http://amigo-server-.herokuapp.com"
    //: "http://localhost:5000";
var preURL = "amigo-server-.herokuapp.com";
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

/*$("div#login_container div.btn-group > a.dropdown-toggle, .dropdown-menu li a").click(function(e) {
    e.stopPropagation();
    $('.dropdown-menu').toggle();
});​*/

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
    $("#login_container").append('<ul class="dropdown-menu"><li><a onclick="javascript:viewMyAccount()">내가 올린 글 보기</a></li><li class="divider"></li><li><a onclick="javascript:kakao_logout()">Logout</a></li></ul>');
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
    $('.dropdown-menu').dropdown('toggle');
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
        comment: null,
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
            travelInfo['comment'] = $("#travel_detail1").val();

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
            travelInfo['comment'] = $("#travel_detail2").val();

            panelStyle = "panel-info";
            titleImage = "taxi_64.png";
            break;
        case "tourWith":
            travelInfo['travel_type'] = travelType;
            travelInfo['when_from'] = $("#tour_date_from").val();
            travelInfo['when_to'] = $("#tour_date_to").val();
            travelInfo['country_from'] = $("#tour_contry option:selected").val();
            travelInfo['tour_name'] = $("#tour_name").val();
            travelInfo['comment'] = $("#travel_detail3").val();

            panelStyle = "panel-warning";
            titleImage = "biking_64.png";
            break;
        case "foodWith":
            travelInfo['travel_type'] = travelType;
            travelInfo['when_from'] = $("#food_when").val();
            travelInfo['country_from'] = $("#food_country option:selected").val();
            travelInfo['city_from'] = $("#food_city").val();
            travelInfo['comment'] = $("#travel_detail4").val();

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
        $("#createTravel").toggle();
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

/*var Travel = function(user, travelInfo) {

    this.id = user.userId;
    this.info = travelInfo;
};*/

var tmp_new_travel;
function createNewTravel(travel) {
    //var newUser = new Travel(user, travel);
    tmp_new_travel = travel;
    stampCurrentTime();
    sendToServer(travel);
}
var numOfTravel = 0;

function createNewObject(travel, count) {

    $("#accordion").prepend("<div id='object_" + count + "' class='panel panel-default " + panelStyle + "'></div>");

    $("#object_" + count).append("<div class='panel-heading' role='tab' id='heading_" + count + "'><h4 class='panel-title'><a data-toggle='collapse' id='heading_t_" + count + "' class='clipped' data-parent='#accordion' href='#collapse_" + count + "' aria-expanded='false' aria-controls='collapse_" + count + "'></a></h4></div>");

    $("#object_" + count).append("<div id='collapse_" + count + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='collapse_" + count + "'><div class='panel-body'>" + travel.comment + "</div></div>");

    var _object = $("#heading_t_" + count);

    //add kakaotalk
    _object.append("<img src='" + travel.kakao_thumbnail + "' class='img-circle inner_list' alt='kakaotalk thumbnail' width='40' height='40'>");

    //add travel type
    _object.append("<img src='./bootstrap/images/" + titleImage + "' class='inner_list' alt='travel' width='40' height='40'>");

    //add gender
    var tmp_gender = travel.sex;
    _object.append("<span id='_gender' class='inner_text'></span>");
    //var tmp_gender_class;
    if (tmp_gender == "man") {
        tmp_gender = "남";
        //tmp_gender_class = 'inner_text_gender_m';
    } else if (tmp_gender == "woman") {
        tmp_gender = "여";
        //tmp_gender_class = 'inner_text_gender_w';

    } else {
        tmp_gender = "2명이상";
        //tmp_gender_class = 'inner_text_gender_more';

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

    //add travel country_from
    if (typeof travel.country_from == "string") {
        _object.append("<span id='_country_from' class='inner_text'>#" + travel.country_from + "</span>");
    } else {
        for (var i = 0; i < travel.country_from.length; i++) {
            _object.append("<span id='_country_from' class='inner_text'>#" + travel.country_from[i] + "</span>");
        }
    }

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

function sendToServer(travelInfo) {
    var url = preURL + "/sendTravelInfo";
    deferred = $.post(url, {
        /*userInfo: userInfo,*/
        travelInfo: travelInfo,
        time: currentTime
    });

    deferred.success(function(e) {
        console.log("Success Message from server : " + e);
        createNewObject(tmp_new_travel, numOfTravel);
    });

    deferred.error(function(e) {
        console.log("Error Message from server : " + e);
        // Handle any errors here.
    });

}

function getTravelList() {
    var url = preURL + "/getTravelList";
    $.ajax({
        type: 'GET',
        url: url,
        success: function(result) {
            console.log(result);
            numOfTravel = result.length;
            for (var i = 0; i < numOfTravel; i++) {
                returnTravelType(result[i].type);
                createNewObject(result[i], i + 1);
            }
        },
        error: function(a, b) {
            console.log("error: " + a + b);
        }
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
