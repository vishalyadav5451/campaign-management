const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

const campaigns = new Map();

// Create campaign
app.post('/campaigns', (req, res) => {
  const { name, totalCoupons, startTime } = req.body;
  const id = uuidv4();
  campaigns.set(id, { name, totalCoupons, startTime: new Date(startTime), issued: [] });
  res.json({ id, message: 'Campaign created' });
});

// Get campaign info
app.get('/campaigns/:id', (req, res) => {
  const campaign = campaigns.get(req.params.id);
  if (!campaign) return res.status(404).json({ error: 'Not found' });
  res.json({ ...campaign, issuedCount: campaign.issued.length });
});

// Claim coupon
app.post('/campaigns/:id/claim', (req, res) => {
  const campaign = campaigns.get(req.params.id);
  if (!campaign) return res.status(404).json({ error: 'Not found' });

  const now = new Date();
  if (now < campaign.startTime) return res.status(400).json({ error: 'Campaign not started yet' });
  if (campaign.issued.length >= campaign.totalCoupons) return res.status(400).json({ error: 'All coupons claimed' });

  const code = Math.random().toString(36).substring(2, 12).toUpperCase(); // 10-char code
  campaign.issued.push(code);
  res.json({ code });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:3000`));
