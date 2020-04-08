$(document).ready(function () {

    var redList = ["Contraindicated"];

    function noChecks() {
        for (let i = 1; i <= 21; i++)
            if (document.getElementById('paralytics-caution-check' + i.toString()).checked)
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

    $("#paralytics-caution-checklist-submit").click(function () {
        if (noChecks()) {
            $("#paralytics-caution-result").html("Their are no required instructions");
            return;
        }
        var liver = document.getElementById('paralytics-caution-check1').checked;
        var renal = document.getElementById('paralytics-caution-check2').checked;
        var copd = document.getElementById('paralytics-caution-check3').checked;
        var respiratory = document.getElementById('paralytics-caution-check4').checked;
        var asthma = document.getElementById('paralytics-caution-check5').checked;
        var lung = document.getElementById('paralytics-caution-check6').checked;
        var geriatrics = document.getElementById('paralytics-caution-check7').checked;
        var myasthenia = document.getElementById('paralytics-caution-check8').checked;
        var myopathy = document.getElementById('paralytics-caution-check9').checked;
        var neuromuscular = document.getElementById('paralytics-caution-check10').checked;
        var obesity = document.getElementById('paralytics-caution-check11').checked;
        var electrolyte = document.getElementById('paralytics-caution-check12').checked;
        var adrenal = document.getElementById('paralytics-caution-check13').checked;
        var acid = document.getElementById('paralytics-caution-check14').checked;
        var dehydration = document.getElementById('paralytics-caution-check15').checked;
        var cardiac = document.getElementById('paralytics-caution-check16').checked;
        var edema = document.getElementById('paralytics-caution-check17').checked;
        var malignant = document.getElementById('paralytics-caution-check18').checked;
        var tachycardia = document.getElementById('paralytics-caution-check19').checked;
        var burns = document.getElementById('paralytics-caution-check20').checked;
        var neonates = document.getElementById('paralytics-caution-check21').checked;

        // Drugs
        var Pancuronium = initMap()
        var Cisatracurium = initMap()
        var Rocuronium = initMap()
        var Succinylcholine = initMap()
        var Vecuronium = initMap()

        var reason, instr;

        if (liver) {
            reason = "Hepatic impairment";
            instr = "Use with caution in patients with hepatic disease, dose reduction may be necessary.";
            Pancuronium.set(instr, [reason]);
            instr = "- No dosage adjustments are needed."
                + "<br>- Monitor the level of neuromuscular blockade during long-term cisatracurium"
                + " administration with a nerve stimulator, titrate cisatracurium administration"
                + " to the patients' needs and limit exposure to toxic metabolites.";
            Cisatracurium.set(instr, [reason]);
            instr = "- Use with caution in patients with hepatic disease"
                + "<br>- Specific guidelines for dosage adjustments in hepatic impairment are not available."
                + "<br>- Patients may have a prolonged clinical effect up to 1.5 times that of patients with"
                + " normal hepatic function.In addition, patients with hepatic dysfunction"
                + " have a larger volume of distribution and may require larger doses to"
                + " initially achieve adequate neuromuscular blockade";
            Rocuronium.set(instr, [reason]);
            instr = "- Use with caution due to delayed onset or prolonged duration of paralysis can occur"
                + "<br>- Specific guidelines for dosage adjustments in hepatic impairment are not available"
                + "<br>- No dosage adjustments are needed.";
            Succinylcholine.set(instr, [reason]);
            instr = "- Hepatic impairment may prolong the duration of action of vecuronium."
                + "<br>- Specific guidelines for dosage adjustments in hepatic impairment are not available."
                + "<br>- Use with caution , prolonged recovery may occur."
                + "<br>- Dosage reduction or extended dosing interval may be necessary.";
            Vecuronium.set(instr, [reason]);
        }

        if (renal) {
            reason = "Renal impairment";
            instr = "- <b>CrCl > 50 mL / minute / 1.73 m2:</b> No initial dosage adjustment required; monitor"
                + " carefully and adjust dosage to clinical effect(Because of renal impairment)."
                + "<br>- <b>CrCl 10 to 50 mL / minute / 1.73 m2:</b> Administer 50 % of normal dosage;"
                + " monitor carefully and adjust dosage to clinical effect(Because of renal impairment)."
                + '<br>- <b> CrCl < 10 mL / minute / 1.73 m2:</b> <b style="color:red;">Avoid use</b>';
            Pancuronium.set(instr, [reason]);
            instr = "- Specific guidelines for dosage adjustments in renal impairment are not available"
                + "<br>- No dosage adjustments are needed."
                + "<br>- Extending the interval between cisatracurium administration and the intubation"
                + " attempt may be required to achieve adequate intubation conditions."
                + "<br>- Monitor the level of neuromuscular blockade during long-term cisatracurium"
                + " administration with a nerve stimulator, titrate cisatracurium administration to"
                + " the patients' needs and limit exposure to toxic metabolites."
                + "<br>- Patients receiving extended administration of cisatracurium may be at higher risk of"
                + " seizures due to higher metabolite concentrations including laudanosine an"
                + " active metabolite has been associated with seizures in animals.";
            Cisatracurium.set(instr, [reason]);
            instr = "- Specific guidelines for dosage adjustments in renal impairment are not available."
                + "<br>- Patients with renal failure may have greater variability in duration of clinical effect."
                + "<br>- Follow usual dosing guidelines and individualize the dose to the needs of the patient.";
            Rocuronium.set(instr, [reason]);
            instr = "- Specific guidelines for dosage adjustments in renal impairment are not available."
                + "<br>- No dosage adjustments are needed."
            Succinylcholine.set(instr, [reason]);
            instr = "- Renal failure may prolong the duration of action of vecuronium."
                + "<br>- Specific guidelines for dosage adjustments in patients with renal impairment and failure are not available."
                + "<br>- Dose reduction or extended dosing interval may be necessary.";
            Vecuronium.set(instr, [reason]);
        }

        if (asthma) {
            instr = "Use with caution as NMBAs stimulate histamine release which could exacerbate asthma.";
            reason = "Asthma";
            Pancuronium.set(instr, [reason]);
            Cisatracurium.set(instr, [reason]);
            Rocuronium.set(instr, [reason]);
            Succinylcholine.set(instr, [reason]);
            Vecuronium.set(instr, [reason]);
        }

        if (copd || respiratory) {
            var reasons = [];
            if (copd) reasons.push("COPD");
            if (respiratory) reasons.push("Respiratory disease");
            instr = "Use with extreme caution as NMBA cause muscle paralysis."
                + "Carefully monitor respiratory status and adequacy of ventilation after drug"
                + " recovery until the patient is clearly stabilized.";
            Pancuronium.set(instr, reasons);
            instr = "Use with caution.Carefully monitor respiratory status and"
                + " adequacy of ventilation after drug recovery until the patient is clearly stabilized.";
            Cisatracurium.set(instr, reasons);
            Rocuronium.set(instr, reasons);
            Succinylcholine.set(instr, reasons);
            Vecuronium.set(instr, reasons);
        }

        if (lung || geriatrics || obesity || myasthenia || myopathy || neuromuscular) {
            var reasons = [];
            if(lung)reasons.push("Lung cancer");
            if(geriatrics)reasons.push("Geriatrics");
            if (obesity) reasons.push("Obesity");
            if (myasthenia) reasons.push("Myasthenia gravis");
            if (myopathy) reasons.push("Myopathy");
            if (neuromuscular) reasons.push("Neuromuscular disease");
            instr = "− An initial dose of 0.02 mg/kg or less intravenously."
                + "- Monitor patients carefully until recovery is fully complete.";
            Cisatracurium.set(instr, reasons);
            instr = "- Use with caution as patient can experience prolonged or"
                + "exaggerated neuromuscular blocking effect."
                + "<br>- Monitor patients carefully until recovery is fully complete.";
            Rocuronium.set(instr, reasons);
            Vecuronium.set(instr, reasons);
        }

        if(electrolyte)
        {
            reason = "Electrolyte imbalance";
            instr = "Use with caution in patients as electrolyte imbalance alter patient"
            + " sensitivity to neuromuscular blocking agent.";
            Rocuronium.set(instr, [reason]);
            Cisatracurium.set(instr, [reason]);
            Vecuronium.set(instr, [reason]);
        }

        if(adrenal)
        {
            reason = "Adrenal insufficiency";
            instr = "Use with caution in patients with electrolyte imbalance as adrenal"
            + " insufficiency alter patient sensitivity to neuromuscular blocking agent.";
            Rocuronium.set(instr, [reason]);
            Cisatracurium.set(instr, [reason]);
            Vecuronium.set(instr, [reason]);
        }

        if(acid || dehydration)
        {
            var reasons = [];
            if(acid)reasons.push("Acid-base imbalance");
            if(dehydration)reasons.push("Dehydration");
            instr = "Use with caution as dehydration increase a patient's sensitivity to NMBAs.";
            Rocuronium.set(instr, reasons);
            Cisatracurium.set(instr, reasons);
            Vecuronium.set(instr, reasons);
        }

        if(cardiac || edema)
        {
            var reasons = [];
            if(cardiac)reasons.push("Cardiac disease");
            if(edema)reasons.push("Edema");
            instr = "Use with caution.";
            Pancuronium.set(instr, reasons);
        }

        if(malignant)
        {
            reason = "Malignant hyperthermia";
            Pancuronium.set("Use with extreme caution.",[reason]);
            instr = " use with caution as rocuronium is capable of triggering hyperthermia";
            Rocuronium.set(instr, [reason]);
        }

        if(tachycardia)
            Pancuronium.set("Use with caution because pancuronium increases the heart rate.",["Tachycardia"]);

        if(burns)
            Pancuronium.set("Increased doses may be required, as Patients with extensive burns can exhibit a decreased response to the effects of pancuronium.",["Burns"]);


        if(neonates)
        {
            reason =  "Neonate";
            Pancuronium.get("Contraindicated").push(reason);
            Cisatracurium.get("Contraindicated").push(reason);
            Rocuronium.set("Should be initiated at the lower end of the dosing range.",[reason]);
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
            + addRows("Pancuronium", Pancuronium)
            + addRows("Cisatracurium", Cisatracurium)
            + addRows("Rocuronium", Rocuronium)
            + addRows("Succinylcholine", Succinylcholine)
            + addRows("Vecuronium", Vecuronium)
            + '</tbody></table>';


        $("#paralytics-caution-result").html(table);
    })


});