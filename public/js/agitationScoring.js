$(document).ready(function(){

    
    document.getElementById("RASS-Results").innerHTML = "\"Click on the desired score in the above table to show it's result\"";
    
    function renderRASSResult(score,text)
    {
        var res = "<h3 class='h3-sub-title'>Score: "+score+"</h3><p>"+text+"</p>";
        document.getElementById("RASS-Results").innerHTML = res;    
    }

    $("#RASS-pos-4").click(function(){
        renderRASSResult("+4","Patients with a RASS of 2 to 4 are not sedated enough and should be assessed for pain, anxiety, or delirium. The underlying etiology of the agitation should be investigated and appropriately treated to achieve a RASS of -2 to 0.");
    });
    $("#RASS-pos-3").click(function(){
        renderRASSResult("+3","Patients with a RASS of 2 to 4 are not sedated enough and should be assessed for pain, anxiety, or delirium. The underlying etiology of the agitation should be investigated and appropriately treated to achieve a RASS of -2 to 0.");
    });
    $("#RASS-pos-2").click(function(){
        renderRASSResult("+2","Patients with a RASS of 2 to 4 are not sedated enough and should be assessed for pain, anxiety, or delirium. The underlying etiology of the agitation should be investigated and appropriately treated to achieve a RASS of -2 to 0.");
    });
    $("#RASS-pos-1").click(function(){
        renderRASSResult("+1","Patients with a RASS of -2 to 1 are properly sedated.");
    });
    $("#RASS-0").click(function(){
        renderRASSResult("0","Patients with a RASS of -2 to 1 are properly sedated.");
    });
    $("#RASS-neg-1").click(function(){
        renderRASSResult("-1","Patients with a RASS of -2 to 1 are properly sedated.");
    });
    $("#RASS-neg-2").click(function(){
        renderRASSResult("-2","Patients with a RASS of -2 to 1 are properly sedated.");
    });
    $("#RASS-neg-3").click(function(){
        renderRASSResult("-3","Patients with a RASS of ≤-3 should have their sedation decreased or modified in order to achieve a RASS of -2 to 0.");
    });
    $("#RASS-neg-4").click(function(){
        renderRASSResult("-4","Patients with a RASS of ≤-3 should have their sedation decreased or modified in order to achieve a RASS of -2 to 0.");
    });
    $("#RASS-neg-5").click(function(){
        renderRASSResult("-5","Patients with a RASS of ≤-3 should have their sedation decreased or modified in order to achieve a RASS of -2 to 0.");
    });
});