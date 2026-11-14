// Shows one language at a time. Remembers the choice; defaults to the browser language.
// A page that lacks the chosen language (the legal pages are English and Turkish only)
// shows English and keeps the saved choice for the pages that have it.
(function () {
  var known = ['en', 'tr', 'es', 'pt']
  var sections = document.querySelectorAll('[data-lang-section]')
  var buttons = document.querySelectorAll('.lang-btn')

  // A block names its language in data-lang-section, or falls back to its id.
  function langOf(s) { return s.getAttribute('data-lang-section') || s.id }

  var available = {}
  sections.forEach(function (s) { available[langOf(s)] = true })

  function pick() {
    var fromHash = (location.hash || '').replace('#', '')
    if (known.indexOf(fromHash) >= 0) return fromHash
    try {
      var saved = localStorage.getItem('ravelore-lang')
      if (known.indexOf(saved) >= 0) return saved
    } catch (e) {}
    var browser = (navigator.language || '').toLowerCase().slice(0, 2)
    return known.indexOf(browser) >= 0 ? browser : 'en'
  }

  function show(lang) {
    var shown = available[lang] ? lang : 'en'
    sections.forEach(function (s) { s.hidden = langOf(s) !== shown })
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === shown)) })
    document.documentElement.lang = shown
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      try { localStorage.setItem('ravelore-lang', b.dataset.lang) } catch (e) {}
      show(b.dataset.lang)
    })
  })
  show(pick())
})()
