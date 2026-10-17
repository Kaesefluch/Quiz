import './style.css'

const questions = [
  {
    type: 'flag',
    category: 'Flaggen',
    question: 'Von welchem Land ist diese Flagge?',
    image: '',
    imageAlt: 'Flaggenbild',
    answers: ['Land A', 'Land B', 'Land C', 'Land D'],
    correct: 0,
    note: 'Platzhalter für eine kurze Erklärung zur Flagge.',
  },
  {
    type: 'choice',
    category: 'Geruch',
    question: 'Wie sehr riecht Daniel?',
    answers: ['sehr', 'sehr sehr', 'sehr sehr sehr', 'arg'],
    correct: 0,
    note: 'Platzhalter für die Auflösung dieser Frage.',
  },
  {
    type: 'text',
    category: 'Drogen',
    question: 'Welche Drogen hat Daniel noch nicht genommen?',
    answer: 'Richtige Antwort',
    note: 'Platzhalter für die Auflösung dieser Frage.',
  },
  {
    type: 'choice',
    category: 'Thema eintragen',
    question: 'Platzhalterfrage 4: Frage hier eintragen.',
    answers: ['Antwort A', 'Antwort B', 'Antwort C', 'Antwort D'],
    correct: 0,
    note: 'Platzhalter für die Auflösung dieser Frage.',
  },
  {
    type: 'text',
    category: 'Thema eintragen',
    question: 'Platzhalterfrage 5: Freitextfrage hier eintragen.',
    answer: 'Richtige Antwort',
    note: 'Platzhalter für die Auflösung dieser Frage.',
  },
]

const app = document.querySelector('#app')
let currentQuestion = 0
let score = 0
let locked = false

function render() {
  if (currentQuestion >= questions.length) {
    renderResults()
    return
  }

  const item = questions[currentQuestion]
  const progress = (currentQuestion / questions.length) * 100
  const answerContent = item.type === 'text'
    ? `<form class="text-answer-form">
        <label class="text-answer-label" for="text-answer">Deine Antwort</label>
        <input class="text-answer-input" id="text-answer" name="answer" autocomplete="off" required>
        <button class="next-button" type="submit">Antwort prüfen <span aria-hidden="true">→</span></button>
      </form>`
    : `<div class="answer-list" role="group" aria-label="Antwortmöglichkeiten">
        ${item.answers.map((answer, index) => `
          <button class="answer-option" type="button" data-index="${index}" aria-pressed="false">
            <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
            <span class="answer-text">${answer}</span>
            <span class="answer-mark" aria-hidden="true"></span>
          </button>
        `).join('')}
      </div>`

  app.innerHTML = `
    <main class="quiz-shell">
      <header class="topbar">
        <a class="wordmark" href="#" aria-label="Quiz Start">quiz<span>zeit</span><i aria-hidden="true">.</i></a>
        <div class="round-label"><span class="round-dot"></span> DAS GEBURTSTAGSQUIZ</div>
        <span class="round-label question-count">${currentQuestion + 1} / ${questions.length}</span>
      </header>

      <section class="quiz-layout" aria-labelledby="quiz-title">
        <div class="quiz-main">
          <div class="progress-row">
            <span>FRAGE <strong>${String(currentQuestion + 1).padStart(2, '0')}</strong> <span class="progress-divider">/</span> ${String(questions.length).padStart(2, '0')}</span>
            <span class="score-chip">${score} RICHTIG</span>
          </div>
          <div class="progress-track" role="progressbar" aria-label="Quizfortschritt" aria-valuenow="${currentQuestion}" aria-valuemin="0" aria-valuemax="${questions.length}"><span style="width: ${progress}%"></span></div>

          <div class="question-heading">
            <p class="eyebrow"><span class="eyebrow-line"></span>${item.category}</p>
            <h1 id="quiz-title">${item.question}</h1>
          </div>

          ${item.type === 'flag' ? (item.image
            ? `<img class="flag-image" src="${item.image}" alt="${item.imageAlt}">`
            : '<div class="flag-placeholder" role="img" aria-label="Platzhalter: Flaggenbild hier einsetzen"><span>Flaggenbild hier einsetzen</span></div>') : ''}
          ${answerContent}
          <div class="feedback" aria-live="polite" hidden></div>
          ${item.type === 'text' ? '' : `<div class="action-row">
            <span class="keyboard-hint">ANTWORT AUSWÄHLEN</span>
            <button class="next-button" type="button" disabled>Antwort wählen <span aria-hidden="true">→</span></button>
          </div>`}
        </div>

        <aside class="side-note" aria-label="Geschenk-Hinweis">
          <div class="note-spark" aria-hidden="true">✳</div>
          <p class="note-kicker">KLEINER HINWEIS</p>
          <p class="note-copy">Du stinkst!</p>
          <div class="note-footer"><span>${String(currentQuestion + 1).padStart(2, '0')}</span><span class="note-dash"></span><span>${String(questions.length).padStart(2, '0')}</span></div>
          <div class="note-decoration" aria-hidden="true">Q</div>
        </aside>
      </section>
      <footer class="page-footer"><span>VIEL ERFOLG!</span><span>GEBURTSTAGSQUIZ <span class="footer-dot">●</span> RUNDE 01</span></footer>
    </main>
  `

  app.querySelectorAll('.answer-option').forEach((button) => {
    button.addEventListener('click', () => chooseAnswer(Number(button.dataset.index)))
  })
  app.querySelector('.text-answer-form')?.addEventListener('submit', (event) => {
    event.preventDefault()
    const answer = new FormData(event.currentTarget).get('answer').trim()
    if (answer) showFeedback(answer.toLocaleLowerCase('de') === item.answer.toLocaleLowerCase('de'), item)
  })
}

function chooseAnswer(index) {
  if (locked) return
  const item = questions[currentQuestion]
  app.querySelectorAll('.answer-option').forEach((button) => {
    const answerIndex = Number(button.dataset.index)
    button.setAttribute('aria-pressed', String(answerIndex === index))
    button.classList.add('is-locked')
    if (answerIndex === item.correct) button.classList.add('is-correct')
    else if (answerIndex === index) button.classList.add('is-wrong')
  })
  showFeedback(index === item.correct, item)
}

function showFeedback(isCorrect, item) {
  if (locked) return
  locked = true
  if (isCorrect) score += 1

  const feedback = app.querySelector('.feedback')
  feedback.hidden = false
  feedback.className = `feedback ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`
  feedback.innerHTML = `<span class="feedback-icon" aria-hidden="true">${isCorrect ? '✓' : '!'}</span><span><strong>${isCorrect ? 'Richtig!' : 'Nicht ganz.'}</strong> ${item.note}</span>`

  const nextButton = app.querySelector('.text-answer-form .next-button') || app.querySelector('.action-row .next-button')
  nextButton.disabled = false
  nextButton.innerHTML = `${currentQuestion === questions.length - 1 ? 'Auflösung ansehen' : 'Weiter'} <span aria-hidden="true">→</span>`
  nextButton.type = 'button'
  nextButton.addEventListener('click', advance, { once: true })
  nextButton.focus()
}

function advance() {
  if (!locked) return
  currentQuestion += 1
  locked = false
  render()
}

function renderResults() {
  const percentage = Math.round((score / questions.length) * 100)

  app.innerHTML = `
    <main class="quiz-shell results-shell">
      <header class="topbar">
        <a class="wordmark" href="#" aria-label="Quiz Start">quiz<span>zeit</span><i aria-hidden="true">.</i></a>
        <div class="round-label"><span class="round-dot"></span> RUNDE ABGESCHLOSSEN</div>
        <span class="results-stamp" aria-hidden="true">✓</span>
      </header>
      <section class="results-content" aria-labelledby="results-title">
        <div class="results-label"><span class="eyebrow-line"></span> DEINE AUFLÖSUNG</div>
        <div class="results-score"><span>${score}</span><span class="results-total">/ ${questions.length}</span></div>
        <h1 id="results-title">Du hast ${score} von ${questions.length} Fragen richtig beantwortet.</h1>
        <p class="results-copy">Das bedeutet: Geschenk-Level 2. Und keine Sorge: Das Geburtstagsgeschenk steht fest, auch wenn ein paar Fragen ziemlich knifflig waren.</p>
        <div class="result-meter" role="img" aria-label="${percentage} Prozent richtig"><span style="width: ${percentage}%"></span></div>
        <div class="gift-levels" aria-label="Geschenk-Level">
          <div class="gift-level"><span>LEVEL 1</span><strong>Ein Stück Hundekot</strong><small>Zum Glück nicht deins.</small></div>
          <div class="gift-level gift-level-won"><span>LEVEL 2 · DEIN LEVEL</span><strong>Überraschung (es ist Geld)</strong><small>Ist schon fest eingeplant.</small></div>
          <div class="gift-level"><span>LEVEL 3</span><strong>Ein niegelnagel neuer Ferrari</strong><small>Vielleicht beim nächsten Geburtstag.</small></div>
        </div>
        <button class="restart-button" type="button">Noch mal spielen <span aria-hidden="true">↻</span></button>
      </section>
      <footer class="page-footer"><span>DANKE FÜRS MITRATEN.</span><span>GESCHENK-LEVEL 2 <span class="footer-dot">●</span> FESTGESETZT</span></footer>
    </main>
  `
  app.querySelector('.restart-button').addEventListener('click', restart)
}

function restart() {
  currentQuestion = 0
  score = 0
  locked = false
  render()
}

render()