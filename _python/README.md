# 🎮 Pierre Feuille Ciseaux - Jupyter Notebook

Un jeu interactif de Pierre-Feuille-Ciseaux dans un Jupyter Notebook avec interface stylée, statistiques détaillées et historique des parties.

![Python](https://img.shields.io/badge/python-3.7+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Jupyter](https://img.shields.io/badge/jupyter-notebook-orange.svg)

## 📸 Aperçu

Ce projet transforme le jeu classique Pierre-Feuille-Ciseaux en une expérience interactive enrichie avec :
- 🎨 Interface graphique stylée avec HTML/CSS
- 📊 Statistiques détaillées de vos performances
- 📜 Historique complet de toutes vos parties
- 💾 Sauvegarde et chargement des statistiques
- 🎯 Analyse de vos stratégies de jeu

## 🚀 Installation

### Prérequis
- Python 3.7 ou supérieur
- Jupyter Notebook ou JupyterLab

### Installation rapide

1. Clonez ce dépôt :
```bash
git clone https://github.com/VOTRE_USERNAME/pierre-feuille-ciseaux.git
cd pierre-feuille-ciseaux
```

2. Installez Jupyter si ce n'est pas déjà fait :
```bash
pip install jupyter
```

3. Lancez le notebook :
```bash
jupyter notebook pierre_feuille_ciseaux.ipynb
```

## 🎮 Comment Jouer

1. Ouvrez le notebook dans Jupyter
2. Exécutez les deux premières cellules de configuration
3. Exécutez la cellule "JEU PRINCIPAL"
4. Suivez les instructions à l'écran :
   - Choisissez le nombre de tours
   - Sélectionnez votre coup (1, 2 ou 3)
   - Admirez les résultats stylés !

5. Consultez vos statistiques dans les cellules suivantes

## ✨ Fonctionnalités

### 🎯 Jeu Principal
- Partie personnalisable (nombre de tours au choix)
- Interface colorée et moderne
- Affichage en temps réel du score
- Emojis pour une meilleure visibilité

### 📊 Statistiques
- **Score global** : Victoires, défaites, égalités
- **Taux de victoire** : Pourcentage de réussite
- **Analyse des choix** : Distribution de vos coups et ceux de l'ordinateur
- **Historique détaillé** : Consultez les 10 dernières parties

### 💾 Sauvegarde
- Sauvegardez vos statistiques au format JSON
- Rechargez vos anciennes parties
- Conservez votre progression

## 📁 Structure du Projet

```
pierre-feuille-ciseaux/
├── pierre_feuille_ciseaux.ipynb   # Notebook principal
├── README.md                       # Ce fichier
├── LICENSE                         # Licence MIT
└── game_stats.json                 # Fichier de sauvegarde (créé automatiquement)
```

## 🛠️ Technologies Utilisées

- **Python 3** : Langage principal
- **Jupyter Notebook** : Environnement interactif
- **IPython.display** : Affichage HTML enrichi
- **JSON** : Sauvegarde des données
- **HTML/CSS** : Interface utilisateur

## 📈 Améliorations par Rapport à la Version Originale

| Fonctionnalité | Version Originale | Version Notebook |
|---|---|---|
| Interface | Terminal basique | HTML/CSS stylé |
| Statistiques | Score simple | Stats détaillées + graphiques |
| Historique | Aucun | Historique complet |
| Sauvegarde | Non | Oui (JSON) |
| Réutilisabilité | Script unique | Cellules modulaires |
| Portabilité | Local uniquement | GitHub + Binder |

## 🎓 Utilisation Avancée

### Personnaliser l'Apparence

Vous pouvez modifier les couleurs et styles dans les fonctions HTML. Par exemple, dans `display_round_result()` :

```python
# Changer le gradient de couleur
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
# Remplacer par vos couleurs préférées
```

### Ajouter de Nouvelles Statistiques

Étendez la classe `PierreFeuilleCiseaux` avec vos propres méthodes :

```python
def calculate_winning_streak(self):
    # Votre code ici
    pass
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit vos changements (`git commit -am 'Ajout de fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## 📝 Idées d'Améliorations Futures

- [ ] Mode multijoueur local
- [ ] IA adaptative qui apprend vos habitudes
- [ ] Graphiques de progression avec matplotlib
- [ ] Mode tournoi avec plusieurs adversaires
- [ ] Variantes du jeu (Pierre-Feuille-Ciseaux-Lézard-Spock)
- [ ] Thèmes de couleurs personnalisables
- [ ] Export des statistiques en PDF

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👤 Auteur

Créé avec ❤️ pour jouer et apprendre Python !

## 🙏 Remerciements

- Merci à la communauté Jupyter pour l'excellent environnement de développement
- Inspiration du jeu classique Pierre-Feuille-Ciseaux

---

⭐ N'oubliez pas de mettre une étoile si vous aimez ce projet !

🐛 Trouvé un bug ? Ouvrez une issue !

💡 Une idée ? Proposez-la dans les discussions !
