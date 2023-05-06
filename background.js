chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'pomodoro') {
      chrome.runtime.sendMessage({ action: 'playAlarm' });
    }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startTimer') {
    chrome.alarms.create('pomodoro', { delayInMinutes: message.minutes });
  } else if (message.action === 'stopTimer') {
    chrome.alarms.clear('pomodoro');
  }
});
