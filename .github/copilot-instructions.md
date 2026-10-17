# Projektstatus

- [x] Workspace-Anweisungen angelegt und geprüft.
- [x] Anforderungen geklärt: statisches Geburtstagsquiz mit fünf Platzhalterfragen.
- [x] Vite-Projekt mit Vanilla JavaScript erstellt.
- [x] Quizablauf mit Einzelansicht, Multiple Choice, Freitext, Feedback, Punktestand und Neustart umgesetzt.
- [x] Geschenk-Level 2 bleibt unabhängig von der Punktzahl fest.
- [x] Abhängigkeiten installiert und Produktionsbuild erfolgreich geprüft.
- [x] Keine zusätzlichen Extensions erforderlich.
- [x] Kein separater VS-Code-Task erforderlich; `npm run dev` startet die App.
- [x] Browser-Smoke-Tests für null und fünf richtige Antworten sowie mobile Breite durchgeführt.
- [x] README und GitHub-Pages-Workflow ergänzt.

# Projektkonventionen

- Fragen stehen im Array `questions` am Anfang von `src/main.js`.
- Unterstützte Fragetypen: `flag`, `choice` und `text`.
- Bei Multiple Choice gibt `correct` den nullbasierten Index der richtigen Antwort an.
- Flaggenbilder erhalten einen lokalen Pfad in `image` und einen Alternativtext in `imageAlt`.
- Geschenk-Level und Ergebnistext werden in `renderResults()` gepflegt. Level 2 darf nicht von der Punktzahl abhängen.
- Lokal starten: `npm install`, danach `npm run dev`.
- GitHub Pages wird über `.github/workflows/deploy.yml` für Pushes auf `main` oder `master` veröffentlicht. Im Repository muss GitHub Actions als Pages-Quelle aktiviert sein.