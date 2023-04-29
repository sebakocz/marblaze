const sliderSize = document.getElementById(
  'slider-ball-size'
) as HTMLInputElement;
const sliderBounce = document.getElementById(
  'slider-ball-bounce'
) as HTMLInputElement;
const sliderFriction = document.getElementById(
  'slider-ball-friction'
) as HTMLInputElement;

export let ballRadius = parseInt(sliderSize.value, 10);
sliderSize.addEventListener('input', () => {
  ballRadius = parseInt(sliderSize.value, 10);
});

export let ballBounce = parseInt(sliderBounce.value, 10) / 100;
sliderBounce.addEventListener('input', () => {
  ballBounce = parseInt(sliderBounce.value, 10) / 100;
});

export let ballFriction = parseInt(sliderFriction.value, 10) / 100;
sliderFriction.addEventListener('input', () => {
  ballFriction = parseInt(sliderFriction.value, 10) / 100;
});
