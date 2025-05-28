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

async function viewCampaign() {
  const id = document.getElementById('viewCampaignId').value;

  const response = await fetch(`${API}/campaigns/${id}`);
  const data = await response.json();

  const output = document.getElementById('campaignDetails');
  output.innerHTML = ''; // Clear previous

  if (data.error) {
    output.innerHTML = `<p style="color:red;">❌ ${data.error}</p>`;
    return;
  }

  const issuedList = data.issued.map((code, index) => `<li>${index + 1}. ${code}</li>`).join('');

  output.innerHTML = `
    <p><strong>Campaign Name:</strong> ${data.name}</p>
    <p><strong>Total Coupons:</strong> ${data.totalCoupons}</p>
    <p><strong>Issued Coupons:</strong> ${data.issuedCount}</p>
    <p><strong>Start Time:</strong> ${new Date(data.startTime).toLocaleString()}</p>
    <p><strong>Coupons Issued:</strong></p>
    <ul>${issuedList}</ul>
  `;
}
