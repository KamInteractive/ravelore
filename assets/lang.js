// Shows one language at a time. Remembers the choice; defaults to the browser language.
(function () {
  var sections = document.querySelectorAll('[data-lang-section]')
  var buttons = document.querySelectorAll('.lang-btn')

  function pick() {
    var fromHash = (location.hash || '').replace('#', '')
    if (fromHash === 'tr' || fromHash === 'en') return fromHash
    try {
      var saved = localStorage.getItem('ravelore-lang')
      if (saved === 'tr' || saved === 'en') return saved
    } catch (e) {}
    return (navigator.language || '').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en'
  }

  function show(lang) {
    sections.forEach(function (s) { s.hidden = s.id !== lang })
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)) })
    document.documentElement.lang = lang
    try { localStorage.setItem('ravelore-lang', lang) } catch (e) {}
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { show(b.dataset.lang) })
  })
  show(pick())
})()
