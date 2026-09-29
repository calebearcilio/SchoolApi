require("dotenv/config");
const express = require("express");
const routes = require("./routes");
const ApiError = require("./errors/apiError");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("", routes);

// Global middleware
app.use((error, req, res, next) => {
  if (error instanceof ApiError) {
    const response = { error: error.message };

    if (error.errors?.length) {
      response.errors = error.errors;
    }

    return res.status(error.statusCode).json(response);
  }

  return res.status(500).json({ error: "Erro interno do servidor." });
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
