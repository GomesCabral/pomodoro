let isRunning = false;

self.onmessage = e => {
  if (isRunning) return;

  isRunning = true;

  const state = e.data;
  const { activeTask, secondRemaining } = state;

  if (!activeTask || !activeTask.startDate) {
    console.error('activeTask ou startDate indefinido');
    isRunning = false;
    return;
  }

  const startDateMs =
    typeof activeTask.startDate === 'string'
      ? new Date(activeTask.startDate).getTime()
      : activeTask.startDate;

  const endDate = startDateMs + secondRemaining * 1000;

  function tick() {
    const now = Date.now();
    const countDownSeconds = Math.max(0, Math.floor((endDate - now) / 1000));
    self.postMessage(countDownSeconds);

    if (countDownSeconds <= 0) {
      isRunning = false;
      return;
    }

    setTimeout(tick, 1000);
  }

  tick();
};
