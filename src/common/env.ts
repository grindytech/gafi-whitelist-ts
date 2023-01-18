import('dotenv/config');

// env.ts
export default () => ({
    // Add your own properties here however you'd like
    port: parseInt(process.env.PORT, 10) || 3000,
});