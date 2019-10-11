window.onload = () => {
  function drawScale() {
    for (let i = 0; i < 360; i += 6) {
      const markMinute = document.createElement('div');
      const markHour = i % 5;

      markMinute.innerHTML = '|';
      markMinute.classList.add('clock__mark');
      markMinute.style.transform = `rotate(${i}deg)`;

      if (markHour === 0) {
        markMinute.classList.add('clock__mark_fat');
      }

      document.querySelector('.clock__scale').append(markMinute);
    }
  }

  function drawNumbers() {
    const numbers = document.querySelector('.clock__numbers');
    const radius = parseInt(getComputedStyle(numbers).width, 10) / 2;
    let angle = 0;

    for (let j = 1; j <= 12; j++) {
      angle += 30;

      const number = document.createElement('div');
      number.innerHTML = j;
      number.classList.add('clock__number');

      numbers.append(number);

      const numbWidth = parseInt(getComputedStyle(number).width, 10);
      const numbHeight = parseInt(getComputedStyle(number).height, 10);

      const coordX = radius + radius * Math.cos(((angle - 90) * Math.PI) / 180) - numbWidth / 2;
      const coordY = radius + radius * Math.sin(((angle - 90) * Math.PI) / 180) - numbHeight / 2;

      number.style.left = `${coordX}px`;
      number.style.top = `${coordY}px`;
    }
  }

  function drawArrows() {
    const clock = document.querySelector('.clock');
    const arrowHour = document.querySelector('.arrow_hour');
    const arrowMin = document.querySelector('.arrow_min');
    const arrowSec = document.querySelector('.arrow_sec');

    const arrowHourShadow = arrowHour.cloneNode(true);
    const arrowMinShadow = arrowMin.cloneNode(true);
    const arrowSecShadow = arrowSec.cloneNode(true);

    arrowHourShadow.classList.add('shadow');
    arrowMinShadow.classList.add('shadow');
    arrowSecShadow.classList.add('shadow');

    clock.append(arrowHourShadow, arrowMinShadow, arrowSecShadow);

    function rotateArrow() {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      let angleHour = hours;
      let angleMin = minutes;
      let angleSec = seconds;

      angleHour = hours * 30 + minutes / 2;
      angleMin *= 6;
      angleSec *= 6;

      arrowHour.style.transform = `rotate(${angleHour}deg)`;
      arrowMin.style.transform = `rotate(${angleMin}deg)`;
      arrowSec.style.transform = `rotate(${angleSec}deg)`;

      arrowHourShadow.style.transform = `rotate(${angleHour}deg)`;
      arrowMinShadow.style.transform = `rotate(${angleMin}deg)`;
      arrowSecShadow.style.transform = `rotate(${angleSec}deg)`;

      if (angleHour === 360) {
        angleHour = 0;
        arrowHour.style.transform = `rotate(${angleHour}deg)`;
      }

      if (angleMin === 360) {
        angleMin = 0;
        arrowMin.style.transform = `rotate(${angleMin}deg)`;
      }

      if (angleSec === 360) {
        angleSec = 0;
        arrowSec.style.transform = `rotate(${angleSec}deg)`;
      }
    }
    setInterval(rotateArrow, 1000);
  }

  drawScale();
  drawNumbers();
  drawArrows();
};