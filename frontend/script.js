const API = 'http://localhost:3000';

async function createCampaign() {
  const name = document.getElementById('name').value;
  const total = Number(document.getElementById('total').value);
  const startTime = document.getElementById('startTime').value;

  try {
    const res = await fetch(`${API}/campaigns`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, totalCoupons: total, startTime })
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    document.getElementById('createResult').textContent = `✅ Created! Campaign ID: ${data.id}`;
  } catch (error) {
    console.error('❌ Error while creating campaign:', error);
    document.getElementById('createResult').textContent = '❌ Failed to create campaign';
  }
}

async function claimCoupon() {
  const id = document.getElementById('campaignId').value;

  try {
    const res = await fetch(`${API}/campaigns/${id}/claim`, {
      method: 'POST'
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    document.getElementById('claimResult').textContent = data.code
      ? `🎉 Your Coupon Code: ${data.code}`
      : `❌ ${data.error}`;
  } catch (error) {
    console.error('❌ Error while claiming coupon:', error);
    document.getElementById('claimResult').textContent = '❌ Failed to claim coupon';
  }
}
