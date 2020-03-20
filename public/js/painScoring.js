$(document).ready(function () {

    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;

    function renderIntubatedContent(title, option1, option2, option3) {

        var intubatedContent = '<h2 class="fs-title">'
            + '<p id="intubatedAnsTitle">'
            + title
            + '</p>'
            + '</h2>'
            + '<div class="custom-control custom-radio custom-control">'
            + '<input type="radio" class="custom-control-input"'
            + 'id="pain-question1-ans1" name="pain-question1"'
            + '  value="yes" checked>'
            + '<label class="custom-control-label" for="pain-question1-ans1"'
            + 'style="color:#5cb85c;">'
            + option1
            + '</label>'
            + '</div>'
            + '<div class="custom-control custom-radio custom-control">'
            + '    <input type="radio" class="custom-control-input"'
            + '        id="pain-question1-ans2" name="pain-question1" value="no">'
            + '    <label class="custom-control-label" for="pain-question1-ans2"'
            + '        style="color:#f0ad4e;">'
            + option2
            + '</label>'
            + '</div>'
            + '<div class="custom-control custom-radio custom-control">'
            + '    <input type="radio" class="custom-control-input"'
            + '        id="pain-question1-ans3" name="pain-question1" value="no">'
            + '    <label class="custom-control-label" for="pain-question1-ans3"'
            + '        style="color:#d9534f;">'
            + option3
            + '</label>'
            + '</div>';

        document.getElementById("intubatedContent").innerHTML = intubatedContent;
    }

    $("#intubatedYes").click(function () {
        renderIntubatedContent('Compliance with ventilator',
            'Tolerating ventilator or movement',
            'Coughing but tolerating',
            'Fighting ventilator'
        );
    });


    $("#intubatedNo").click(function () {
        renderIntubatedContent('Vocalization',
            'Talking in normal tone or no sound',
            'Sighing, moaning',
            'Crying out, sobbing'
        );
    });

    $(".next").click(function () {

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
            step: function (now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({ 'opacity': opacity });
            },
            duration: 600
        });
    });

    $(".previous").click(function () {

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
            step: function (now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({ 'opacity': opacity });
            },
            duration: 600
        });
    });

    $('.radio-group .radio').click(function () {
        $(this).parent().find('.radio').removeClass('selected');
        $(this).addClass('selected');
    });

    $(".submit").click(function () {
        return false;
    })

    $(".painFinish").click(function () {
        var painPresent = '<h2 class="fs-title text-center">Criteria met!</h2> <br><br>' +
            '<div class="row justify-content-center">' +
            '<div class="col-3"> <img src="/img/orange-warning-icon-3.png" class="fit-image"> </div>' +
            '</div> <br><br>' +
            '<div class="row justify-content-center">' +
            '<div class="col-7 text-center">' +
            '<h5>CAM-ICU positive - pain present</h5>' +
            '</div>' +
            '</div>';

        var nopain = '<h2 class="fs-title text-center">Criteria not met!</h2> <br><br>' +
            '<div class="row justify-content-center">' +
            '<div class="col-3"> <img src="https://img.icons8.com/color/96/000000/ok--v2.png" class="fit-image"> </div>' +
            '</div> <br><br>' +
            '<div class="row justify-content-center">' +
            '<div class="col-7 text-center">' +
            '<h5>CAM ICU negative - No pain</h5>' +
            '</div>' +
            '</div>';

        document.getElementById("pain-result").innerHTML = nopain;

        var condition1 = false, condition2 = false, condition3 = false;

        var painAns1_1 = document.getElementsByName('pain-question1_1');
        var painAns1_2 = document.getElementsByName('pain-question1_2');
        var painNoOfErrors1 = document.getElementById('pain-no-of-errors1');
        var painNoOfErrors2 = document.getElementById('pain-no-of-errors2');
        var actualRassScore = document.getElementById('actual-rass-score');

        for (i = 0; i < painAns1_1.length; i++)
            if (painAns1_1[i].checked)
                condition1 = (painAns1_1[i].value === "yes");

        for (i = 0; i < painAns1_2.length; i++)
            if (painAns1_2[i].checked)
                condition1 = condition1 || painAns1_2[i].value === "yes";

        condition2 = painNoOfErrors1.value > 2;
        condition3 = actualRassScore.value != 0 || painNoOfErrors2.value > 1;

        if (condition1 && condition2 && condition3)
            document.getElementById("pain-result").innerHTML = painPresent;

    });

    $("#pain-no-of-errors1-result b").html($("#pain-no-of-errors1").val());
    // Read value on change
    $("#pain-no-of-errors1").change(function () {
        $("#pain-no-of-errors1-result b").html($(this).val());
    });

    $("#pain-no-of-errors2-result b").html($("#pain-no-of-errors2").val());
    // Read value on change
    $("#pain-no-of-errors2").change(function () {
        $("#pain-no-of-errors2-result b").html($(this).val());
    });

    $("#actual-rass-score-result b").html($("#actual-rass-score").val());
    // Read value on change
    $("#actual-rass-score").change(function () {
        $("#actual-rass-score-result b").html($(this).val());
    });
});