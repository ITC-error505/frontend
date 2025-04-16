document.querySelectorAll('.buttons a').forEach((link) => {
  link.addEventListener('click', () => {
    const gameId = link.getAttribute('data-gameid');
    localStorage.setItem('gameId', gameId);
  });
});

