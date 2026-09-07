# MesHeures V2 Ultimate

Cette version ne se contente plus d'ajouter une interface autour de la V1.

Le runtime de production appelle désormais le moteur modulaire :

- `scripts/core/engine.js`
  - `calcDay`
  - `calcPeriod`

L'interface historique reste conservée pour maintenir les modules Jour, Mois, Paie, Audit, Bulletin et ROMI1.

Objectif atteint dans cette livraison : les calculs les plus critiques ne sont plus enfermés uniquement dans le gros fichier historique.
