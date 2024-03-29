/*-- DÉBUT : Drip Content paiement en plusieurs fois combiné --*/

window.addEventListener('load', function() {
    function calculateDaysLeft(startDate, daysToAdd) {
      if (!startDate) {
        console.error('La date de début est undefined.');
        return 0; // Ou toute autre valeur par défaut que vous voulez retourner dans ce cas.
      }
  
      var futureDate = new Date(startDate.getTime());
      futureDate.setDate(futureDate.getDate() + daysToAdd);
      return Math.max(Math.floor((futureDate - new Date()) / (1000 * 60 * 60 * 24)), 0);
    }
  
    function checkMemberPlan() {
      var userData = JSON.parse(localStorage.getItem('_ms-mem'));
      console.log('User data:', userData);
  
      if (userData && userData.metaData && userData.planConnections) {
        var miniPackPlanIds = [
          "pln_le-mini-pack-webflow-3-fois--lsj50wev"
        ];
        var megaPackPlanIds = [
          "pln_le-mega-pack-webflow-3-fois--tnkm02zj"
        ];
        var individualPlanIds = [
          "pln_coriace-client-first-d-butant-tv510vvg",
          "pln_coriace-webflow-cookies-2t4s03hj",
          "pln_coriace-webflow-th-orie-kb500c0t",
          "pln_coriace-udesly-webflow-vers-shopify-tf510c18",
          "pln_le-mini-pack-webflow-2kje0tkt",
          "pln_le-mega-pack-webflow-2ljs0t3b",
          "pln_formation-simple-trimestriel-7rj80985",
          "pln_formation-simple-semestriel-tnh604fc",
          "pln_formation-simple-annuel-gyh704ly",
          "pln_formation-accompagn-e-trimestriel-fih804b7",
          "pln_formation-accompagn-e-semestriel-7ij9096p",
          "pln_formation-accompagn-e-annuel-b6ha045g",
          "pln_formation-et-assistance-trimestriel-plja09y7",
          "pln_formation-et-assistance-semestriel-vohd04oh",
          "pln_formation-et-assistance-annuel-wkhe043e"
        ];
  
        var hasSpecialPlan = userData.planConnections.some(plan => {
        return miniPackPlanIds.includes(plan.planId) && plan.status === "ACTIVE";
        }) || userData.planConnections.some(plan => {
          return megaPackPlanIds.includes(plan.planId) && plan.status === "ACTIVE";
        });
        console.log('Has special plan:', hasSpecialPlan);
        
        var hasIndividualPlan = userData.planConnections.some(plan => {
          return individualPlanIds.includes(plan.planId) && plan.status === "ACTIVE";
        });
        console.log('Has individual plan:', hasIndividualPlan);
  
        var hasMiniPackPlan = userData.planConnections.some(plan => miniPackPlanIds.includes(plan.planId) && plan.status === "ACTIVE");
        var hasMegaPackPlan = userData.planConnections.some(plan => megaPackPlanIds.includes(plan.planId) && plan.status === "ACTIVE");
  
        var startDate;
          if (hasMiniPackPlan) {
            startDate = new Date(userData.metaData.start_date_wf_minipack);
          } else if (hasMegaPackPlan) {
            startDate = new Date(userData.metaData.start_date_wf_megapack);
          }
        var daysForLevel2 = 30;
        var daysForLevel3 = 60;
        var daysSinceStart = Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24));
  
        var accessLevel = 1;
        if (daysSinceStart >= daysForLevel2) { accessLevel = 2; }
        if (daysSinceStart >= daysForLevel3) { accessLevel = 3; }
  
        var timeLeftForLevel2 = calculateDaysLeft(startDate, daysForLevel2);
        console.log('Time left for level 2:', timeLeftForLevel2);
        var timeLeftForLevel3 = calculateDaysLeft(startDate, daysForLevel3);
        console.log('Time left for level 3:', timeLeftForLevel3);

        var timeLeftSpanLevel2 = document.querySelector('[data-drip-content="courseTimeLeft2"]');
        var timeLeftSpanLevel3 = document.querySelector('[data-drip-content="courseTimeLeft3"]');
  
        document.querySelectorAll('[data-drip-content="courseTimeLeft2"]').forEach(function(span) {
            span.textContent = timeLeftForLevel2.toString();
        });
        document.querySelectorAll('[data-drip-content="courseTimeLeft3"]').forEach(function(span) {
            span.textContent = timeLeftForLevel3.toString();
        });

          
        var courseTimeLeftCard1 = document.querySelectorAll('[data-drip-content="courseTimeLeftCard1"]');
        var courseTimeLeftCard2 = document.querySelectorAll('[data-drip-content="courseTimeLeftCard2"]');
        var courseTimeLeftPrice = document.querySelectorAll('[data-drip-content="courseTimeLeftPrice"]');
        var courseTimeLeftButton = document.querySelectorAll('[data-drip-content="courseTimeLeftButton"]');
        var courseTimeName1 = document.querySelectorAll('[data-drip-content="courseTimeName1"]');
        var courseTimeName2 = document.querySelectorAll('[data-drip-content="courseTimeName2"]');
        var echeancePayment2 = document.querySelectorAll('[data-drip-content="echeancePayment2"]');
        var echeancePayment3 = document.querySelectorAll('[data-drip-content="echeancePayment3"]');

  
        
        if (daysSinceStart >= daysForLevel2) {
          // Masquer les cartes pour le niveau 2
          courseTimeLeftCard2.forEach(function(card) { card.style.display = 'none'; });
    
          if (hasMiniPackPlan) {
            courseTimeLeftPrice.forEach(function(price) { price.textContent = "52€"; });
            courseTimeLeftButton.forEach(function(button) { button.href = "https://order.coriace.co/formation/commande-mini-pack-webflow-52/etape/commande-mini-pack-webflow-52/"; });
            echeancePayment2.forEach(function(payment) { payment.textContent = "2ème échéance"; });
          }
    
          if (hasMegaPackPlan) {
            courseTimeLeftPrice.forEach(function(price) { price.textContent = "116€"; });
            courseTimeLeftButton.forEach(function(button) { button.href = "https://order.coriace.co/formation/commande-mega-pack-webflow-116/etape/commande-mega-pack-webflow-116/"; });
            // Pas de mise à jour spécifique pour echeancePayment2 ici, ajustez selon besoin
          }
        } else {
          // Logique pour le prix et les liens avant d'atteindre le niveau 2
          if (hasMiniPackPlan) {
            courseTimeLeftPrice.forEach(function(price) { price.textContent = "104€"; });
            courseTimeLeftButton.forEach(function(button) { button.href = "https://order.coriace.co/formation/commande-mini-pack-webflow-104/etape/commande-mini-pack-webflow-104/"; });
            echeancePayment3.forEach(function(payment) { payment.textContent = "3ème échéance"; });
          }
    
          if (hasMegaPackPlan) {
            courseTimeLeftPrice.forEach(function(price) { price.textContent = "232€"; });
            courseTimeLeftButton.forEach(function(button) { button.href = "https://order.coriace.co/formation/commande-mega-pack-webflow-232/etape/commande-mega-pack-webflow-232/"; });
            // Pas de mise à jour spécifique pour echeancePayment3 ici, ajustez selon besoin
          }
        }
  
        // Ajustement du contenu pour tous les items de cours
        document.querySelectorAll('.course_lesson-item').forEach(function(item) {
            // Vérification pour les plans individuels
            var itemPlanId = item.getAttribute('data-plan-id');
            if (hasIndividualPlan && individualPlanIds.includes(itemPlanId)) {
            console.log('Item matches an individual plan, adjusting display...');
            var lessonMask = item.querySelector('.course_lesson-mask');
            item.style.opacity = '1';
            if (lessonMask) lessonMask.style.display = 'none';
            }
            // Vérification pour les packs en fonction de l'access level
            else if (!hasIndividualPlan && (hasMiniPackPlan || hasMegaPackPlan)) {
            var paidIdAttribute = hasMiniPackPlan ? 'data-minipack-paid-id' : 'data-megapack-paid-id';
            var paidId = parseInt(item.getAttribute(paidIdAttribute), 10);
            console.log('Processing lesson item, Paid ID:', paidId, 'Access Level:', accessLevel);
            var lessonMask = item.querySelector('.course_lesson-mask');

            if (paidId > accessLevel) {
                console.log('Content blocked, Paid ID:', paidId, '> Access Level:', accessLevel);
                item.style.opacity = '0.5';
                if (lessonMask) lessonMask.style.display = 'block';
            } else {
                console.log('Content accessible, Paid ID:', paidId, '<= Access Level:', accessLevel);
                item.style.opacity = '1';
                if (lessonMask) lessonMask.style.display = 'none';
            }
            }
        });
        
        var courseNavigation = document.getElementById('courseNavigation');
        var allItemsActive = accessLevel >= 3 || hasSpecialPlan;
        console.log('All items active:', allItemsActive, 'Access Level:', accessLevel, 'Special Plan:', hasSpecialPlan);
        
        if (!allItemsActive && courseNavigation) {
            console.log('Course navigation hidden due to access level or lack of special plan.');
            courseNavigation.style.display = 'none';
          } else if (courseNavigation) {
            console.log('Course navigation displayed.');
            courseNavigation.style.display = 'flex';
          }
        } else {
          console.log("Les informations du membre ne sont pas disponibles dans le localStorage ou la date de début est manquante.");
        }
      }
    
      checkMemberPlan();
    });
    
  
  /*-- FIN : Drip Content paiement en plusieurs fois combiné --*/
