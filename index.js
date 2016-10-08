function getUserInfo(intractive=true) {
  chrome.runtime.sendMessage({"type": "getUserInfo", "interactive": intractive});
}

function revoke() {
  chrome.runtime.sendMessage({"type": "removeCachedToken"});
  show();
}

function show(text) {
  document.getElementById('user_info').innerHTML = text || "";
}

function messageListener(message) {
  show("<pre>" + JSON.stringify(message.error || message.user) + "</pre>");
}

window.onload = () => {
  chrome.runtime.onMessage.addListener(messageListener);
  getUserInfo(false);
  document.getElementById('signin').onclick = () => { getUserInfo(); };
  document.getElementById('revoke').onclick = revoke;
};
