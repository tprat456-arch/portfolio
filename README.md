# Portfolio BTS SIO (SLAM)

Un portfolio statique inspiré de https://portfolio-younes.fr avec sections: Accueil, À propos, CV, Projets, Veille, Contact.

## Structure
- `index.html`: page principale avec Tailwind via CDN.
- `assets/js/main.js`: chargement dynamique des projets et de la veille.
- `data/projects.json`: liste des projets à éditer.
- `data/veille.json`: éléments de veille à éditer.
- `CV Design Web.pdf`: placer votre CV (déjà présent chez vous).

## Modifier le contenu
- Ouvrez `index.html` pour changer le nom, l'intro, les coordonnées (section `#contact`).
- Ajoutez/éditez vos projets dans `data/projects.json`.
- Ajoutez/éditez votre veille dans `data/veille.json`.
- Le bouton "Télécharger le PDF" pointe vers `CV Design Web.pdf`.

## Lancer en local
Ouvrez `index.html` dans votre navigateur. Pour charger les JSON localement, certains navigateurs nécessitent un petit serveur statique.

### Option rapide (Python)
```bash
python -m http.server 8000
```
Puis ouvrez http://localhost:8000

### Option VS Code
- Installez l'extension Live Server.
- Clic droit `index.html` > "Open with Live Server".

## Déploiement (Netlify recommandé)
1. Créez un dépôt Git (GitHub/GitLab).
2. Poussez les fichiers.
3. Sur https://app.netlify.com > New site from Git > connectez votre repo > build command: (vide), publish directory: `/`.
4. Netlify fournit une URL publique (ex: `https://votre-portfolio.netlify.app`).

Alternatives: GitHub Pages (branche `main`, dossier racine).

## Personnalisation du style
- Palette sombre déjà activée.
- Modifiez la config Tailwind inline dans `index.html` pour les couleurs.
- Ajoutez des images, un avatar ou captures dans la section Accueil.

## Licence
Usage académique.
