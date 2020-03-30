$(document).ready(function () {

    $('#painLiverQuestion').hide();
    $('#painRenalQuestion').hide();

    $('#pain-caution-check4').change(function () {
        if (this.checked)
            $('#painLiverQuestion').fadeIn('slow');
        else
            $('#painLiverQuestion').fadeOut('slow');

    });

    $('#pain-caution-check3').change(function () {
        if (this.checked)
            $('#painRenalQuestion').fadeIn('slow');
        else
            $('#painRenalQuestion').fadeOut('slow');

    });

    $("#pain-caution-checklist-submit").click(function () {
        var elderly = document.getElementById('pain-caution-check1').checked;
        var pediatric = document.getElementById('pain-caution-check2').checked;
        var renalDisease = document.getElementById('pain-caution-check3').checked;
        var liverDisease = document.getElementById('pain-caution-check4').checked;
        var NSAID = document.getElementById('pain-caution-check5').checked;
        var paralyticIleus = document.getElementById('pain-caution-check6').checked;
        var peptic = document.getElementById('pain-caution-check7').checked;
        var cerebrovascular = document.getElementById('pain-caution-check8').checked;
        var highRisk = document.getElementById('pain-caution-check9').checked;
        var brainTumor = document.getElementById('pain-caution-check10').checked;
        var heartFailure = document.getElementById('pain-caution-check11').checked;
        var hypertension = document.getElementById('pain-caution-check12').checked;
        var direutics = document.getElementById('pain-caution-check13').checked;
        var chronic = document.getElementById('pain-caution-check14').checked;
        var depressants = document.getElementById('pain-caution-check15').checked;
        var benzodiazepines = document.getElementById('pain-caution-check16').checked;
        var postoperative = document.getElementById('pain-caution-check17').checked;
        var alcoholism = document.getElementById('pain-caution-check18').checked;
        var thyrotoxicosis = document.getElementById('pain-caution-check19').checked;
        var hypothyroidism = document.getElementById('pain-caution-check20').checked;


        var instructions = new Set();
        if (renalDisease) {
            if (document.getElementById('pain-renal1').checked)
                instructions.add("Use ketorlac as 15 to 30 mg IM or IV every 6 hour");
            else if (document.getElementById('pain-renal2').checked) {
                instructions.add("Ketorolac : Preferably avoid or administer 7.5 to 15 mg IM or IV every 6 hours");
                instructions.add("Fentanyl : Administer 75 % of the normal fentanyl dose.");
                instructions.add("Morphine sulfate: Reduce dose by 25");
                instructions.add("<b>GFR&lt;30ml/min:</b> Acetaminophen is used with reduced dosing and prolonged intervals");
                instructions.add("<b>GFR&gt;20ml/min:</b> Meloxicam is used with No dosage adjustment needed");
            }
            else {
                instructions.add("Acetaminophen: administer at a minimum interval of every 8 hours.");
                instructions.add("Ketorolac : Preferably avoid");
                instructions.add("Fentanyl: Administer 50 % of the normal fentanyl dose.");
                instructions.add("Morphine sulfate: Reduce dose by 50 % or consider alternative opioid analgesic");
                instructions.add("GFR 20 mL / minute or less: Meloxicam is not recommended");
            }

            if (elderly)
                instructions.add("Initiate fentanyl at the lower end of the dosing range and titrate slowly");
        }
        if (NSAID) {
            instructions.add("Ketorolac is contraindicated");
            instructions.add("Meloxicam is contraindicated");
        }

        if (peptic) {
            instructions.add("Patients should be advised to take diclofenac with food and to immediately report signs and symptoms of GI ulceration");
            instructions.add("Use the lowest effective dose of meloxicam for the shortest possible duration");
        }

        if (liverDisease) {
            if (document.getElementById('pain-liver1').checked) {
                instructions.add("Use of acetoaminophene is contraindicated");
                instructions.add("Parentral diclofenac is not recommended");
                instructions.add("Use of meloxicam is not recommended");
                instructions.add("Fentanyl use is not recommended");
                if(pediatric)
                    instructions.add("avoid use of morphine sulfate or reduce the dos");
            }
            else {
                instructions.add("Use of acetoaminophene with caution");
                instructions.add("Parentral diclofenac>> no dose adjustment is needed");
                instructions.add("Meloxicam >> no dose adjustment is needed");
            }
            instructions.add("Ketorolac use with caution, evaluate for hepatotoxicity and discontinue the drug");
            instructions.add("Oral diclofenac >> (use with caution) start with lowest effective dose if efficacy is not achieved, consider drug discontinuation");
            instructions.add("Morphine sulfate: <b>Initiate therapy with lower doses and titrate slowly in patients with cirrhosis</b>");
        }

        if (cerebrovascular) {
            instructions.add("Use of ketorolac is contraindicated");
            instructions.add("Use of ketamine is contraindicated");
            instructions.add("Use of morphine sulfate is contraindicated");
        }

        if (highRisk) {
            instructions.add("Long-term oral acetaminophen administration at a dosage of 4 g/day has been shown to have increased INR >>> Monitor INR");
            instructions.add("Ketorolac is contraindicate");
        }

        if (brainTumor)
            instructions.add("Morphine sulfate is contraindicat");

        if (paralyticIleus) {
            instructions.add("Use of fentanyl is contraindicated");
            instructions.add("Use of morphine sulfate is contraindicated");
        }

        if (chronic) {
            instructions.add("Use of fentanyl is contraindicated");
            instructions.add("Use of morphine sulfate is contraindicated");
        }

        if (depressants) {
            instructions.add("Use ketamine with caution as ketamine increase the risk of developing respiratory depression");
            instructions.add("Use of morphine sulfate is contraindicated");
        }

        if (heartFailure) {
            instructions.add("Monitor potassium level closely while using diclofenac");
            instructions.add("Use of morphine sulfate is contraindicated");
        }

        if (hypertension)
            instructions.add("Use of ketamine is contraindicated");

        if (direutics)
            instructions.add("Monitor potassium level closely while using diclofenac");

        if (alcoholism)
            instructions.add("Use of morphine sulfate is contraindicated");

        if (thyrotoxicosis)
            instructions.add("Use ketamine with caution");

        if (hypothyroidism)
            instructions.add("Use of morphine sulfate is contraindicated");

        if (postoperative)
            instructions.add("Use of fentanyl is contraindicated");

        if(benzodiazepines)
            instructions.add("Use of morphine sulfate is contraindicated");

        var res = "";
        if (instructions.size === 0)
            res = "Their are no required instructions";
        else {
            instructions.forEach(instruction => {
                res += "&gesdot;  " + instruction + ".<br><br>";
            });
        }
        $("#pain-caution-result").html(res);
    })


});