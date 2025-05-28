const fetch = require('node-fetch'); // npm install node-fetch@2 if not installed
const CAMPAIGN_ID = 'PASTE_CAMPAIGN_ID_HERE'; // Replace with real campaign ID
const TOTAL_REQUESTS = 100;

async function claimCoupon(i) {
  const res = await fetch(`http://localhost:3000/campaigns/${CAMPAIGN_ID}/claim`, {
    method: 'POST',
  });

  const data = await res.json();
  console.log(`#${i + 1}:`, data.code || data.error);
}

async function runLoadTest() {
  const requests = [];
  for (let i = 0; i < TOTAL_REQUESTS; i++) {
    requests.push(claimCoupon(i));
  }

  await Promise.all(requests);
  console.log('✅ Load test finished');
}

runLoadTest();
