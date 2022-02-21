let isMenuGame = false;
let playerScore = 0;

function startRestart() {
        const mainMenu = document.querySelector(".game-menu");
        const bird = document.querySelector(".bird");
        const gameDisplay = document.querySelector(".game-container");
        const scoreboard = document.querySelector(".scoreboard");

        let isGameOver = false;
        let birdLeft = 220; //отсут слева
        let birdBottom = 100; //отступ снизу
        let gravity = 2; // скорость снижения в px
        let gap = 430;
        let score = 0;
        let resultScore = 0;

        function startGame() { //начало игры
            birdBottom -= gravity; // падаение вниз
            mainMenu.style.display = "none"; //убирает меню при начале игры 
            bird.style.left = birdLeft + "px";
            bird.style.bottom = birdBottom + "px";
        }

        let gameTimerId = setInterval(startGame, 20); //каждые 20 милисекунд птичка падает вниз на значение gravity

        function control(event) {
            if (event.keyCode === 32) { // при нажатии на кнопку (пробел = 32) срабатывает прыжок
                jump();
            }
        }

        function jump() {
            if (birdBottom < 495) birdBottom += 40; // если птичка ниже 495 px то прыжок 50 px
            bird.style.bottom = birdBottom + "px";
            console.log(birdBottom);
        }

        document.addEventListener("keyup", control); //выполнении функции control

        function generateObstacle() {
            let obstacleLeft = 500;
            let randomHeight = Math.random() * 60; //рандомная высота элемента
            let obstacleBottom = randomHeight;
            const obstacle = document.createElement("div"); //создаём нижнее препядствие
            const topObstacle = document.createElement("div"); // создаём верхнее препдятсвие
            if (!isGameOver) {
                obstacle.classList.add("obstacle"); //задаём класс для нижнего препядствия
                topObstacle.classList.add("top-obstacle"); // задаём класс для  верхнего препядствия
            }
            gameDisplay.appendChild(obstacle); //для gameDisplay задаём дочерний элемент obstacle
            obstacle.style.left = obstacleLeft + "px"; // задаём отступ слева
            obstacle.style.bottom = obstacleBottom + "px"; // задаём оступ снизу
            gameDisplay.appendChild(topObstacle); //для gameDisplay задаём дочерний элемент topObstacle
            topObstacle.style.left = obstacleLeft + "px"; // задаём отступ слева
            topObstacle.style.bottom = obstacleBottom + gap + "px"; // задаём оступ сверху

            function moveObstacle() {
                obstacleLeft -= 2; //препядствие двигается в лево на 2
                obstacle.style.left = obstacleLeft + "px";
                topObstacle.style.left = obstacleLeft + "px";
                if (obstacleLeft === 210) { //начислеие очков
                    score++; //как только препядствие достигает отметки 210 +1 очко
                    scoreboard.textContent = score; //запись в div
                    playerScore = score;
                    console.log(score);
                }
                if (obstacleLeft === -60) { //если препядствие уходит за 60px то оно исчезает
                    clearInterval(timerId); //очищает таймер
                    gameDisplay.removeChild(obstacle); //удаляет дочерний элемент obstacle
                    gameDisplay.removeChild(topObstacle); //удаляет дочерний элемент topObstacle
                }
                if (obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                    (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200)  ||
                    birdBottom === 0) {
                    obstacle.style.backgroundImage = "none";
                    topObstacle.style.backgroundImage = "none";
                    gameOver(); //запуск функции gameOver
                    isGameOver = true; //конец игры
                    clearInterval(timerId); //как только игра закончена птица не падает
                }
            }

            let timerId = setInterval(moveObstacle, 20); //таймер на запуск функции постепенного движения
            if (!isGameOver) setTimeout(generateObstacle, 3000); // каждые 3 секунды генерируется прерядствие

        }
        generateObstacle();

        function gameOver() {
            writeScore();
            clearInterval(gameTimerId); //очищает таймер
            isMenuGame = isGameOver;
            resultScore = score;
            scoreboard.textContent = "0";
            console.log(resultScore);
            console.log("Game Over");
            document.removeEventListener("keyup", control); //отключает нажатие клавивиши space
        }
}

function score(){
    const generalMenu = document.querySelector(".game-menu");
    const yourScore = document.querySelector(".your-score");
    const totalScore = document.querySelector(".total-score");

    if(isMenuGame === true){
        isMenuGame = false;
        generalMenu.style.display = "none";
        yourScore.style.display = "flex";
        totalScore.textContent = "Your Score: " + playerScore;
        playerScore = 0;
    }
}

setInterval(score, 0);

function showMenu() { // функция для включения меню, если игра проиграна
    const generalMenu = document.querySelector(".game-menu");
    const yourScore = document.querySelector(".your-score");

    yourScore.style.display = "none";
    generalMenu.style.display = "flex";
}

let audio = new Audio();
let mute = true;

function songMuted() {
    const imgMute = document.querySelector("#song-btn");
    if(mute === true){
        audio.src = "./assets/music/MK.mp3";
        audio.play();
        mute = false;
        imgMute.src = "./assets/img/soundOn.png";
    }else{
        audio.pause();
        mute = true;
        imgMute.src = "./assets/img/soundOff.png";
    }
}

function menuScoreTable() {
    const mainMenu = document.querySelector(".game-menu");
    const scoreTable = document.querySelector(".score-table");
    const bird = document.querySelector(".bird");
    const back = document.querySelector(".score-back");

    mainMenu.style.display = "none";
    bird.style.display = "none";
    scoreTable.style.display = "flex";

    function backBtn() {
        mainMenu.style.display = "flex";
        bird.style.display = "flex";
        scoreTable.style.display = "none";
    }
    back.addEventListener("click", backBtn);
}

function writeScore() {
    const pS1 = document.querySelector(".player-score-one");
    const pS2 = document.querySelector(".player-score-two");
    const pS3 = document.querySelector(".player-score-three");
    const pS4 = document.querySelector(".player-score-four");
    const pS5 = document.querySelector(".player-score-five");
    const pS6 = document.querySelector(".player-score-six");
    const pS7 = document.querySelector(".player-score-seven");
    const pS8 = document.querySelector(".player-score-eight");
    const pS9 = document.querySelector(".player-score-nine");
    const pS10 = document.querySelector(".player-score-ten");

    let gameScore = playerScore;
    let arr = [0,0,0,0,0,0,0,0,0,0];

    arr.push(gameScore);

    if(arr.length > 10){
        arr.sort((a ,b) => b - a);
        arr.slice(0,9);
    }
    pS1.textContent = arr[0];
    pS2.textContent = arr[1];
    pS3.textContent = arr[2];
    pS4.textContent = arr[3];
    pS5.textContent = arr[4];
    pS6.textContent = arr[5];
    pS7.textContent = arr[6];
    pS8.textContent = arr[7];
    pS9.textContent = arr[8];
    pS10.textContent = arr[9];
} //функция на LocalStorage (не доделал)