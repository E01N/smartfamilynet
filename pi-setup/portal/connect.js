document.getElementById('wifi-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const ssid = e.target.ssid.value;
  const password = e.target.password.value;

  const response = await fetch('/connect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ssid, password }),
  });

  const result = await response.text();
  document.getElementById('status').textContent = result;
});
