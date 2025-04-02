const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 9876;

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNjA0MjM4LCJpYXQiOjE3NDM2MDM5MzgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImYzODBlYWQyLWRlYzUtNDI3My1hODg0LWU2YjYwZDI3OTk4MSIsInN1YiI6IjIyMDUzNTYyQGtpaXQuYWMuaW4ifSwiZW1haWwiOiIyMjA1MzU2MkBraWl0LmFjLmluIiwibmFtZSI6InVubWVzaGEgc2luZ2giLCJyb2xsTm8iOiIyMjA1MzU2MiIsImFjY2Vzc0NvZGUiOiJud3B3cloiLCJjbGllbnRJRCI6ImYzODBlYWQyLWRlYzUtNDI3My1hODg0LWU2YjYwZDI3OTk4MSIsImNsaWVudFNlY3JldCI6Imp0ckp5U3lXUnV5UG5YUGQifQ.jJunXrf9Eh6K7arrnCZJ6y-K5WNjwkXTILR37MD6Bpk";

const numberTypeToEndpoint = {
  p: "primes",
  f: "fibo",
  e: "even",
  r: "rand",
};

app.get("/numbers/:number_id", async (req, res) => {
  const numberId = req.params.number_id;
  const endpoint = numberTypeToEndpoint[numberId];

  if (!endpoint) {
    return res.status(400).json({ error: "Invalid number ID" });
  }

  try {
    console.log(` Fetching numbers from: http://20.244.56.144/evaluation-service/${endpoint}`);

    const response = await axios.get(
      `http://20.244.56.144/evaluation-service/${endpoint}`,
      {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
        timeout: 2000,
      }
    );

    console.log(" API Response Data:", response.data);

    res.json(response.data); 
  } catch (err) {
    console.error(" API Request Error:", err.response ? err.response.data : err.message);
    res.status(500).json({ error: "Failed to fetch numbers" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
