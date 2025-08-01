let salaryCounter = 0;

        function addSalaryField() {
            salaryCounter++;
            const container = document.getElementById('additional-salaries');
            const div = document.createElement('div');
            div.className = 'salary-addition';
            div.innerHTML = `
                <input type="text" placeholder="Nom du complément (ex: Prime, Indemnité...)" id="salary-name-${salaryCounter}">
                <input type="number" step="0.001" min="0" placeholder="Montant (DT)" id="salary-amount-${salaryCounter}">
                <button type="button" class="remove-btn" onclick="removeSalaryField(${salaryCounter})">×</button>
            `;
            container.appendChild(div);
        }

        function removeSalaryField(id) {
            const field = document.querySelector(`#salary-name-${id}`).closest('.salary-addition');
            field.remove();
        }

        document.getElementById('calculer').addEventListener('click', function() {
            // Récupération des valeurs de base
            const isChefFamille = document.getElementById('chef-famille').checked;
            const nbEnfants = parseInt(document.getElementById('enfants').value) || 0;
            const salaireBase = parseFloat(document.getElementById('salaire-base').value) || 0;
            
            // Calcul des compléments de salaire
            let totalComplements = 0;
            const complements = [];
            
            for (let i = 1; i <= salaryCounter; i++) {
                const nameField = document.getElementById(`salary-name-${i}`);
                const amountField = document.getElementById(`salary-amount-${i}`);
                
                if (nameField && amountField) {
                    const name = nameField.value.trim();
                    const amount = parseFloat(amountField.value) || 0;
                    
                    if (name && amount > 0) {
                        complements.push({ name, amount });
                        totalComplements += amount;
                    }
                }
            }
            
            // Calcul du salaire brut
            const salaireBrut = salaireBase + totalComplements;
            
            // 1. Calcul CNSS (9.68% du brut)
            const cnss = salaireBrut * 0.0968;
            
            // 2. Salaire imposable sans déduction
            const salaireImposableSansDeduction = salaireBrut - cnss;
            
            // 3. Déductions
            // a) Professionnelle (10% du salaire imposable, plafond 2000 DT annuel)
            const deductionProAnnuelle = Math.min(salaireImposableSansDeduction * 12 * 0.10, 2000);
            const deductionProMensuelle = deductionProAnnuelle / 12;
            
            // b) Déductions familiales
            let deductionFamille = 0;
            if (isChefFamille) deductionFamille += 300;
            deductionFamille += nbEnfants * 100;
            const deductionFamilleMensuelle = deductionFamille / 12;
            
            // 4. Salaire imposable après déductions
            const salaireImposableAvecDeduction = salaireImposableSansDeduction - deductionProMensuelle - deductionFamilleMensuelle;
            
            // 5. Calcul IRPP (annuel)
            const salaireImposableAnnuel = salaireImposableAvecDeduction * 12;
            let irppAnnuel = 0;
            
            // Barème IRPP
            if (salaireImposableAnnuel > 5000) {
                const tranche = Math.min(salaireImposableAnnuel - 5000, 5000);
                irppAnnuel += tranche * 0.15;
                console.log(tranche);
                console.log(irppAnnuel);
            }
            if (salaireImposableAnnuel > 10000) {
                const tranche = Math.min(salaireImposableAnnuel - 10000, 10000);
                irppAnnuel += tranche * 0.25;
                console.log(tranche);
                console.log(irppAnnuel);
            }
            if (salaireImposableAnnuel > 20000) {
                const tranche = Math.min(salaireImposableAnnuel - 20000, 10000);
                irppAnnuel += tranche * 0.30;
                console.log(tranche);
                console.log(irppAnnuel);
            }
            if (salaireImposableAnnuel > 30000) {
                const tranche = Math.min(salaireImposableAnnuel - 30000, 10000);
                irppAnnuel += tranche * 0.33;
                console.log(tranche);
                console.log(irppAnnuel);
            }
            if (salaireImposableAnnuel > 40000) {
                const tranche = Math.min(salaireImposableAnnuel - 40000, 10000);
                irppAnnuel += tranche * 0.36;
                console.log(tranche);
                console.log(irppAnnuel);
            }
            if (salaireImposableAnnuel > 50000) {
                const tranche = Math.min(salaireImposableAnnuel - 50000, 20000);
                irppAnnuel += tranche * 0.38;
                console.log(tranche);
                console.log(irppAnnuel);
            }
            if (salaireImposableAnnuel > 70000) {
                const tranche = Math.min(salaireImposableAnnuel - 70000, Infinity);
                irppAnnuel += tranche * 0.40;
                console.log(tranche);
                console.log(irppAnnuel);
            }
            const irppMensuel = irppAnnuel / 12;
            
            // 6. Calcul CSS (0.5% du salaire imposable après déductions)
            const css = salaireImposableAvecDeduction * 0.005;
            
            // 7. Salaire net
            const avance = parseFloat(document.getElementById('avance').value) || 0;
            const salaireNet = salaireBrut - cnss - irppMensuel - css - avance;
            
            // Affichage des résultats
            document.getElementById('s-base').textContent = salaireBase.toFixed(3) + ' DT';
            
            // Affichage des compléments
            const additionalBreakdown = document.getElementById('additional-breakdown');
            additionalBreakdown.innerHTML = '';
            complements.forEach(comp => {
                const div = document.createElement('div');
                div.className = 'result-item';
                div.innerHTML = `
                    <span>${comp.name}:</span>
                    <span>${comp.amount.toFixed(3)} DT</span>
                `;
                additionalBreakdown.appendChild(div);
            });

            
            
            document.getElementById('s-brut').textContent = salaireBrut.toFixed(3) + ' DT';
            document.getElementById('s-cnss').textContent = cnss.toFixed(3) + ' DT';
            document.getElementById('s-imposable').textContent = salaireImposableSansDeduction.toFixed(3) + ' DT';
            document.getElementById('s-irpp').textContent = irppMensuel.toFixed(3) + ' DT';
            document.getElementById('s-css').textContent = css.toFixed(3) + ' DT';
            document.getElementById('s-avance').textContent = avance.toFixed(3) + ' DT';
            document.getElementById('s-net').textContent = salaireNet.toFixed(3) + ' DT';
            
            document.getElementById('results').style.display = 'block';
        });

        // Ajouter un premier champ de complément par défaut
        addSalaryField();

        function ficheDePaix() {
            
            year = 2025;
            console.log(year);
            document.getElementById('p-year').textContent = year.toString();

            window.location.href = './template_fiche-de-paix/fiche_de_paix.html';
            
        }