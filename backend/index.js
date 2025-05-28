const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const redis = require('redis');
require('dotenv').config(); // ✅ Load .env config

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Redis client setup
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const client = redis.createClient({ url: REDIS_URL });

console.log('🔍 Connecting to Redis at:', REDIS_URL);

// ✅ Connect Redis and start server after successful connection
client.connect()
  .then(() => {
    console.log('✅ Redis connected');

    // Create a new campaign
    app.post('/campaigns', async (req, res) => {
      const { name, totalCoupons, startTime } = req.body;

      if (!name || !totalCoupons || !startTime) {
        return res.status(400).json({ error: 'Invalid input' });
      }

      const id = uuidv4();
      const campaignKey = `campaign:${id}`;

      await client.hSet(campaignKey, {
        name,
        totalCoupons,
        startTime,
        issuedCount: 0
      });

      await client.del(`${campaignKey}:codes`);

      res.json({ id, message: 'Campaign created successfully' });
    });

    // Get campaign details
    app.get('/campaigns/:id', async (req, res) => {
      const campaignKey = `campaign:${req.params.id}`;
      const campaign = await client.hGetAll(campaignKey);

      if (!campaign || Object.keys(campaign).length === 0) {
        return res.status(404).json({ error: 'Campaign not found' });
      }

      const codes = await client.lRange(`${campaignKey}:codes`, 0, -1);

      res.json({
        ...campaign,
        issued: codes,
        issuedCount: parseInt(campaign.issuedCount || 0)
      });
    });

    // Claim a coupon
    app.post('/campaigns/:id/claim', async (req, res) => {
      const id = req.params.id;
      const campaignKey = `campaign:${id}`;
      const codesKey = `${campaignKey}:codes`;

      const campaign = await client.hGetAll(campaignKey);

      if (!campaign || Object.keys(campaign).length === 0) {
        return res.status(404).json({ error: 'Campaign not found' });
      }

      const now = new Date();
      const startTime = new Date(campaign.startTime);
      const total = parseInt(campaign.totalCoupons);
      const issuedCount = parseInt(campaign.issuedCount);

      if (now < startTime) {
        return res.status(400).json({ error: 'Campaign has not started yet' });
      }

      if (issuedCount >= total) {
        return res.status(400).json({ error: 'All coupons have been claimed' });
      }

      const code = Math.random().toString(36).substring(2, 12).toUpperCase();

      await client.rPush(codesKey, code);
      await client.hSet(campaignKey, 'issuedCount', issuedCount + 1);

      res.json({ code });
    });

    // Start server after Redis is ready
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

  })
  .catch(err => {
    console.error('❌ Redis connection failed:', err.message);
    console.error(err); // Full error details
  });
