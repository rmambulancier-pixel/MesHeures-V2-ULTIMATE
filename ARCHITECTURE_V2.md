# MesHeures V2 — Architecture finale

## Ce qui fonctionne immédiatement

La totalité du moteur V1 reste dans `scripts/app.js`, avec une nouvelle coque V2 :

- Accueil / cockpit
- navigation mobile
- navigation desktop
- Jour
- Mois
- Paie
- Audit
- Bulletin PDF
- ROMI1 OCR
- imports AmbuTrack
- sauvegarde JSON
- PWA

## Principe de sécurité

Aucune règle métier n'a été supprimée pour rendre l'interface plus jolie.

La refonte V2 est construite autour de la règle :

> préserver les résultats, améliorer l'architecture.

## Moteur métier à modulariser

La prochaine granularité prévue est :

`core/date.js`
`core/defaults.js`
`core/holidays.js`
`core/day.js`
`core/period.js`
`core/payroll.js`
`core/audit.js`

Chaque extraction doit être validée contre le moteur historique.
