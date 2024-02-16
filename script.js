class Node {
  constructor(sqrCurrent, sqrPrevious = null) {
    this.sqrCurrent = sqrCurrent;
    this.sqrPrevious = sqrPrevious;
    this.sqrNext = [];
  }

  createNextMoves() {
    let [x, y] = [...this.sqrCurrent];

    return [
      [x + 2, y + 1],
      [x + 2, y - 1],
      [x - 2, y + 1],
      [x - 2, y - 1],
      [x + 1, y + 2],
      [x + 1, y - 2],
      [x - 1, y + 2],
      [x - 1, y - 2],
    ].filter((move) => {
      let [x, y] = [...move];

      return x < 8 && x >= 0 && y < 8 && y >= 0;
    });
  }

  createNextNodes() {
    this.createNextMoves().forEach((move) => {
      this.sqrNext.push(new Node(move, this));
    });
  }
}

class Knight {
  constructor(sqrStart, sqrEnd) {
    this.sqrStart = new Node(sqrStart);
    this.sqrEnd = new Node(sqrEnd);
  }

  printPath(node) {
    const moves = [];
    let count = 0;

    moves.push(node.sqrCurrent);
    while (node.sqrPrevious !== null) {
      node = node.sqrPrevious;
      moves.push(node.sqrCurrent);
      count++;
    }

    console.log(`It took the knight ${count} move(s) from start to end!`);
    console.log("This is the path he took: ");
    moves.forEach((sqr) => console.log(sqr));
  }

  // we traverse from end to start, to print out from start to end
  getShortestPath() {
    let queue = [this.sqrEnd];
    let node = null;

    while (queue.length > 0) {
      node = queue.shift();
      if (
        node.sqrCurrent[0] === this.sqrStart.sqrCurrent[0] &&
        node.sqrCurrent[1] === this.sqrStart.sqrCurrent[1]
      ) {
        this.printPath(node);
        return;
      }
      node.createNextNodes();
      node.sqrNext.forEach((node) => {
        queue.push(node);
      });
    }
  }
}

const start = [0, 0];
const end = [7, 7];

let knight = new Knight(start, end);
knight.getShortestPath();
