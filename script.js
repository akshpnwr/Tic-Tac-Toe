class TicTacToe {
  _grid = document.querySelector('.grid');

  constructor() {
    this._init();
    this._grid.addEventListener('click', (e) => {
      this._loadSign(e);
    });
    document
      .querySelector('.new-game')
      .addEventListener('click', this._newGame.bind(this));
  }

  _init() {
    this._clicks = 0;
    this._winningCombinations = [
      [1, 2, 3],
      [3, 6, 9],
      [7, 8, 9],
      [1, 4, 7],
      [1, 5, 9],
      [4, 5, 6],
      [7, 8, 9],
      [2, 5, 8],
      [3, 5, 7],
    ];

    this._player1 = {
      name: 'X',
      moves: [],
    };
    this._player2 = {
      name: 'O',
      moves: [],
    };
  }

  _loadSign(e) {
    const clicked = e.target;
    if (!clicked.classList.contains('box')) return;

    this._clicks++;

    if (this._clicks % 2 === 0) this._addSign(clicked, 'zero');
    else this._addSign(clicked, 'cross');
  }

  _addSign = function (clickedBox, sign) {
    const img = clickedBox.querySelector('img');

    // Check if img already exists
    if (img) return;

    const markup = this._generateMarkup(sign);

    clickedBox.insertAdjacentHTML('afterbegin', markup);

    const id = Number(clickedBox.dataset.id);

    this._getPlayer().moves.push(id);

    this._checkWin();
  };

  _getPlayer() {
    return this._clicks % 2 === 0 ? this._player2 : this._player1;
  }

  _generateMarkup = (sign) => `<img src="img/${sign}.svg" alt="" />`;

  _checkWin() {
    const player = this._getPlayer();

    if (player.length < 3) return;

    // Check for win
    this._winningCombinations.forEach((comb) => {
      if (comb.every((v) => player.moves.includes(v))) {
        setTimeout(() => {
          alert(`${player.name} won 👏😎`);
        }, 300);
      }
    });
  }

  _newGame() {
    this._init();
    const allBox = document.querySelectorAll('.box');
    allBox.forEach((box) => (box.innerHTML = ''));
  }
}

const ticTacToe = new TicTacToe();
