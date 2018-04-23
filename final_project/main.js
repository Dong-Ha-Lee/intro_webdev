$(document).ready(function () {

    $('.join').click(function () {
        $('.joined_member').css({
            display: 'inline'
        });
        $('.join_text').css({
            display: 'none'
        });
        $('.join').text("SEE YOU SOON");
        $('.join').css({
            background: "#111111"
        });
    });

});

$('#prof_img_edit_icon').click(function () {
    $('#upload_profile_img').css({
        display: 'inline'
    });
    $(this).css({
        display: 'none'
    });
});
$('#car_img_edit_icon').click(function () {
    $('#upload_car_img').css({
        display: 'inline'
    });
    $(this).css({
        display: 'none'
    });
});
$('.card').click(function () {
    $('.join').click(function () {
        $('.join_mark_none').css({
            display: 'block'
        });
    });
});
$('.card').mouseenter(function () {
        $(this).children($(".card-text")).animate({
            marginLeft: "5%",
            marginRight: "5%"
        }, "slow");
    })
    .mouseleave(function () {
        $(this).children($(".card-text")).animate({
            marginLeft: "0%",
            marginRight: "0%"
        }, "slow");
    });

$('#first_time').click(function () {
    $('#first_time').queue(function () {
        $("#first_time").animate({
            opacity: '0'
        }, 800).dequeue();
    }).queue(function () {
        $("#first_time").css({
            display: 'none'
        }).dequeue()
    });

    $("#signin").queue(function () {
        $("#signin").animate({
            opacity: '0'
        }, 800).dequeue();
    }).queue(function () {
        $("#signin").css({
            display: 'none'
        }).dequeue();
    });

    $("#signup").css({
        display: 'inline',
        opacity: '0'
    });
    $('#signup').delay(800);
    $("#signup").animate({
        opacity: '1'
    }, 500);
});
