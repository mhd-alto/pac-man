// Splash screen with fade out
setTimeout(() => {
  const elements = ['.loader', '#overlayer'];
  
  elements.forEach(selector => {
    const el = document.querySelector(selector);
    if (el) {
      el.style.transition = 'opacity 0.5s';
      el.style.opacity = '0';
      setTimeout(() => {
        el.style.display = 'none';
        // Start game AFTER splash screen is fully hidden
      }, 500);
    }
  });
  initializeGame();
}, 7000);

// Simple counter animation
document.querySelectorAll('.count h3').forEach(counter => {
  const target = parseInt(counter.innerText);
  let current = 0;
  
  const updateCounter = () => {
    if (current < target) {
      current++;
      counter.innerText = current;
      setTimeout(updateCounter, 5000 / target);
    }
  };
  
  updateCounter();
});

const initializeGame = () => {

  console.log("Game started!");
  const game = document.querySelector("#game");
  const scoreDisplay = document.querySelector("#score");
  const width = 28; // 560px / 20 = 28
  const introMusic = new Audio("./assets/audio/pacman.mp3")
  const waka = new Audio("./assets/audio/pac-man-waka-waka.mp3")
  const died = new Audio("./assets/audio/8d82b5_pacman_dies_sound_effect.mp3")
  
  introMusic.play();
  let score = 0;
  const grid = document.querySelector(".grid");
  game.style.display = "flex"

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
      if ([0, 27, 756, 783].includes(i)) {
          squares[i].classList.add("angle");
      }

    }
  };
  createBoard();

  //create Characters
  // draw pac-man onto the board
  let pacmanCurrentIndex = 490;
  squares[pacmanCurrentIndex].classList.add("pac-man");
  let lastPacManIndex = -1;

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
    waka.play();
    lastPacManIndex = pacmanCurrentIndex;
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

const getNeighbors = (index) => {
  const neighbors = [];
  const directions = [-1, 1, width, -width];

  for (let dir of directions) {
    const next = index + dir;

    if (
      squares[next] &&
      !squares[next].classList.contains("wall")
    ) {
      neighbors.push(next);
    }
  }

  return neighbors;
};

const bfs = (start, target) => {
  const queue = [[start]];
  const visited = new Set();

  while (queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1];

    if (current === target) {
      return path;
    }

    if (!visited.has(current)) {
      visited.add(current);

      const neighbors = getNeighbors(current);

      for (let neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          queue.push([...path, neighbor]);
        }
      }
    }
  }

  return null; // no path found
};


const moveGhost = (ghost) => {
  ghost.timerId = setInterval(function () {
    const path = bfs(ghost.currentIndex, pacmanCurrentIndex);

    if (path && path.length > 1) {
      const nextMove = path[1];

      squares[ghost.currentIndex].classList.remove(
        ghost.className,
        "ghost",
        "scared-ghost"
      );

      ghost.currentIndex = nextMove;

      squares[ghost.currentIndex].classList.add(
        ghost.className,
        "ghost"
      );
    }

    // scared logic stays the same
    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add("scared-ghost");
    }

    // eaten ghost
    if (
      ghost.isScared &&
      squares[ghost.currentIndex].classList.contains("pac-man")
    ) {
      ghost.isScared = false;
      squares[ghost.currentIndex].classList.remove(
        ghost.className,
        "ghost",
        "scared-ghost"
      );
      ghost.currentIndex = ghost.startIndex;
      score += 100;
      scoreDisplay.innerHTML = score;
      squares[ghost.currentIndex].classList.add(
        ghost.className,
        "ghost"
      );
    }
    
    checkForGameOver();
  }, ghost.speed);
};

const reset = document.getElementById('play-again');

const checkForGameOver = () => {
        if (
            squares[pacmanCurrentIndex].classList.contains("ghost") &&
            !squares[pacmanCurrentIndex].classList.contains("scared-ghost")) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener("keyup", movePacman)
            setTimeout(() => {
                died.play();
                alert("Game Over")
                reset.style.display = "inline";
                
            }, 500)
        }
    }
const checkForWin = () => {
        if (score >= 300) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener("keyup", movePacman)
            setTimeout(function () {
                alert("You have WON!")
                reset.style.display = "inline";
            }, 500)
        }
    }

ghosts.forEach(ghost=> moveGhost(ghost))

reset.addEventListener('click', () => {
    // Clear all existing ghost intervals
    ghosts.forEach(ghost => {
        clearInterval(ghost.timerId);
    });
    
    // Reset score
    score = 0;
    scoreDisplay.innerHTML = score;
    
    // Clear the entire grid
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    
    // Clear squares array
    squares.length = 0;
    
    // Recreate the board
    createBoard();
    
    // Reset pacman position
    pacmanCurrentIndex = 490;
    squares[pacmanCurrentIndex].classList.add("pac-man");
    
    // Reset ghosts
    ghosts.forEach(ghost => {
        // Remove ghost from current position
        if (squares[ghost.currentIndex]) {
            squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
        }
        
        // Reset ghost properties
        ghost.currentIndex = ghost.startIndex;
        ghost.isScared = false;
        
        // Add ghost to new position
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
    });
    
    // Restart ghost movement
    ghosts.forEach(ghost => moveGhost(ghost));
    
    // Restart music
    introMusic.currentTime = 0;
    introMusic.play();
    
    // Ensure event listener is only added once
    document.removeEventListener("keyup", movePacman);
    document.addEventListener("keyup", movePacman);
});
};

