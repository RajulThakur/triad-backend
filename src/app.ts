import express from 'express';

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Triad" });
});

// mentor router
import mentorRouter from './routers/mentor.js';
app.use("/api/v1/mentors", mentorRouter);

//course router
import courseRouter from './routers/course.js';
app.use("/api/v1/courses", courseRouter);

export default app;
