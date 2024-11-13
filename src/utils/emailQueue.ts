import { Queue, Worker } from 'bullmq';
import { sendEmail } from './email';

const emailQueue = new Queue('emailQueue', {
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
});

const emailWorker = new Worker('emailQueue', async job => {
  const { to, subject, html } = job.data;
  await sendEmail({ to, subject, html });
}, {
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
});

export { emailQueue };