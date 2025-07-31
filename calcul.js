document.getElementById('calculer').addEventListener('click', function() {
            // Récupération des valeurs
            const isChefFamille = document.getElementById('chef-famille').checked;
            const nbEnfants = parseInt(document.getElementById('enfants').value) || 0;
            const salaireBrut = parseFloat(document.getElementById('salaire-brut').value) || 0;
            
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
            }
            if (salaireImposableAnnuel > 10000) {
                const tranche = Math.min(salaireImposableAnnuel - 10000, 10000);
                irppAnnuel += tranche * 0.25;
            }
            if (salaireImposableAnnuel > 20000) {
                const tranche = Math.min(salaireImposableAnnuel - 20000, 10000);
                irppAnnuel += tranche * 0.30;
            }
            if (salaireImposableAnnuel > 30000) {
                const tranche = Math.min(salaireImposableAnnuel - 30000, 10000);
                irppAnnuel += tranche * 0.33;
            }
            if (salaireImposableAnnuel > 40000) {
                const tranche = salaireImposableAnnuel - 40000;
                irppAnnuel += tranche * 0.36;
            }
            if (salaireImposableAnnuel > 50000) {
                const tranche = salaireImposableAnnuel - 50000;
                irppAnnuel += tranche * 0.40;
            }
            
            const irppMensuel = irppAnnuel / 12;
            
            // 6. Calcul CSS (0.5% du salaire imposable après déductions)
            const css = salaireImposableAvecDeduction * 0.005;
            
            // 7. Salaire net

            const avance = parseFloat(document.getElementById('avance').value) || 0;

            const salaireNet = salaireBrut-cnss - irppMensuel - css - avance;
            
            // Affichage des résultats
            document.getElementById('s-brut').textContent = salaireBrut.toFixed(3) + ' DT';
            document.getElementById('s-cnss').textContent = cnss.toFixed(3) + ' DT';
            document.getElementById('s-imposable').textContent = salaireImposableSansDeduction.toFixed(3) + ' DT';
            document.getElementById('s-irpp').textContent = irppMensuel.toFixed(3) + ' DT';
            document.getElementById('s-css').textContent = css.toFixed(3) + ' DT';
                        document.getElementById('s-avance').textContent = avance.toFixed(3) + ' DT';

            document.getElementById('s-net').textContent = salaireNet.toFixed(3) + ' DT';
            
            document.getElementById('results').style.display = 'block';
        });


//implementation dans le fiche de paix template

