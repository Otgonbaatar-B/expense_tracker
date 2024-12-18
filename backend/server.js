import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { neon } from "@neondatabase/serverless";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

const sql = neon(`${process.env.DATABASE_URL}`);

app.get("/", (request, response) => {
  response.send("Hello GET huselt irlee");
});

app.get("/records", async (_, res) => {
  try {
    const response = await sql`SELECT * FROM record`;
    res.json({ response });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch records", details: error.message });
  }
});

app.post("/sign-in", async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await sql`
      SELECT * FROM users WHERE email = ${email} AND password = ${password}
    `;

    if (user.length > 0) {
      response.json({
        success: true,
        user: user[0],
      });
    } else {
      response.json({
        success: false,
        // message: "Invalid email or passworddd",
        user: user[0],
      });
    }
  } catch (error) {
    response.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.post("/sign-up", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        exists: true,
        message: "Username or email already exists",
      });
    }

    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${password})
    `;

    res.json({
      success: true,
      exists: false,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер ажиллаж эхэллээ: http://localhost:${PORT}`);
});
