const username = process.env.API_USERNAME;
const password = process.env.API_PASSWORD;

if (!username || !password) {
  throw new Error('Lipsesc API_USERNAME sau API_PASSWORD. Verifică fișierul .env.');
}

const validCredentials = { username, password };

export default validCredentials;