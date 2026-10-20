# Geburtstagsquiz

Ein kleines Quiz als statische Website. Jede Frage erscheint einzeln;

## Lokal starten

```sh
npm install
npm run dev
```

## Fragen bearbeiten

Die Fragen stehen am Anfang von `src/main.js` im Array `questions`. Es gibt fünf Start-Platzhalter:

- `type: 'flag'` zeigt ein Flaggenbild, sobald bei `image` ein Bildpfad eingetragen ist. Lege das Bild dafür in `public/images/` ab und verwende zum Beispiel `./images/flagge.png`.
- `type: 'choice'` zeigt vier Antwortmöglichkeiten. `correct` ist der Index der richtigen Antwort, beginnend bei `0`.
- `type: 'text'` prüft die eingegebene Antwort ohne Beachtung der Groß- und Kleinschreibung.

Fragetext, Kategorie, Antwortmöglichkeiten, richtige Antwort und Erklärung lassen sich direkt im jeweiligen Frageobjekt ändern. Weitere Fragen können als Objekte im Array ergänzt werden.

## Auf GitHub Pages veröffentlichen

1. Lege dieses Projekt in ein GitHub-Repository und pushe es auf `main` oder `master`.
2. Öffne im Repository **Settings → Pages** und wähle bei **Build and deployment** die Quelle **GitHub Actions**.
3. Der Workflow `.github/workflows/deploy.yml` baut und veröffentlicht die Seite bei jedem Push. Die öffentliche Seitenadresse findest du anschließend unter **Settings → Pages**.

Die Geschenk-Level stehen in `renderResults()` in `src/main.js`. Level 2 bleibt unabhängig von der Punktzahl fest vergeben.
