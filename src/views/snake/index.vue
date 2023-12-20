<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import successSound from '../../assets/audio/success.mp3';
import failSound from '../../assets/audio/fail.mp3';


const canvas = ref();
const ROW = 14;
const COLUMN = 14;
const pixelSize = 50;
const audioMap = {};
let isCollision = ref(false);
let level = 400;
let score = ref(0);
let ctx = null;
let snake = {};
let apple = {};
let intervalTimer = null;
const initailize = () => {
  ctx = canvas.value.getContext("2d");
};
const updateCanvas = (snake = null) => {
  if(snake){
    createApple();
    intervalUpdate(snake);
  }else {
    createSnake();
    createApple();
    intervalUpdate();
  }
};
const drawArena = () => {
  clear();
  drawBackground();
  drawColumnLine();
  drawRowLine();
};
const intervalUpdate = (snake) => {
  intervalTimer = setInterval(() => {
    intervaAction(snake);
  }, level);
};
const intervaAction = (snake) => {
  drawArena();
  if(checkIfCollideBounding()) {
    return;
  }
  moveSnake();
  drawSnake();
  drawApple();
  checkIfCollideWithApple();
};
const addScore = () => {
  score.value += 1;
}
const checkIfCollideWithApple = () => {
  if((apple.position.x === snake.position[0].x) && (apple.position.y === snake.position[0].y)) {
    createApple();
    makeSnakeLonger();
    addScore();
    levelUp();
    playAudio('success');
  }
}
const levelUp = () => {
  level -= 30;
  clearArena();
  updateCanvas(snake);
}
const checkIfCollideBounding = () => {

  const newHeadCoordinate = {
    x: snake.position[0].x + snake.direction.x,
    y: snake.position[0].y + snake.direction.y,
  };
  if(newHeadCoordinate.x < 0 || newHeadCoordinate.x >= COLUMN || newHeadCoordinate.y < 0 || newHeadCoordinate.y >= ROW) {
    clearArena();
    isCollision.value = true;
    playAudio('fail');
    setTimeout(() => {
      isCollision.value = false;
    }, 2000);
    return true;
  }
}
const drawBackground = () => {
  ctx.fillStyle = "wheat";
  ctx.fillRect(0, 0, COLUMN * pixelSize, ROW * pixelSize);
};
const drawColumnLine = () => {
  ctx.strokeStyle = "#8484843b";
  ctx.lineWidth = 1;
  for (let i = 0; i <= COLUMN; i += 1) {
    ctx.beginPath();
    ctx.moveTo(i * pixelSize, 0);
    ctx.lineTo(i * pixelSize, ROW * pixelSize);
    ctx.stroke();
  }
};
const drawRowLine = () => {
  ctx.strokeStyle = "#8484843b";
  ctx.lineWidth = 1;
  for (let i = 0; i <= ROW; i += 1) {
    ctx.beginPath();
    ctx.moveTo(0, i * pixelSize);
    ctx.lineTo(COLUMN * pixelSize, i * pixelSize);
    ctx.stroke();
  }
};
const drawSnake = () => {
  ctx.fillStyle = "blue";
  for (let point of snake.position) {
    ctx.fillRect(
      point.x * pixelSize,
      point.y * pixelSize,
      pixelSize,
      pixelSize
    );
  }
};
const drawApple = () => { 
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.arc((apple.position.x * pixelSize) + pixelSize / 2 , (apple.position.y * pixelSize) + pixelSize / 2, pixelSize / 2, 0, 2 * Math.PI);
  ctx.fill();
};
const clear = () => {
  ctx.clearRect(0, 0, COLUMN * pixelSize, ROW * pixelSize);
};
const moveSnake = () => {
  const newHeadCoordinate = {
    x: snake.position[0].x + snake.direction.x,
    y: snake.position[0].y + snake.direction.y,
  };
  snake.position.unshift(newHeadCoordinate);
  snake.position.pop();
};
const makeSnakeLonger = () => {
  snake.position.push({
    x: snake.position[snake.position.length - 1].x - snake.direction.x,
    y: snake.position[snake.position.length - 1].y - snake.direction.y,
  })
}
const createSnake = () => {
  snake = {
    position: [
      {
        x: COLUMN / 2,
        y: ROW / 2,
      },
      {
        x: COLUMN / 2 + 1,
        y: ROW / 2,
      },
      {
        x: COLUMN / 2 + 2,
        y: ROW / 2,
      },
    ],
    size: 1,
    direction: {
      x: 0,
      y: -1,
    },
  };
};
const createApple = () => {
  apple = {
    position: {
      x: (Math.floor((Math.random() * COLUMN))),
      y: (Math.floor(Math.random() * ROW) ) ,
    }
  };
  if(snake) {
    for(let point of snake.position) {
      if(point.x === apple.position.x && point.y === apple.position.y) {
        createApple();
        return;
      }
    }
  }
};
const initParameter = () => {
  level = 400;
  score.value = 0;
  isCollision.value = false;
}
const startGame = () => {
  initParameter();
  updateCanvas();
};
const createAudio = () => {
  const successAudio = document.createElement('audio');
  successAudio.src = successSound;
  audioMap.success = successAudio;
  const failAudio = document.createElement('audio');
  failAudio.src = failSound;
  audioMap.fail = failAudio;
}
const playAudio = (type) => {
  audioMap[type].play();
}
onMounted(() => {
  initailize();
  drawArena();
  createAudio();
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      snake.direction = {
        x: -1,
        y: 0,
      };
    } else if (e.key === "ArrowRight") {
      snake.direction = {
        x: 1,
        y: 0,
      };
    } else if (e.key === "ArrowUp") {
      snake.direction = {
        x: 0,
        y: -1,
      };
    } else if (e.key === "ArrowDown") {
      snake.direction = {
        x: 0,
        y: 1,
      };
    }else if(e.key === 'Enter') {
      startGame();
    }
  });
});

onUnmounted(() => {
  clearArena();
})

const clearArena = () => {
  clearInterval(intervalTimer);
  intervalTimer = null; 
}

</script>

<template>
  <div class="snake">
    <h1>貪吃蛇大作戰</h1>
    <button @click="playAudio">播放</button>
    <div v-if="isCollision" class="alert-container">撞牆了</div>
    <button @click="startGame">開始遊戲</button>
    <div class="score"><h1>{{ score }}</h1></div>
    <div class="canvas-container">
      <canvas class="canvas" ref="canvas" width="1000" height="1000"></canvas>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.snake {
  .canvas {
    border: solid 1px $surface01;
  }
  .alert-container {
    position: fixed;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    color: darkorange;
    font-size: 40px;
    text-align: center;
    background-color: #7c7c7c1a;
    padding: 20px;
    width: 400px;
    border-radius: 20px;
    margin: auto;
  }
}
</style>
