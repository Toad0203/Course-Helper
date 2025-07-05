import express from "express";
import pg from "pg";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const db = new pg.Client({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
});
db.connect();

const JWT_SECRET = process.env.JWT_SECRET;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post("/filter", async (req, res) => {
  // const response = await db.query(
  //   "",
  //   [
  //     req.body.courseNo,
  //     req.body.courseName,
  //     req.body.prof,
  //     req.body.year,
  //     req.body.semester,
  //   ]
  // );
  // console.log(response);
  // if (response.rows.length > 0) {
  //   const courseId = response.rows[0];
  //   const result = await db.query(
  //     "SELECT * FROM resources where course_id=$1",
  //     [courseId]
  //   );
  //   console.log(result.rows);
  // }
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const existing = await db.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);

  if (existing.rows.length > 0)
    return res.status(400).json({ message: "Email already registered" });

  await db.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [name, email, hashedPassword]
  );

  res.status(201).json({ message: "User registered" });
});

app.get("/dashboard", authenticateToken, (req, res) => {
  res.send(`Hello, user with email: ${req.user.email}`);
});

app.get("/", async (req, res) => {
  const response = await db.query("SELECT * FROM courses");
  res.send(response.rows);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userRes = await db.query("SELECT * FROM users WHERE email=$1", [email]);
  const user = userRes.rows[0];
  if (!user) return res.status(400).json({ message: "Invalid email" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

app.post("/post", async (req, res) => {
  console.log(req.body);
  const result = await db.query(
    "SELECT * FROM courses WHERE course_no=$1 AND course_name=$2 AND prof_name=$3 AND course_year=$4 AND semester=$5",
    [
      req.body.courseNo,
      req.body.courseName,
      req.body.profName,
      req.body.year,
      req.body.sem,
    ]
  );
  console.log(result.rows);
  if (result.rows.length === 0) {
    const course = await db.query(
      "INSERT INTO courses (course_no, course_name, prof_name, course_year, semester) VALUES ($1, $2, $3, $4, $5)",
      [
        req.body.courseNo,
        req.body.courseName,
        req.body.profName,
        req.body.year,
        req.body.sem,
      ]
    );
    console.log(course.rows);
    const courseId = course.rows[0].id;
    console.log(courseId);
    await db.query(
      "INSERT INTO resources (course_id, resource_type, resource_link) VALUES ($1, $2, $3)",
      [courseId, req.body.resourceType, req.body.resource_link]
    );
  } else {
    console.log(result.rows);
    const courseId = result.rows[0].id;
    console.log(courseId);
    await db.query(
      "INSERT INTO resources (course_id, resource_type, resource_link) VALUES ($1, $2, $3)",
      [courseId, req.body.resourceType, req.body.resource_link]
    );
  }
  res.json({ message: "Resource added" });
});

app.get("/courses", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM courses ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

app.get("/courses/:id/resources", async (req, res) => {
  const courseId = req.params.id;

  try {
    const result = await db.query(
      "SELECT * FROM resources WHERE course_id = $1",
      [courseId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching resources:", err);
    res.status(500).json({ error: "Failed to fetch resources" });
  }
});

app.post("/register", (req, res) => {
  console.log(req.body);
});

app.post("/login", (req, res) => {
  console.log(req.body);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
