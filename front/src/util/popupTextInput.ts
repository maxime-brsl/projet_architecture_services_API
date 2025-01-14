export function dialogText(titre: string, placeholder: string): Promise<number | null> {
  return new Promise((resolve) => {
    // Crée une div pour la popup
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.backgroundColor = '#fff';
    popup.style.border = '1px solid #ccc';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    popup.style.zIndex = '1000';
    popup.style.width = 'fit-content';

    // Ajoute le titre
    const titreElement = document.createElement('h2');
    titreElement.textContent = titre;
    titreElement.style.marginBottom = '10px';
    popup.appendChild(titreElement);

    // Ajoute un champ d'entrée de texte
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    input.style.width = '90%';
    input.style.padding = '10px';
    input.style.marginBottom = '20px';
    input.style.border = '1px solid #ccc';
    input.style.borderRadius = '5px';
    popup.appendChild(input);

    // Conteneur pour les boutons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'flex-end';
    buttonContainer.style.gap = '10px';

    // Bouton "Confirmer"
    const boutonConfirmer = document.createElement('button');
    boutonConfirmer.textContent = 'Confirmer';
    boutonConfirmer.style.padding = '10px 20px';
    boutonConfirmer.style.border = 'none';
    boutonConfirmer.style.borderRadius = '5px';
    boutonConfirmer.style.backgroundColor = '#4CAF50';
    boutonConfirmer.style.color = '#fff';
    boutonConfirmer.style.cursor = 'pointer';
    boutonConfirmer.style.transition = 'transform 0.2s, background-color 0.2s';

    boutonConfirmer.addEventListener('mouseover', () => {
      boutonConfirmer.style.backgroundColor = '#45a049';
      boutonConfirmer.style.transform = 'scale(1.05)';
    });

    boutonConfirmer.addEventListener('mouseout', () => {
      boutonConfirmer.style.backgroundColor = '#4CAF50';
      boutonConfirmer.style.transform = 'scale(1)';
    });

    // Bouton "Annuler"
    const boutonAnnuler = document.createElement('button');
    boutonAnnuler.textContent = 'Annuler';
    boutonAnnuler.style.padding = '10px 20px';
    boutonAnnuler.style.border = 'none';
    boutonAnnuler.style.borderRadius = '5px';
    boutonAnnuler.style.backgroundColor = '#e63946';
    boutonAnnuler.style.color = '#fff';
    boutonAnnuler.style.cursor = 'pointer';
    boutonAnnuler.style.transition = 'transform 0.2s, background-color 0.2s';

    boutonAnnuler.addEventListener('mouseover', () => {
      boutonAnnuler.style.backgroundColor = '#f77f00';
      boutonAnnuler.style.transform = 'scale(1.05)';
    });

    boutonAnnuler.addEventListener('mouseout', () => {
      boutonAnnuler.style.backgroundColor = '#e63946';
      boutonAnnuler.style.transform = 'scale(1)';
    });

    // Ajout des boutons au conteneur
    buttonContainer.appendChild(boutonConfirmer);
    buttonContainer.appendChild(boutonAnnuler);

    // Ajout du conteneur des boutons à la popup
    popup.appendChild(buttonContainer);

    // Ajoute la popup au document
    document.body.appendChild(popup);

    // Gestion des événements
    boutonConfirmer.addEventListener('click', () => {
      resolve(Number(input.value));
      document.body.removeChild(popup);
    });

    boutonAnnuler.addEventListener('click', () => {
      resolve(null);
      document.body.removeChild(popup);
    });
  });
}
