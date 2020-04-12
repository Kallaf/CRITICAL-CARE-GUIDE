$(document).ready(function () {

    var redList = ["Contraindicated", "Avoid use"];

    function noChecks() {
        for (let i = 1; i <= 19; i++)
            if (document.getElementById('delirium-caution-check' + i.toString()).checked)
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

    $("#delirium-caution-checklist-submit").click(function () {
        if (noChecks()) {
            $("#delirium-caution-result").html("Their are no required instructions");
            return;
        }
        var elderly = document.getElementById('delirium-caution-check1').checked;
        var parkinson = document.getElementById('delirium-caution-check2').checked;
        var fractures = document.getElementById('delirium-caution-check3').checked;
        var impairment = document.getElementById('delirium-caution-check4').checked;
        var heartBlock = document.getElementById('delirium-caution-check5').checked;
        var heartFailure = document.getElementById('delirium-caution-check6').checked;
        var cardiac = document.getElementById('delirium-caution-check7').checked;
        var congenital = document.getElementById('delirium-caution-check8').checked;
        var hepatic = document.getElementById('delirium-caution-check9').checked;
        var renal = document.getElementById('delirium-caution-check10').checked;
        var diabetes = document.getElementById('delirium-caution-check11').checked;
        var aspiration = document.getElementById('delirium-caution-check12').checked;
        var preexisting = document.getElementById('delirium-caution-check13').checked;
        var disorder = document.getElementById('delirium-caution-check14').checked;
        var electrolyte = document.getElementById('delirium-caution-check15').checked;
        var ileus = document.getElementById('delirium-caution-check16').checked;
        var hypotension = document.getElementById('delirium-caution-check17').checked;
        var cerebrovascular = document.getElementById('delirium-caution-check18').checked;
        var phenylketonuria = document.getElementById('delirium-caution-check19').checked;

        // Drugs
        var haloperidol = initMap()
        var olanzapine = initMap()
        var quetiapine = initMap()
        var risperidone = initMap()
        var dexmedetomidine = initMap()

        haloperidol.set("Use with caution ,close monitoring", []);
        olanzapine.set("Use with caution ,close monitoring", []);
        quetiapine.set("Use with caution ,close monitoring", []);
        risperidone.set("Use with caution ,close monitoring", []);
        dexmedetomidine.set("Use with caution ,close monitoring", []);

        var reason, instr;
        if (elderly) {
            reason = "Elderly patient with dementia";
            haloperidol.get("Contraindicated").push(reason);
            olanzapine.get("Contraindicated").push(reason);
            quetiapine.get("Contraindicated").push(reason);
            instr = "Is not approved for the treatment of patients"
                + "with dementia-related psychosis and has not been studied in"
                + "this population";
            risperidone.set(instr, [reason]);
        }

        if (parkinson) {
            reason = "Parkinson disease";
            haloperidol.get("Contraindicated").push(reason);
            risperidone.get("Avoid use").push(reason);
        }

        if (fractures) {
            reason = "History of falls / fractures";
            risperidone.get("Avoid use").push(reason);
        }

        if (impairment) {
            reason = "Cognitive impairments";
            risperidone.get("Avoid use").push(reason);
        }

        if (heartBlock)
            dexmedetomidine.set("Use with caution in patients with heart block, bradycardia, severe ventricular dysfunction, hypovolemia, or chronic hypertension.", ["Cardiovascular disease"]);

        if (heartFailure) {
            reason = "Congestive heart failure";
            quetiapine.get("Contraindicated").push(reason);
        }

        if (cardiac) {
            reason = "Cardiac arrhythmia";
            quetiapine.get("Contraindicated").push(reason);

            instr = "Use caution in patients with a history of conduction abnormalities."
                + "May alter cardiac conduction and prolong the QT interval; life - threatening arrhythmias have occurred"
                + "with therapeutic doses of antipsychotics"
            olanzapine.set(instr, [reason]);
            instr = "Use caution in patients with a history of conduction abnormalities.Relative to other"
                + " neuroleptics, risperidone has a low risk of arrhythmias";
            risperidone.set(instr, [reason]);
        }

        if (congenital) {
            reason = "Congenital long QT syndrome";
            instr = "Use with caution in patients at increased risk of QT prolongation (eg, cardiovascular disease,"
                + "heart failure, cardiac hypertrophy, elderly, family history of QT prolongation"
            quetiapine.set(instr, [reason]);
            risperidone.get("Contraindicated").push(reason);
            haloperidol.get("Use with caution ,close monitoring").push(reason);
        }

        if (hepatic) {
            reason = "Hepatic disease";
            instr = " Dosage adjustment may be necessary -"
                + "monitor liver enzyme (SGOT,SGBT)"
            dexmedetomidine.set(instr, [reason]);
            instr = "No adjustment needed just initial dose"
                + " should be limited to 2.5 to 5 mg daily ,Use with caution in"
                + " cases of hepatitis and liver injuries";
            olanzapine.set(instr, [reason]);
            instr = "For regular release tablets:intial dose 25mg/day increase dose"
                + "daily in increments of 25 to 50 mg/day to the effective dose"
                + " based on response and tolerability"
                + "<br> For extended release tablets: intiate with 50mg/day increase in"
                + " increments of 50 mg/day depending on patient response and tolerability";
            quetiapine.set(instr, [reason]);
            instr = '<b>Oral</b>: Mild or moderate impairment(Child - Pugh class A or B): There are no dosage adjustments provided in'
                + " the manufacturer's labeling; reduce dosage."
                + 'Severe impairment(Child - Pugh class C): Initial: 0.5 mg twice daily; titration should progress slowly in'
                + 'increments of no more than 0.5 mg twice daily; increases to dosages > 1.5 mg twice daily should occur at'
                + 'intervals of ≥1 week.';
            risperidone.set(instr, [reason]);
            haloperidol.set("No dose adjustment", [reason]);
        }

        if (renal) {
            instr = "No dose adjustment is needed";
            reason = "Renal disease";
            dexmedetomidine.set(instr, [reason]);
            olanzapine.set(instr + "(not dialyzable)", [reason]);
            quetiapine.set(instr, [reason]);
            instr = "<b>Oral</b>:Mild or moderate impairment (CrCl ≥30 mL/minute): There are no dosage adjustments provided in the"
                + " manufacturer's labeling; reduce dosage."
                + " Severe impairment (CrCl <30 mL/minute): Initial: 0.5 mg twice daily; titrate slowly in increments of no"
                + " more than 0.5 mg twice daily; increases to dosages >1.5 mg twice daily should occur at intervals of ≥1 week.";
            risperidone.set(instr, [reason]);
            haloperidol.set("No dose adjustment", [reason]);
        }

        if (diabetes) {
            reason = "Diabetes mellitus";
            instr = "Patients with diabetes mellitus or risk factors"
                + " for diabetes mellitus, including obesity and family history,"
                + " are at increased risk of worsening of glucose control or"
                + " severe hyperglycemia >>>> monitoring recommended";
            risperidone.set(instr, [reason]);
        }

        if (preexisting) {
            reason = "Preexisting low WBCS/history of drug induced leukopenia";
            instr = "Agranulocytosis, leukopenia, and"
                + " neutropenia have been reported, especially with"
                + " preexisting low WBC and history of drug - induced"
                + " leukopenia or neutropenia  , absolut neutrophil count less than 1000/mm3) >>>>>>> monitoring"
                + " recommended and discontinue if significant WBC decline";
            risperidone.set(instr, [reason]);
            instr = "Should prompt periodic blood count assessment.Discontinue therapy at first signs of blood"
            + " dyscrasias or if absolute neutrophil count < 1, 000 / mm3";
            haloperidol.set(instr, [reason]);
            instr =  "Should prompt periodic blood count assessment; discontinue therapy with WBC decline"
            + " without other causative factors.Carefully monitor patients with neutropenia for fever and"
            + " signs / symptoms of infection and discontinue therapy if absolute neutrophil count < 1, 000 / mm3."
            quetiapine.set(instr, [reason]);
        }

        if (disorder) {
            reason = "Seizures disorder";
            instr = "Use caution in patients with history of"
                + " seizure disorder or conditions that lower seizure threshold";
            risperidone.set(instr, [reason]);
            haloperidol.set("Use with caution ,close monitoring ", [reason]);
        }

        if (electrolyte) {
            reason = "Electrolyte abnormalities";
            instr = "Use caution in patients with history of"
                + " seizure disorder or conditions that lower seizure threshold";
            risperidone.set(instr, [reason]);
            haloperidol.set("Use with caution ,close monitoring ", [reason]);
        }

        if (ileus)
            haloperidol.get("Use with caution ,close monitoring").push("Paralytic ileus patient");

        if (hypotension)
            risperidone.get("Use with caution ,close monitoring").push("Patient with hypotension");

        if (cerebrovascular)
            risperidone.get("Use with caution ,close monitoring").push("Patient with cerebrovascular diseases eg: stroke, transient ischemic attack");

        if (aspiration)
            risperidone.get("Use with caution ,close monitoring").push("Patient at risk for aspiration pneumonia");

        if (phenylketonuria)
            risperidone.get("Use with caution ,close monitoring").push("Patient with phenylketonuria");

        var table = '<table class="table table-bordered">'
            + '<thead class="thead-dark">'
            + '<tr>'
            + '<th scope="col" style="width: 15%">Drug</th>'
            + '<th scope="col" style="width: 60%">Instructions</th>'
            + '<th scope="col" style="width: 25%">Because of</th>'
            + '</tr>'
            + '</thead>'
            + '<tbody>'
            + addRows("Haloperidol", haloperidol)
            + addRows("Olanzapine", olanzapine)
            + addRows("Quetiapine", quetiapine)
            + addRows("Risperidone", risperidone)
            + addRows("Dexmedetomidine", dexmedetomidine)
            + '</tbody></table>';


        $("#delirium-caution-result").html(table);
    })


});