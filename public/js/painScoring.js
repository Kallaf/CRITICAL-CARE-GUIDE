$(document).ready(function () {

    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;

    
    function calculateScore(questions)
    {
        var score = 0;
        questions.forEach(question => {
            question.forEach(answer => {
                if (answer.checked)
                    score += parseInt(answer.value, 10);
            });
        });
        return score;
    }

    function getQuestions(title,size)
    {
        var questions = []
        for(let i=1;i<=size;i++)
            questions.push(document.getElementsByName(title+i.toString(10)));
        return questions;
    }

    function renderResult(title,rimg,message)
    {
        return '<h2 class="fs-title text-center">'+title+'</h2> <br><br>' +
        '<div class="row justify-content-center">' +
        '<div class="col-6"> <img src='+rimg+' class="fit-image"> </div>' +
        '</div> <br><br>' +
        '<div class="row justify-content-center">' +
        '<div class="col-7 text-center">' +
        '<h5>'+message+'</h5>' +
        '</div>' +
        '</div>';
    }

    function getNoPain(title)
    {
        return renderResult(title,"https://img.icons8.com/color/96/000000/ok--v2.png","no pain re-evaluate soon in future")
    }

    function getMildPain(title)
    {
        return renderResult(title,"/img/icons8-low-risk-160.png","mild pain re-evaluate soon in future")
    }

    function getUnacceptablePain(title)
    {
        return renderResult(title,"/img/icons8-medium-risk-160.png","unacceptable amount of pain consider further sedation or other analgesia")
    }

    function getMaxPain(title)
    {
        return renderResult(title,"/img/icons8-high-risk-160.png","maximum pain consider further sedation or other analgesia")
    }

    function renderIntubatedContent(title, option1, option2, option3) {
        document.getElementById("intubatedAnsTitle").innerHTML = title;
        document.getElementById("intubatedAnsOption1").innerHTML = option1;
        document.getElementById("intubatedAnsOption2").innerHTML = option2;
        document.getElementById("intubatedAnsOption3").innerHTML = option3;
    }

    
    $(".update-score").click(function () {
        var score = calculateScore(getQuestions('pain-question',4));
        $(".current-score b").html(score);
    });

    $(".update-score2").click(function () {
        var score = calculateScore(getQuestions('pain2-question',3));
        $(".current-score2 b").html(score);
    });

    $("#intubatedYes").click(function () {
        renderIntubatedContent('Compliance with ventilator',
            '0 Tolerating ventilator or movement',
            '+1 Coughing but tolerating',
            '+2 Fighting ventilator'
        );
    });


    $("#intubatedNo").click(function () {
        renderIntubatedContent('Vocalization',
            '0  Talking in normal tone or no sound',
            '+1 Sighing, moaning',
            '+2 Crying out, sobbing'
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
        var score = calculateScore(getQuestions('pain-question',4));
        if (score > 2)
            document.getElementById("pain-result").innerHTML = getUnacceptablePain("2 &lt score");
        else
            document.getElementById("pain-result").innerHTML = getNoPain("score &le; 2");

    });

    $(".pain2Finish").click(function () {
        var score = calculateScore(getQuestions('pain2-question',3));
        if (score === 12)
            document.getElementById("pain2-result").innerHTML = getMaxPain("score = 12");
        else if (score > 5)
            document.getElementById("pain2-result").innerHTML = getUnacceptablePain("6 &le; score &le; 11");
        else if (score > 3)
            document.getElementById("pain2-result").innerHTML = getMildPain("4 &le; score &lt; 6");
        else
            document.getElementById("pain2-result").innerHTML = getNoPain("0 &le; score &le; 3");

    });

});