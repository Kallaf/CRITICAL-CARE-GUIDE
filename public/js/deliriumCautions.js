$(document).ready(function () {

    function noChecks() {
        for (let i = 1; i <= 15; i++)
            if (document.getElementById('delirium-caution-check' + i.toString()).checked)
                return false;
        return true;
    }

    function addRow(drugName, instruction, reasons, isRed, countInstructions, firstInstruction) {
        if (reasons.length === 0)
            return "";
        var row = "<tr>";
        console.log(firstInstruction)
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
        if (drug.get("Contraindicated").length > 0)
            return addRow(
                drugName,
                "Contraindicated",
                drug.get("Contraindicated"),
                true,
                1,
                true
            );
        if (drug.get("Avoid use").length > 0)
            return addRow(
                drugName,
                "Avoid use",
                drug.get("Avoid use"),
                true,
                1,
                true
            );
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

    $("#delirium-caution-checklist-submit").click(function () {
        if (noChecks()) {
            $("#delirium-caution-result").html("Their are no required instructions");
            return;
        }
        var elderly = document.getElementById('delirium-caution-check1').checked;
        var dementia = document.getElementById('delirium-caution-check2').checked;
        var parkinson = document.getElementById('delirium-caution-check3').checked;
        var fractures = document.getElementById('delirium-caution-check4').checked;
        var impairment = document.getElementById('delirium-caution-check5').checked;
        var heartBlock = document.getElementById('delirium-caution-check6').checked;
        var heartFailure = document.getElementById('delirium-caution-check7').checked;
        var cardiac = document.getElementById('delirium-caution-check8').checked;
        var congenital = document.getElementById('delirium-caution-check9').checked;
        var hepatic = document.getElementById('delirium-caution-check10').checked;
        var renal = document.getElementById('delirium-caution-check11').checked;
        var diabetes = document.getElementById('delirium-caution-check12').checked;
        var aspiration = document.getElementById('delirium-caution-check13').checked;
        var preexisting = document.getElementById('delirium-caution-check14').checked;
        var disorder = document.getElementById('delirium-caution-check15').checked;

        // Drugs
        var haloperidol = new Map();
        var olanzapine = new Map();
        var quetiapine = new Map();
        var risperidone = new Map();
        var dexmedetomidine = new Map();

        haloperidol.set("Contraindicated", []);
        olanzapine.set("Contraindicated", []);
        quetiapine.set("Contraindicated", []);
        risperidone.set("Contraindicated", []);
        dexmedetomidine.set("Contraindicated", []);

        haloperidol.set("Avoid use", []);
        olanzapine.set("Avoid use", []);
        quetiapine.set("Avoid use", []);
        risperidone.set("Avoid use", []);
        dexmedetomidine.set("Avoid use", []);

        var reason, instr;
        if (elderly && dementia) {
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
            dexmedetomidine.set("Use with caution", ["Advanced heart block"]);

        if (heartFailure) {
            reason = "Congestive heart failure";
            quetiapine.get("Contraindicated").push(reason);
        }

        if (cardiac) {
            reason = "Cardiac arrhythmia";
            quetiapine.get("Contraindicated").push(reason);
            instr = "Monitor blood pressure and heart"
                + " rate, Bradycardia and hypotension are reported"
            dexmedetomidine.set(instr, [reason]);
        }

        if (congenital) {
            reason = "Congenital long QT syndrome";
            quetiapine.get("Contraindicated").push(reason);
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
            instr = "Use caution in patients with hepatic impairment"
                + "since increase in the free fraction of risperidone reported with"
                + "severe impairment; dosage adjustment recommended";
            risperidone.set(instr, [reason]);
        }

        if (renal) {
            instr = "No dose adjustment is needed";
            reason = "Renal disease";
            dexmedetomidine.set(instr, [reason]);
            olanzapine.set(instr + "(not dialyzable)", [reason]);
            quetiapine.set(instr, [reason]);
            instr = "Use with caution in patients with renal"
                + "impairment since increased plasma concentrations"
                + "reported with severe impairment(CrCl less than 30"
                + "mL / min / 1.73 m(2)) >>>>> dosage adjustment recommended"
            risperidone.set(instr, [reason]);
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
                + " leukopenia or neutropenia >>>>>>> monitoring"
                + " recommended and discontinue if significant WBC decline";
            risperidone.set(instr, [reason]);
        }

        if (disorder) {
            reason = "Seizures disorder";
            instr = "Use caution in patients with history of"
                + " seizure disorder or conditions that lower seizure threshold";
            risperidone.set(instr, [reason]);
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
            + addRows("Haloperidol", haloperidol)
            + addRows("Olanzapine", olanzapine)
            + addRows("Quetiapine", quetiapine)
            + addRows("Risperidone", risperidone)
            + addRows("Dexmedetomidine", dexmedetomidine)
            + '</tbody></table>';


        $("#delirium-caution-result").html(table);
    })


});