$(document).ready(function () {

    var redList = ["Contraindicated", "Avoid use", "Preferably avoid"];

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

    function noChecks() {
        for (let i = 1; i <= 20; i++)
            if (document.getElementById('pain-caution-check' + i.toString()).checked)
                return false;
        return true;
    }

    function addRow(drugName, instruction, reasons, isRed, countInstructions, firstInstruction) {
        if (reasons.length === 0)
            return "";
        var row = "<tr>";
        if (firstInstruction)
            row += '<th scope="row" rowspan="'
                + countInstructions
                + '">' + drugName + '</th>';
        row += '<td ';
        if (isRed)
            row += 'style="color:red;"';
        else
            row += 'style="text-align:left;"';
        row += '>' + instruction + '</td>'
            + '<td style="text-align:left;">';
        reasons.forEach(reason => {
            if (reasons.length > 1)
                row += '● ';
            row += reason + '<br>';
        });
        row += '</td>'
            + '</tr>';
        return row;
    }


    function addRows(drugName, drug) {
        for (let i = 0; i < redList.length; i++) {
            if (drug.get(redList[i]).length > 0)
                return addRow(
                    drugName,
                    redList[i],
                    drug.get(redList[i]),
                    true,
                    1,
                    true
                );
        }
        var rows = "";
        var firstInstruction = true;
        var countInstructions = 0;
        for (var reasons of drug.values()) {
            if (reasons.length > 0)
                countInstructions++;
        }
        for (var [instruction, reasons] of drug.entries()) {
            var newRow = addRow(
                drugName,
                instruction,
                reasons,
                false,
                countInstructions,
                firstInstruction
            );
            rows += newRow;
            if (newRow !== "")
                firstInstruction = false;
        }
        return rows;
    }

    function initMap() {
        var tempMap = new Map();
        redList.forEach(ele => {
            tempMap.set(ele, []);
        });
        return tempMap;
    }

    $("#pain-caution-checklist-submit").click(function () {
        if (noChecks()) {
            $("#pain-caution-result").html("Their are no required instructions");
            return;
        }
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

        // Drugs
        var acetaminophen = initMap()
        var diclofenac = initMap()
        var meloxicam = initMap()
        var fentanyl = initMap()
        var ketorolac = initMap()
        var morphine = initMap()
        var ketamine = initMap()


        var reason;
        if (renalDisease) {
            if (document.getElementById('pain-renal1').checked) {
                reason = "As GFR> 50ml/min";
                ketorolac.set("Use as 15 to 30 mg IM or IV every 6 hours", [reason]);
            }
            else if (document.getElementById('pain-renal2').checked) {
                reason = "As GFR> 50ml/min";
                ketorolac.set("Preferably avoid or administer 7.5 to 15 mg IM or IV every 6 hours", [reason]);
                fentanyl.set("Administer 75% of the normal fentanyl dose", [reason]);
                morphine.set("Reduce dose by 25%", [reason]);
                meloxicam.set("Not recommended (If CrCl is 20 mL/min or less)", [reason]);
                acetaminophen.set("<b>GFR&lt;30ml/min:</b> used with reduced dosing and prolonged intervals", [reason]);
                meloxicam.set("<b>GFR&gt;20ml/min:</b>used with No dosage adjustment needed", [reason]);
            }
            else {
                reason = "GFR< 30 mL/min";
                acetaminophen.set("Administer at a minimum interval of every 8 hours", [reason]);
                ketorolac.get("Preferably avoid").push(reason);
                fentanyl.set("Administer 50% of the normal fentanyl dose", [reason]);
                morphine.set("Reduce dose by 50% or consider alternative opioid analgesics", [reason]);
                meloxicam.set("Not recommended (If CrCl is 20 mL/min or less)", [reason]);
            }
        }
        if (elderly) {
            reason = "Elderly patients with hepatic impairment";
            fentanyl.set("Initiate at the lower end of the dosing range and titrate slowly", [reason]);
            morphine.set("Initiate at the lower end of the dosing range and titrate slowly (in Elderly) due to increased risk of renal dysfunction", [reason]);
        }
        if (NSAID) {
            reason = "Administration of other NSAIDs";
            ketorolac.get("Contraindicated").push(reason);
            meloxicam.get("Contraindicated").push(reason);
        }

        if (peptic) {
            reason = "Peptic ulcer or GIT bleeding";
            diclofenac.set("Patients should be advised to take diclofenac with food and to immediately report signs and symptoms of GI ulceration", [reason]);
            meloxicam.set("Use the lowest effective dose of meloxicam for the shortest possible duration", [reason]);
        }

        if (liverDisease) {
            if (document.getElementById('pain-liver1').checked) {
                reason = "Severe hepatic impairment";
                acetaminophen.get("Contraindicated").push(reason);
                diclofenac.set("Parenteral use is not recommended", [reason]);
                diclofenac.set("Oral diclofenac(use with caution) start with lowest effective dose if efficacy is not achieved, consider drug discontinuation", [reason]);
                meloxicam.set("Use is not recommended", [reason]);
                fentanyl.set("Use is not recommended", [reason]);
                ketorolac.set("Use with caution, evaluate for hepatotoxicity and discontinue the drug", [reason]);
                morphine.set("Initiate therapy with lower doses and titrate slowly in patients with cirrhosis", [reason]);
            }
            else {
                reason = "Mild - to - moderate hepatic impairment";
                acetaminophen.set("Use with caution", [reason]);
                diclofenac.set("Parenteral use with no dose adjustment is needed", [reason]);
                meloxicam.set("no dose adjustment is needed", [reason]);
                ketorolac.set("use with caution, evaluate for hepatotoxicity and discontinue the drug", [reason]);
                diclofenac.set("Oral diclofenac(use with caution) start with lowest effective dose if efficacy is not achieved, consider drug discontinuation", [reason]);
                morphine.set("Initiate therapy with lower doses and titrate slowly in patients with cirrhosis", [reason]);
            }
            if (pediatric)
                morphine.get("Avoid use").push("Pediatrics with hepatic impairment");
        }

        if (cerebrovascular) {
            reason = "Cerebrovascular manifestation";
            ketorolac.get("Contraindicated").push(reason);
            ketamine.get("Contraindicated").push(reason);
            morphine.get("Contraindicated").push(reason);
        }

        if (highRisk) {
            reason = "Bleeding risk";
            ketorolac.get("Contraindicated").push(reason);
            acetaminophen.set("Long-term oral acetaminophen administration at a dosage of 4 g/day has been shown to have increased INR, monitor INR", [reason]);
        }

        if (brainTumor)
            morphine.get("Contraindicated").push("Brain tumor");

        if (paralyticIleus) {
            fentanyl.get("Contraindicated").push("Paralytic ileus");
            morphine.get("Contraindicated").push("Paralytic ileus");
        }

        if (chronic) {
            fentanyl.get("Contraindicated").push("Bronchial asthma");
            morphine.get("Contraindicated").push("Bronchial asthma");
        }

        if (depressants) {
            reason = "Administration of CNS depressants";
            ketamine.set("Use with caution as ketamine increase the risk of developing respiratory depression", [reason]);
            morphine.get("Contraindicated").push(reason);
        }

        if (heartFailure) {
            reason = "Heart failure";
            diclofenac.set("Monitor potassium level closely while using diclofenac", [reason]);
            morphine.get("Contraindicated").push(reason);
        }

        if (hypertension)
            ketamine.get("Contraindicated").push("Hypertension");

        if (direutics)
            diclofenac.set("Monitor potassium level closely while using diclofenac", ["The use of diuretics or ACEI"]);

        if (alcoholism)
            morphine.get("Contraindicated").push("Acute alcoholism");

        if (thyrotoxicosis)
            ketamine.set("Use with caution", ["Thyrotoxicosis"]);

        if (hypothyroidism)
            morphine.get("Contraindicated").push("Hypothyroidism or Myxedema");

        if (postoperative)
            fentanyl.get("Contraindicated").push("Acute or postoperative pain");

        if (benzodiazepines)
            morphine.get("Contraindicated").push("Benzodiazepines");


        var table = '<table class="table table-bordered">'
            + '<thead class="thead-dark">'
            + '<tr>'
            + '<th scope="col" style="width: 15%">Drug</th>'
            + '<th scope="col" style="width: 60%">Instructions</th>'
            + '<th scope="col" style="width: 25%">Because of</th>'
            + '</tr>'
            + '</thead>'
            + '<tbody>'
            + addRows("Acetaminophen",acetaminophen) 
            + addRows("Diclofenac",diclofenac) 
            + addRows("Meloxicam",meloxicam) 
            + addRows("Fentanyl",fentanyl) 
            + addRows("Ketorolac",ketorolac) 
            + addRows("Morphine",morphine) 
            + addRows("Ketamine",ketamine)
            + '</tbody></table>';


        $("#pain-caution-result").html(table);
    })


});