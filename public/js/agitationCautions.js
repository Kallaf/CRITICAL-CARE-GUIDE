$(document).ready(function () {

    var redList = [
        '<b style="color:red">Discontinue</b> immediately if symptoms are present because PRIS can be life threatening'
        + "<br>Propofol Related Infusion Syndrome (PRIS): This syndrome is a rare but"
        + " life-threatening complication of propofol, generally occurring at doses exceeding 50"
        + " mcg/kg/minute for 48 hours or more",
        '<b style="color:red">Avoid</b> due to its adverse effect of Tachycardia, bradycardia,'
        +'hypertension, hypotension, dry mouth',
        'If used (+ PROPYLENE GLYCOL ) = Toxicity'
        +'<br><b style="color:red">Avoid /Discontinue</b> lorazepam'
        +' (Propylene glycol toxicity can occur with infusions of lorazepam for more than 48 hours,'
        +' particularly at doses of 6–8 hrs)'
    ];

    function noChecks() {
        for (let i = 1; i <= 14; i++)
            if (document.getElementById('agitation-caution-check' + i.toString()).checked)
                return false;
        return true;
    }

    function addRow(drugName, instruction, reasons, countInstructions, firstInstruction) {
        if (reasons.length === 0)
            return "";
        var row = "<tr>";
        if (firstInstruction)
            row += '<th scope="row" rowspan="'
                + countInstructions
                + '">' + drugName + '</th>';
        row += '<td style="text-align:left;">' + instruction + '</td>';
        row += '<td style="text-align:left;">';
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

    $("#agitation-caution-checklist-submit").click(function () {
        if (noChecks()) {
            $("#agitation-caution-result").html("Their are no required instructions");
            return;
        }
        var liver = document.getElementById('agitation-caution-check1').checked;
        var pancreatitis = document.getElementById('agitation-caution-check2').checked;
        var neurological = document.getElementById('agitation-caution-check3').checked;
        var triglyceridrmia = document.getElementById('agitation-caution-check4').checked;
        var decompensated = document.getElementById('agitation-caution-check5').checked;
        var heartBlock = document.getElementById('agitation-caution-check6').checked;
        var osmolar = document.getElementById('agitation-caution-check7').checked;
        var renalFailure = document.getElementById('agitation-caution-check8').checked;
        var renalImpairment = document.getElementById('agitation-caution-check9').checked;
        var respiratoryFailure = document.getElementById('agitation-caution-check10').checked;
        var elderly = document.getElementById('agitation-caution-check11').checked;
        var opioid = document.getElementById('agitation-caution-check12').checked;
        var sepsis = document.getElementById('agitation-caution-check13').checked;
        var intubated = document.getElementById('agitation-caution-check14').checked;

        // Drugs
        var Propofol = initMap()
        var Lorazepam = initMap()
        var Dexmedetomidine = initMap()
        var Midazolam = initMap()

        var reason, instr;

        if (liver) {
            reason = "Liver impairment";
            Propofol.get(redList[0]).push(reason);
            Lorazepam.set("NO dose adjustment but Use with caution as benzodiazepine may worsen Hepatic Encephalopathy", [reason]);
        }

        if (pancreatitis) {
            reason = "Pancreatitis";
            Propofol.get(redList[0]).push(reason);
        }


        if(sepsis || triglyceridrmia || decompensated || neurological)
        {
            var reasons = [];
            if(sepsis)
                reasons.push("Sepsis");
            if (triglyceridrmia)
                reasons.push("History of hyper triglyceridemia");
            if(decompensated)
                reasons.push("Acute decompensated Heart failure");
            if(neurological)
                reasons.push("Neurological injury");
            instr = 'Caution the symptoms of PRIS may be difficult to distinguish from the underlying disease state abnormalities.'
            + "<br>Propofol Related Infusion Syndrome (PRIS): This syndrome is a rare but life-threatening"
            + " complication of propofol, generally occurring at doses exceeding 50 mcg/kg/minute for 48 hours or more";
            Propofol.set(instr,reasons);
        }

        if (heartBlock) {
            reason = "Advanced Heart failure";
            Dexmedetomidine.get(redList[1]).push(reason);
        }

        if (elderly) {
            reason = "Elderly";
            Midazolam.set("Elderly patients may tolerate only 1–2 mg per dose", [reason]);
            Lorazepam.set("Consider reducing dose by 20 - 50 % in Elderly, Chronically ill, and those receiving opioids or other CNS depressants", [reason]);
        }

        if (osmolar) {
            reason = "Osmolar gap or Metabolic acidosis";
            Lorazepam.get(redList[2]).push(reason);
        }

        if (renalFailure) {
            reason = "Unexplained new onset of renal disease";
            Lorazepam.get(redList[2]).push(reason);
        }

        if (respiratoryFailure) {
            reason = "Respiratory Failure";
            Lorazepam.get(redList[2]).push(reason);
        }

        if (opioid) {
            reason = "Administering opioid";
            Propofol.set("Smaller doses are required", [reason]);
        }

        if (intubated) {
            reason = "Intubated Mechanically ventilated";
            Propofol.set("Avoid Rapid Bolus injection and Individualize the dose and titrate to response", [reason]);
        }

        if (renalImpairment) {
            reason = "Renal Impairment";
            Lorazepam.set("If used + Propylene Glycol <br> use of repeated doses may increase risk of propylene glycol toxicity, So Monitor Anionic gap closely as it’s a marker for propylene glycol accumulation", [reason]);
            Midazolam.set("No dose adjustment is needed but Use with caution because t - half of midazolam and its metabolites may be prolonged", [reason]);
        }

        var table = '<table class="table table-bordered">'
            + '<thead class="thead-dark">'
            + '<tr>'
            + '<th scope="col" style="width: 15%">Drug</th>'
            + '<th scope="col" style="width: 60%">Instructions</th>'
            + '<th scope="col" style="width: 25%">Because of</th>'
            + '</tr>'
            + '</thead>'
            + '<tbody>'
            + addRows("Propofol", Propofol)
            + addRows("Lorazepam", Lorazepam)
            + addRows("Dexmedetomidine", Dexmedetomidine)
            + addRows("Midazolam", Midazolam)
            + '</tbody></table>';


        $("#agitation-caution-result").html(table);
    })


});