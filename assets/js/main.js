document.addEventListener("DOMContentLoaded", () => {
  const scoreDisplay = document.querySelector("#score");
  const width = 28; // 560px / 20 = 28
  let score = 0;
  const grid = document.querySelector(".grid");
  const squares = [];

  // 0 is pac dots
  // 1 is wall
  // 2 is ghost lair
  // 3 is power pellet
  // 4 is empty

  const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
    1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0,
    1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1,
    1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2,
    2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1,
    2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1,
    0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];

  // create your board

  const createBoard = () => {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement("div");
      grid.appendChild(square);

      //add layout to board
      squares.push(square);

      if (layout[i] === 0) {
        squares[i].classList.add("pac-dot");
      }
      if (layout[i] === 1) {
        squares[i].classList.add("wall");
      }
      if (layout[i] === 2) {
        squares[i].classList.add("ghost-lair");
      }

      if (layout[i] === 3) {
        squares[i].classList.add("power-pellet");
      }
      squares[i].id = i;
    }
  };
  createBoard();

  //create Characters
  // draw pac-man onto the board
  let pacmanCurrentIndex = 490;
  squares[pacmanCurrentIndex].classList.add("pac-man");

  //move pac-man
  const movePacman = (e) => {
    let pacManDirection = "";
    //start completely fresh
    squares[pacmanCurrentIndex].classList.remove("pac-man");

    //console.log(e); //try the event
    //console.log(e.keyCode)

    switch (e.key) {
      case "ArrowLeft":
        if (
          //left wall
          pacmanCurrentIndex % width !== 0 &&
          !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
          !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")
        ) 
          pacmanCurrentIndex -= 1;
          pacManDirection = "scaleX(-1)";
        
        //teleport
        if (squares[pacmanCurrentIndex - 1] === squares[363]) {
          pacmanCurrentIndex = 391;
        }
        break;
      case "ArrowRight":
        if (
          //teleport
          pacmanCurrentIndex % width < width - 1 &&
          !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
          !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")
        ) 
          pacmanCurrentIndex += 1;
          pacManDirection = "scaleX(1)";
        
        if (squares[pacmanCurrentIndex + 1] === squares[392])
          pacmanCurrentIndex = 364;

        break;
      case "ArrowDown":
        if(
            pacmanCurrentIndex + width < width * width &&
                      !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
          !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")
        )
        pacmanCurrentIndex = pacmanCurrentIndex + width;
        pacManDirection = "rotate(90deg)";

        break;
      case "ArrowUp":
        if (
          pacmanCurrentIndex - width >= 0 &&
          !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
          !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")
        )
        pacmanCurrentIndex = pacmanCurrentIndex - width;
        pacManDirection = "rotate(-90deg)";

        break;
    }

    squares[pacmanCurrentIndex].classList.add("pac-man");
    squares[pacmanCurrentIndex].style.transform = pacManDirection;
    pacDotEaten()
    powerPelletEaten()
    checkForGameOver()
    checkForWin()
  };

  document.addEventListener("keyup", movePacman);
  
  //wht happens when you eat a pac-dot
  const pacDotEaten = () => {
      if (squares[pacmanCurrentIndex].classList.contains('pac-dot')){
        score++;
        scoreDisplay.innerHTML = score;
        squares[pacmanCurrentIndex].classList.remove('pac-dot');
      }
  }

  //wht happens when you eat a power pallet
    const powerPelletEaten = () => {
        if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
            score += 10
            scoreDisplay.innerHTML = score
            ghosts.forEach(ghost => ghost.isScared = true)
            setTimeout(unScareGhosts, 10000)
            squares[pacmanCurrentIndex].classList.remove("power-pellet")
        }
    }

    //make the ghosts stop flashing
    const unScareGhosts = () => {
        ghosts.forEach(ghost => ghost.isScared = false)
    }
  
  class Ghost{
    constructor(className, startIndex, speed){
      this.className = className
      this.startIndex = startIndex
      this.speed = speed
      this.currentIndex = startIndex
      this.isScared = false
      this.timerId = NaN
    }
  }

let ghosts = [
  new Ghost('blinky', 348, 250),
  new Ghost('pinky', 376, 400),
  new Ghost('inky', 351, 300),
  new Ghost('clyde', 379, 500),
]
console.log(ghosts)

//draw my ghosts onto the grid
ghosts.forEach(ghost => {
  squares[ghost.currentIndex].classList.add(ghost.className)
  squares[ghost.currentIndex].classList.add('ghost')
})

// move ghosts randomly


const moveGhost = (ghost) => {
        const directions = [-1, 1, width, -width]
        let direction = directions[Math.floor(Math.random() * directions.length)]

        ghost.timerId = setInterval(function () {
            //if next square your ghost is going to go to does not have a ghost and does not have a wall
            if (
                !squares[ghost.currentIndex + direction].classList.contains("ghost") &&
                !squares[ghost.currentIndex + direction].classList.contains("wall")
            ) {
                squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
                ghost.currentIndex += direction
                squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
                // else find a new random direction to go in
            } else direction = directions[Math.floor(Math.random() * directions.length)]
            // if the ghost is currently scared
            if (ghost.isScared) {
                squares[ghost.currentIndex].classList.add("scared-ghost")
            }

            //if the ghost is currently scared and pacman is on it
            if (ghost.isScared && squares[ghost.currentIndex].classList.contains("pac-man")) {
                ghost.isScared = false
                squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
                ghost.currentIndex = ghost.startIndex
                score += 100
                scoreDisplay.innerHTML = score
                squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
            }
            checkForGameOver()
        }, ghost.speed)
    };

const checkForGameOver = () => {
        if (
            squares[pacmanCurrentIndex].classList.contains("ghost") &&
            !squares[pacmanCurrentIndex].classList.contains("scared-ghost")) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener("keyup", movePacman)
            setTimeout(() => {
                alert("Game Over")
            }, 500)
        }
    }
const checkForWin = () => {
        if (score >= 274) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener("keyup", movePacman)
            setTimeout(function () {
                alert("You have WON!")
            }, 500)
        }
    }

ghosts.forEach(ghost=> moveGhost(ghost))

});
