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

    // Ajoute le titre
    const titreElement = document.createElement('h2');
    titreElement.textContent = titre;
    titreElement.style.marginBottom = '10px';
    popup.appendChild(titreElement);

    // Ajoute un champ d'entrée de texte
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    input.style.width = '100%';
    input.style.padding = '10px';
    input.style.marginBottom = '10px';
    input.style.border = '1px solid #ccc';
    input.style.borderRadius = '5px';
    popup.appendChild(input);

    // Ajoute les boutons
    const boutonConfirmer = document.createElement('button');
    boutonConfirmer.textContent = 'Confirmer';
    boutonConfirmer.style.marginRight = '10px';
    boutonConfirmer.style.padding = '10px 20px';
    boutonConfirmer.style.border = 'none';
    boutonConfirmer.style.borderRadius = '5px';
    boutonConfirmer.style.backgroundColor = '#4CAF50';
    boutonConfirmer.style.color = '#fff';
    boutonConfirmer.style.cursor = 'pointer';

    const boutonAnnuler = document.createElement('button');
    boutonAnnuler.textContent = 'Annuler';
    boutonAnnuler.style.padding = '10px 20px';
    boutonAnnuler.style.border = 'none';
    boutonAnnuler.style.borderRadius = '5px';
    boutonAnnuler.style.backgroundColor = '#f44336';
    boutonAnnuler.style.color = '#fff';
    boutonAnnuler.style.cursor = 'pointer';

    popup.appendChild(boutonConfirmer);
    popup.appendChild(boutonAnnuler);

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
