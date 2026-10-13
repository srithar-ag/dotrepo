// DotRepo Full-Stack Express Server (Dev & Production)
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Handlers
import registerHandler from './api/register';
import verifyPaymentHandler from './api/verify-payment';
import webhookHandler from './api/webhook';
import adminRegistrationsHandler from './api/admin/registrations';
import adminRegistrationStatusHandler from './api/admin/registration-status';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);
  const isProd = process.env.NODE_ENV === 'production';

  // Raw body capture for Razorpay webhook verification
  app.use(
    express.json({
      verify: (req: any, _res, buf) => {
        req.rawBody = buf.toString();
      },
    })
  );
  app.use(express.urlencoded({ extended: true }));

  // API Route Mappings (Identical to Vercel Serverless Function behavior)
  app.all('/api/register', (req, res) => registerHandler(req, res));
  app.all('/api/verify-payment', (req, res) => verifyPaymentHandler(req, res));
  app.all('/api/webhook', (req, res) => webhookHandler(req, res));
  app.all('/api/admin/registrations', (req, res) => adminRegistrationsHandler(req, res));
  app.all('/api/admin/registration-status', (req, res) => adminRegistrationStatusHandler(req, res));

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'dotrepo-internships',
      feeInr: 199,
      timestamp: new Date().toISOString(),
    });
  });

  if (!isProd) {
    // Development mode: Mount Vite dev middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Serve built assets from dist
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[DotRepo Server] Running on http://0.0.0.0:${PORT} (${isProd ? 'Production' : 'Development'})`);
  });
}

startServer().catch((err) => {
  console.error('[DotRepo Server] Failed to start:', err);
  process.exit(1);
});
