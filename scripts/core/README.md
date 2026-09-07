# Moteur métier V2

Le runtime historique `scripts/app.js` reste la source de production afin de conserver les fonctionnalités existantes.

Cette V2 introduit progressivement une séparation :

- dates et formatage
- jours fériés
- paramètres métier
- calcul journée
- calcul quatorzaine
- calcul brut

La migration est volontairement incrémentale : on ne remplace une fonction historique qu'après comparaison des résultats.
