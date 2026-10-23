import './style.css'
import mozambiqueFlag from './Pics/Flag_of_Mozambique.svg'
import lulaImage from './Pics/Lula.webp'
import beerImage from './Pics/Bier.jpg'
import nagaImage from './Pics/naga.png'
import yayoSound from './Sounds/yayoSound.mp3'
import resultSound from './Sounds/yippee.mp3'

const questions = [
  {
    type: 'flag',
    category: 'Flaggen',
    question: 'Welchem Land gehört diese Flagge?',
    image: mozambiqueFlag,
    imageAlt: 'Flaggenbild',
    answers: ['Mosambik', 'Malawi', 'Tansania', 'Angola'],
    correct: 0,
    note: 'Tiefgründig: Brrakka brakkka AK47 Jonge!',
  },
  {
    type: 'choice',
    category: 'Nahrungsmittel',
    question: 'Nach welchem Gericht der nah-östlichen Küche wurde der brasilianische Präsident benannt?',
    answers: ['Döner', 'Lula Kababi', 'Kümmel', 'Pizza'],
    correct: 1,
    note: 'Spannend: Tatsächlich wurde der brasilianische Präsident Luiz Inácio Lula da Silva nach dem Gericht "Lula Kababi" benannt.',
    noteImage: lulaImage,
    noteImageAlt: 'Bild von Lula',
  },
   {
    type: 'text',
    category: 'Schornsteinfeger',
    question: 'Was ist der Unterschied zwischen einer Elster und einem Schornsteinfeger?',
    answer: 'Die Elster hat einen weißen Körper und einen schwarzen Schwanz, der Schornsteinfeger hat eine Leiter',
    note: 'Die Elster hat einen weißen Körper und einen schwarzen Schwanz, der Schornsteinfeger hat eine Leiter',
  },
  {
    type: 'text',
    category: 'Kurzzeitgedächtnis',
    question: 'Wie lautet der vollständige Name des brasilianischen Präsidenten?',
    answer: 'Luiz Inácio Lula da Silva',
    note: 'Training: Hier werden die Gehirnknoten trainiert. Richtig ist: Luiz Inácio Lula da Silva',
  },
  {
    type: 'choice',
    category: 'Chemie',
    question: 'Ist es möglich den Namen "Daniel" aus Elementsymbolen des Periodensystems zu bilden?',
    answers: ['Ja', 'Nein'],
    correct: 1,
    note: 'Einfach nö',
  },
  {
    type: 'text',
    category: 'Who was it?',
    question: 'Who stole my bike?',
    answer: 'Naga',
    note: 'Naga: Naga stole my bike!',
    noteImage: nagaImage,
  },
  {
    type: 'choice',
    category: 'Nahrungsergänzungsmittel',
    question: 'Ist ein Hotdog ein Sandwich?',
    answers: ['Ja', 'Nein'],
    correct: [0, 1],
    note: 'Zeig mal dein Wurstfach!',
  },
  {
    type: 'choice',
    category: 'Stein',
    question: 'Wie schwer ist ein Stein?',
    answers: ['6,35kg', 'Daniel', 'Einstein', 'ein Stein'],
    correct: [3],
    note: 'Zeig mal dein Steinfach!',
  },
  {
    type: 'text',
    category: 'Kurzzeitgedächtnis II',
    question: 'Wie lautet der vollständige Name des brasilianischen Präsidenten?',
    answer: 'Luiz Inácio Lula da Silva',
    note: 'lol wenn falsch, lmao sogar.',
  },
  {
    type: 'choice',
    category: 'Leckere Drogis',
    question: 'Wirst du heute Kokain ziehen?',
    answers: ['Ja', 'Nein'],
    correct: 0,
    note: 'Zieh das Yayo, zieh das Yayo!',
    runawayAnswer: 1,
    runawayCount: 20
  },
  {
    type: 'choice',
    category: 'Leckere Getränke',
    question: 'Woraus wird Hopfen gemacht?',
    answers: ['Saft', 'Ayran', 'Bier', 'H2O'],
    correct: 2,
    note: 'Lecker: Bierchen, das lecker ist.',
    noteImage: beerImage,
    noteImageAlt: 'Bild von Bier',
  },
    {
    type: 'choice',
    category: 'Stein',
    question: 'Was passiert, wenn man einen Stein ins Wasser wirft?',
    answers: ['Er wird nass', 'Er wird nass', 'Er wird nass', 'Er wird nass'],
    correct: [2],
    note: 'Schornig: Der Stein ist schornig!',
  },
  {
    type: 'text',
    category: 'Gemüse',
    question: 'Welches Gemüse wäre der/die beste Mitbewohner*in?',
    acceptAny: true,
    note: 'Gesund: Gemüse ist gesund!',
  },
  {
    type: 'trick',
    category: 'Buchstabenshit',
    question: 'Wenn du dir einen Buchstaben zwischen A und D aussuchen müsstest. Welchen würdest du nicht nehmen?',
    answers: ['A', 'B', 'C', 'D'],
    note: 'Deine Wahl ist FALSCH FALSCH FALSCH!!! Die anderen drei Buchstaben wären richtig gewesen!! Du scheiß Kacknoob!!!',
  },
]

const app = document.querySelector('#app')
let currentQuestion = 0
let score = 0
let locked = false

function renderStart() {
  app.innerHTML = `
    <main class="quiz-shell start-shell">
      <header class="topbar">
        <a class="wordmark" href="#" aria-label="Geburtssteinquiz">Geburts<span>stein</span>quiz</a>
        <div class="round-label"><span class="round-dot"></span> DEIN GEBURTSTAGSQUIZ</div>
        <span aria-hidden="true"></span>
      </header>
      <section class="start-content" aria-labelledby="start-title">
        <p class="eyebrow"><span class="eyebrow-line"></span> Du stinkst!</p>
        <h1 id="start-title">Hallo Geburtstags-Stein.</h1>
        <p class="start-copy">Willkommen zu deinem Geburtstagsquiz.<br>Die Anzahl deiner richtigen Antworten wird am Ende darüber entscheiden, was für ein Geschenk du bekommst. Viel Erfolg!</p>
        <button class="restart-button start-button" type="button">Let's go! <span aria-hidden="true">→</span></button>
      </section>
      <footer class="page-footer"><span>Du stinkst!</span><span>Peniskopf <span class="footer-dot">●</span> RUNDE 01</span></footer>
    </main>
  `
  app.querySelector('.start-button').addEventListener('click', render)
}

function render() {
  if (currentQuestion >= questions.length) {
    renderResults()
    return
  }

  const item = questions[currentQuestion]
  let escapeAttempts = 0
  const progress = (currentQuestion / questions.length) * 100
  const answerContent = item.type === 'text'
    ? `<form class="text-answer-form">
        <label class="text-answer-label" for="text-answer">Deine Antwort</label>
        <input class="text-answer-input" id="text-answer" name="answer" autocomplete="off" required>
        <button class="next-button" type="submit">Antwort prüfen <span aria-hidden="true">→</span></button>
      </form>`
    : `<div class="answer-list${item.type === 'trick' ? ' answer-list-letters' : ''}" role="group" aria-label="${item.type === 'trick' ? 'Buchstaben A bis D' : 'Antwortmöglichkeiten'}">
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
        <a class="wordmark" href="#" aria-label="Geburtssteinquiz">Geburts<span>stein</span>quiz</a>
        <div class="round-label"><span class="round-dot"></span>DAS GEBURTSTAGSQUIZ</div>
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

        <aside class="side-note" aria-label="Tipp zum Quiz">
          <details class="note-details">
            <summary><span class="note-bulb" aria-hidden="true">💡</span><span>Klicke hier für einen Tipp</span></summary>
            <p class="note-copy">Du stinkst!</p>
          </details>
          <div class="note-footer"><span>${String(currentQuestion + 1).padStart(2, '0')}</span><span class="note-dash"></span><span>${String(questions.length).padStart(2, '0')}</span></div>
          <div class="note-decoration" aria-hidden="true">Q</div>
        </aside>
      </section>
      <footer class="page-footer"><span>VIEL ERFOLG!</span><span>GEBURTSTAGSQUIZ <span class="footer-dot">●</span> Du stinkst!</span></footer>
    </main>
  `

  const JUMP_MIN = 140  // Mindestdistanz zur letzten Position (px)
  const JUMP_X = 220    // maximale Sprungweite horizontal (px)
  const JUMP_Y = 160     // maximale Sprungweite vertikal (px)

  const pickOffset = (button) => {
    const last = { x: Number(button.dataset.tx || 0), y: Number(button.dataset.ty || 0) }
    const rect = button.getBoundingClientRect()
    const area = app.getBoundingClientRect()

    // Ursprungsposition des Buttons (ohne aktuellen Versatz)
    const baseLeft = rect.left - last.x
    const baseTop = rect.top - last.y

    // Grenzen, damit der Button im Container bleibt (wichtig für Mobile)
    const minX = area.left - baseLeft
    const maxX = area.right - rect.width - baseLeft
    const minY = area.top - baseTop
    const maxY = area.bottom - rect.height - baseTop

    const clamp = (value, min, max) => Math.min(Math.max(value, min), Math.max(min, max))
    let best = last
    let bestDistance = -1

    for (let i = 0; i < 20; i += 1) {
      const candidate = {
        x: clamp(Math.round((Math.random() * 2 - 1) * JUMP_X), minX, maxX),
        y: clamp(Math.round((Math.random() * 2 - 1) * JUMP_Y), minY, maxY)
      }
      const distance = Math.hypot(candidate.x - last.x, candidate.y - last.y)
      if (distance > bestDistance) {
        best = candidate
        bestDistance = distance
      }
      if (distance >= JUMP_MIN) break
    }
    return best
  }

  app.querySelectorAll('.answer-option').forEach((button) => {
    button.addEventListener('click', (event) => {
      const answerIndex = Number(button.dataset.index)
      if (answerIndex === item.runawayAnswer && escapeAttempts < item.runawayCount && event.detail > 0) {
        const offset = pickOffset(button)
        escapeAttempts += 1
        button.dataset.tx = offset.x
        button.dataset.ty = offset.y
        const tilt = offset.x >= 0 ? 8 : -8
        button.style.transform = `translate(${offset.x}px, ${offset.y}px) rotate(${tilt}deg)`
        return
      }
      button.style.transform = ''
      button.dataset.tx = 0
      button.dataset.ty = 0
      chooseAnswer(answerIndex)
    })
  })
  app.querySelector('.text-answer-form')?.addEventListener('submit', (event) => {
    event.preventDefault()
    const answer = new FormData(event.currentTarget).get('answer').trim()
    if (answer) {
      const isCorrect = item.acceptAny || answer.toLocaleLowerCase('de') === item.answer.toLocaleLowerCase('de')
      showFeedback(isCorrect, item)
    }
  })
}

function chooseAnswer(index) {
  if (locked) return
  const item = questions[currentQuestion]
    if (item.category === 'Leckere Drogis') {
    const audio = new Audio(yayoSound)
    audio.play().catch(error => {
      console.error('Sound konnte nicht abgespielt werden:', error)
    })
  }
  const correctAnswers = Array.isArray(item.correct) ? item.correct : [item.correct]
  app.querySelectorAll('.answer-option').forEach((button) => {
    const answerIndex = Number(button.dataset.index)
    button.setAttribute('aria-pressed', String(answerIndex === index))
    button.classList.add('is-locked')
    if (item.type === 'trick') button.classList.add(answerIndex === index ? 'is-wrong' : 'is-correct')
    else if (correctAnswers.includes(answerIndex)) button.classList.add('is-correct')
    else if (answerIndex === index) button.classList.add('is-wrong')
  })
  showFeedback(item.type !== 'trick' && correctAnswers.includes(index), item)
}

function showFeedback(isCorrect, item) {
  if (locked) return
  locked = true
  if (isCorrect) score += 1

  const feedback = app.querySelector('.feedback')
  feedback.hidden = false
  feedback.className = `feedback ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`
  feedback.innerHTML = `
    <span class="feedback-icon" aria-hidden="true">${isCorrect ? '✓' : '!'}</span>
    <div class="feedback-copy">
      <div><strong>${isCorrect ? 'Richtig!' : 'Nicht ganz.'}</strong> ${item.note}</div>
      ${item.noteImage ? `<img class="feedback-note-image" src="${item.noteImage}" alt="${item.noteImageAlt || 'Bild'}">` : ''}
      ${item.noteImagePlaceholder ? `<div class="feedback-note-placeholder" role="img" aria-label="${item.noteImagePlaceholder}">${item.noteImagePlaceholder}</div>` : ''}
    </div>
  `

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
  const audio = new Audio(resultSound)
  audio.play().catch(error => {
  console.error('Ergebnis-Sound konnte nicht abgespielt werden:', error)
  })
  const level1Points = score > 1 ? `0–${score - 1} Punkte` : score === 1 ? '0 Punkte' : 'Keine Punkte'
  const level2Points = `${score} ${score === 1 ? 'Punkt' : 'Punkte'}`
  const level3Points = score < questions.length ? `${score + 1}–${questions.length} Punkte` : 'Keine Punkte'

  app.innerHTML = `
    <main class="quiz-shell results-shell">
      <header class="topbar">
        <a class="wordmark" href="#" aria-label="Geburtssteinquiz">Geburts<span>stein</span>quiz</a>
        <div class="round-label"><span class="round-dot"></span> RUNDE ABGESCHLOSSEN</div>
        <span class="results-stamp" aria-hidden="true">✓</span>
      </header>
      <section class="results-content" aria-labelledby="results-title">
        <div class="results-label"><span class="eyebrow-line"></span> DEINE AUFLÖSUNG</div>
        <div class="results-score"><span>${score}</span><span class="results-total">/ ${questions.length}</span></div>
        <h1 id="results-title">Du hast ${score} von ${questions.length} Fragen richtig beantwortet.</h1>
        <p class="results-copy">Das bedeutet: Geschenk-Level 2! Herzlichen Glückwunsch! </p>
        <div class="result-meter" role="img" aria-label="${percentage} Prozent richtig"><span style="width: ${percentage}%"></span></div>
        <div class="gift-levels" aria-label="Geschenk-Level">
          <div class="gift-level"><span>LEVEL 1</span><small>${level1Points}</small><strong>Ein Stück Hundekot</strong><small>Von einem Dobermann</small></div>
          <div class="gift-level gift-level-won"><span>LEVEL 2 · DEIN LEVEL</span><small>Exakt ${level2Points}</small><strong>Überraschung (es ist Geld)</strong></div>
          <div class="gift-level"><span>LEVEL 3</span><small>${level3Points}</small><strong>Ein niegelnagel neuer Ferrari</strong><small>Vielleicht beim nächsten Geburtstag.</small></div>
        </div>
        <button class="restart-button" type="button">Noch mal spielen <span aria-hidden="true">↻</span></button>
      </section>
      <footer class="page-footer"><span>Du stinkst!</span><span>GESCHENK-LEVEL 2</span></footer>
    </main>
  `
  app.querySelector('.restart-button').addEventListener('click', restart)
}

function restart() {
  currentQuestion = 0
  score = 0
  locked = false
  renderStart()
}

renderStart()