class TicTacToe {
  _clicks = 0;
  _winningCombinations = [
    [1, 2, 3],
    [3, 6, 9],
    [7, 8, 9],
    [1, 4, 7],
    [1, 5, 9],
    [4, 5, 6],
    [7, 8, 9],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 7, 9],
  ];

  _player1 = {
    name: 'player 1',
    moves: [],
  };
  _player2 = {
    name: 'player 2',
    moves: [],
  };

  constructor() {
    grid.addEventListener('click', (e) => {
      this._loadSign(e);
    });
  }

  _loadSign(e) {
    const clicked = e.target;
    if (!clicked.classList.contains('box')) return;

    this._clicks++;

    if (this._clicks % 2 === 0) this._addSign(clicked, 'cross');
    else this._addSign(clicked, 'zero');
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

  _generateMarkup = (sign) => `<img src="svg/${sign}.svg" alt="" />`;

  _checkWin() {
    const player = this._getPlayer();

    if (player.length < 3) return;

    this._winningCombinations.forEach((comb) => {
      if (_.isEqual(comb, player.moves.sort())) alert(`${player.name} won`);
    });
  }
}

const grid = document.querySelector('.grid');

const ticTacToe = new TicTacToe();

// const a1 = [1, 2, 3];
// const a2 = [3, 2, 1];

// console.log(_.isEqual(a1.sort(), a2.sort()));
