const express = require('express');
const winston = require('winston');
const app = express();
app.use(express.json());

//setup winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculator-microservice' },
  transports: [
      new winston.transports.Console({
          format: winston.format.simple(),
      }),
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Validate inputs
function validateNumbers(num1, num2) {
  if (isNaN(num1)) {
    return { error: "Error!. num1 must be a number." };
  } else if (isNaN(num2)) {
    return { error: "Error!. num2 must be a number." };
  }
  return null;
}

// log every request
app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`);
  next();
});

// Addition 
app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;
  const error = validateNumbers(num1, num2);
  if (error) {
      logger.error(`Addition Error: ${JSON.stringify(error)}`);
      return res.status(400).json(error);
  }
  const result = num1 + num2;
  logger.info(`Addition result: ${result}`);
  res.json({ result });
});

// Subtraction 
app.post('/subtract', (req, res) => {
  const { num1, num2 } = req.body;
  const error = validateNumbers(num1, num2);
  if (error) {
      logger.error(`Subtraction Error: ${JSON.stringify(error)}`);
      return res.status(400).json(error);
  }
  const result = num1 - num2;
  logger.info(`Subtraction result: ${result}`);
  res.json({ result });
});

// Multiplication 
app.post('/multiply', (req, res) => {
  const { num1, num2 } = req.body;
  const error = validateNumbers(num1, num2);
  if (error) {
      logger.error(`Multiplication Error: ${JSON.stringify(error)}`);
      return res.status(400).json(error);
  }
  const result = num1 * num2;
  logger.info(`Multiplication result: ${result}`);
  res.json({ result });
});

// Division 
app.post('/divide', (req, res) => {
  const { num1, num2 } = req.body;
  const error = validateNumbers(num1, num2);
  if (error) {
      logger.error(`Division Error: ${JSON.stringify(error)}`);
      return res.status(400).json(error);
  }
  if (num2 === 0) {
      logger.error("Division Error: Cannot divide by zero.");
      return res.status(400).json({ error: "Cannot divide by zero." });
  }
  const result = num1 / num2;
  logger.info(`Division result: ${result}`);
  res.json({ result });
});

// Exponentiation
app.post('/exponentiate', (req, res) => {
  const { base, exponent } = req.body;

  if (typeof base !== 'number' || typeof exponent !== 'number') {
    logger.error(`Invalid input for exponentiation: ${base}, ${exponent}`);
    return res.status(400).json({ error: 'Both base and exponent must be numbers' });
  }

  const result = Math.pow(base, exponent);
  logger.info(`Exponentiation: ${base} ^ ${exponent} = ${result}`);
  res.json({ result });
});

// square root
app.post('/sqrt', (req, res) => {
  const { number } = req.body;

  if (typeof number !== 'number') {
    logger.error(`Invalid input for square root: ${number}`);
    return res.status(400).json({ error: 'Input must be a number' });
  }

  if (number < 0) {
    logger.error(`Square root of negative number: ${number}`);
    return res.status(400).json({ error: 'Cannot calculate square root of a negative number' });
  }

  const result = Math.sqrt(number);
  logger.info(`Square root: √${number} = ${result}`);
  res.json({ result });
});

//modulo
app.post('/modulo', (req, res) => {
  const { num1, num2 } = req.body;

  const error = validateNumbers(num1, num2);
  if (error) {
      logger.error(`Modulo Error: ${JSON.stringify(error)}`);
      return res.status(400).json(error);
  }
  if (num2 === 0) {
      logger.error("Modulo Error: Cannot divide by zero.");
      return res.status(400).json({ error: "Cannot divide by zero." });
  }

  const result = num1 % num2;
  logger.info(`Modulo: ${num1} % ${num2} = ${result}`);
  res.json({ result });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

