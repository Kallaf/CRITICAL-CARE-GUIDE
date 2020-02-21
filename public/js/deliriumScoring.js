$(document).ready(function(){

    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;

    $(".next").click(function(){

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
        step: function(now) {
        // for making fielset appear animation
        opacity = 1 - now;

        current_fs.css({
            'display': 'none',
            'position': 'relative'
        });
        next_fs.css({'opacity': opacity});
        },
        duration: 600
        });
    });

    $(".previous").click(function(){

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
        step: function(now) {
        // for making fielset appear animation
        opacity = 1 - now;

        current_fs.css({
            'display': 'none',
            'position': 'relative'
        });
        previous_fs.css({'opacity': opacity});
        },
        duration: 600
        });
    });

    $('.radio-group .radio').click(function(){
        $(this).parent().find('.radio').removeClass('selected');
        $(this).addClass('selected');
    });

    $(".submit").click(function(){
        return false;
    })

    $(".deliriumFinish").click(function(){
        var deliriumPresent = '<h2 class="fs-title text-center">Criteria met!</h2> <br><br>'+
        '<div class="row justify-content-center">'+
        '<div class="col-3"> <img src="/img/orange-warning-icon-3.png" class="fit-image"> </div>'+
        '</div> <br><br>'+
        '<div class="row justify-content-center">'+
            '<div class="col-7 text-center">'+
                '<h5>CAM-ICU positive - Delirium present</h5>'+
            '</div>'+
        '</div>';

        var noDelirium = '<h2 class="fs-title text-center">Criteria not met!</h2> <br><br>'+
        '<div class="row justify-content-center">'+
        '<div class="col-3"> <img src="https://img.icons8.com/color/96/000000/ok--v2.png" class="fit-image"> </div>'+
        '</div> <br><br>'+
        '<div class="row justify-content-center">'+
            '<div class="col-7 text-center">'+
                '<h5>CAM ICU negative - No Delirium</h5>'+
            '</div>'+
        '</div>';

        document.getElementById("delirium-result").innerHTML = noDelirium;

        var condition1=false,condition2=false,condition3=false;

        var deliriumAns1_1 = document.getElementsByName('delirium-question1_1');
        var deliriumAns1_2 = document.getElementsByName('delirium-question1_2');
        var deliriumNoOfErrors1 = document.getElementById('delirium-no-of-errors1');
        var deliriumNoOfErrors2 = document.getElementById('delirium-no-of-errors2');
        var actualRassScore = document.getElementById('actual-rass-score');

        for(i = 0; i < deliriumAns1_1.length; i++)
            if(deliriumAns1_1[i].checked)
                condition1 = (deliriumAns1_1[i].value === "yes");

        for(i = 0; i < deliriumAns1_2.length; i++)
            if(deliriumAns1_2[i].checked)
                condition1 = condition1 || deliriumAns1_2[i].value === "yes";
        
        condition2 = deliriumNoOfErrors1.value > 2;
        condition3 = actualRassScore.value != 0 || deliriumNoOfErrors2.value > 1;

        if(condition1&&condition2&&condition3)
            document.getElementById("delirium-result").innerHTML = deliriumPresent; 

    });

    $("#delirium-no-of-errors1-result b").html($("#delirium-no-of-errors1").val());
    // Read value on change
    $("#delirium-no-of-errors1").change(function(){
        $("#delirium-no-of-errors1-result b").html($(this).val());
    });

    $("#delirium-no-of-errors2-result b").html($("#delirium-no-of-errors2").val());
    // Read value on change
    $("#delirium-no-of-errors2").change(function(){
        $("#delirium-no-of-errors2-result b").html($(this).val());
    });
    
    $("#actual-rass-score-result b").html($("#actual-rass-score").val());
    // Read value on change
    $("#actual-rass-score").change(function(){
        $("#actual-rass-score-result b").html($(this).val());
    });
});