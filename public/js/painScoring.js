$(document).ready(function () {

    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    var noPain = '<h2 class="fs-title text-center">NO PAIN</h2> <br><br>' +
        '<div class="row justify-content-center">' +
        '<div class="col-3"> <img src="https://img.icons8.com/color/96/000000/ok--v2.png" class="fit-image"> </div>' +
        '</div> <br><br>' +
        '<div class="row justify-content-center">' +
        '<div class="col-7 text-center">' +
        '<h5>Re-evaluate soon in future</h5>' +
        '</div>' +
        '</div>';

    var mildPain = '<h2 class="fs-title text-center">MILD PAIN</h2> <br><br>' +
        '<div class="row justify-content-center">' +
        '<div class="col-3"> <img src="/img/icons8-low-risk-160.png" class="fit-image"> </div>' +
        '</div> <br><br>' +
        '<div class="row justify-content-center">' +
        '<div class="col-7 text-center">' +
        '<h5>Re-evaluate soon in future</h5>' +
        '</div>' +
        '</div>';

    var unacceptablePain = '<h2 class="fs-title text-center">UNACCEPTABLE AMOUNT OF PAIN</h2> <br><br>' +
        '<div class="row justify-content-center">' +
        '<div class="col-3"> <img src="/img/icons8-medium-risk-160.png" class="fit-image"> </div>' +
        '</div> <br><br>' +
        '<div class="row justify-content-center">' +
        '<div class="col-7 text-center">' +
        '<h5>Consider further sedation or other analgesia</h5>' +
        '</div>' +
        '</div>';


    var maxPain = '<h2 class="fs-title text-center">MAXIMUM PAIN</h2> <br><br>' +
        '<div class="row justify-content-center">' +
        '<div class="col-3"> <img src="/img/icons8-high-risk-160.png" class="fit-image"> </div>' +
        '</div> <br><br>' +
        '<div class="row justify-content-center">' +
        '<div class="col-7 text-center">' +
        '<h5>Consider further sedation or other analgesia</h5>' +
        '</div>' +
        '</div>';


    function renderIntubatedContent(title, option1, option2, option3) {

        var intubatedContent = '<h2 class="fs-title">'
            + '<p id="intubatedAnsTitle">'
            + title
            + '</p>'
            + '</h2>'
            + '<div class="custom-control custom-radio custom-control">'
            + '<input type="radio" class="custom-control-input"'
            + 'id="pain-question1-ans1" name="pain-question1"'
            + '  value="0" checked>'
            + '<label class="custom-control-label" for="pain-question1-ans1"'
            + 'style="color:#5cb85c;">'
            + option1
            + '</label>'
            + '</div>'
            + '<div class="custom-control custom-radio custom-control">'
            + '    <input type="radio" class="custom-control-input"'
            + '        id="pain-question1-ans2" name="pain-question1" value="1">'
            + '    <label class="custom-control-label" for="pain-question1-ans2"'
            + '        style="color:#f0ad4e;">'
            + option2
            + '</label>'
            + '</div>'
            + '<div class="custom-control custom-radio custom-control">'
            + '    <input type="radio" class="custom-control-input"'
            + '        id="pain-question1-ans3" name="pain-question1" value="2">'
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
        document.getElementById("pain-result").innerHTML = noPain;

        var questions = []
        questions.push(document.getElementsByName('pain-question1'));
        questions.push(document.getElementsByName('pain-question2'));
        questions.push(document.getElementsByName('pain-question3'));
        questions.push(document.getElementsByName('pain-question4'));
        var score = 0;
        questions.forEach(question => {
            question.forEach(answer => {
                if (answer.checked)
                    score += parseInt(answer.value, 10);
            });
        });
        if (score > 2)
            document.getElementById("pain-result").innerHTML = unacceptablePain;

    });

    $(".pain2Finish").click(function () {
        document.getElementById("pain2-result").innerHTML = noPain;

        var questions = []
        questions.push(document.getElementsByName('pain2-question1'));
        questions.push(document.getElementsByName('pain2-question2'));
        questions.push(document.getElementsByName('pain2-question3'));
        var score = 0;
        questions.forEach(question => {
            question.forEach(answer => {
                if (answer.checked)
                    score += parseInt(answer.value, 10);
            });
        });
        if (score === 12)
            document.getElementById("pain2-result").innerHTML = maxPain;
        else if (score > 5)
            document.getElementById("pain2-result").innerHTML = unacceptablePain;
        else if (score > 3)
            document.getElementById("pain2-result").innerHTML = mildPain;

    });

});