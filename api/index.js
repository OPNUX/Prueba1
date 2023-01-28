import morgan from "morgan";
import express from "express";
import { dbConnect } from "./src/database/database.js"
import cookieParser from "cookie-parser";
import cors from "cors";

//Import routes
import authRoutes from "./src/routes/auth.js";
import commentRoutes from "./src/routes/comments.js";
import likeRoutes from "./src/routes/likes.js";
import postRoutes from "./src/routes/posts.js";
import userRoutes from "./src/routes/users.js";

//Database//

dbConnect;

//Server//

//Starting the server
const app = express();
app.set("port", 4000);
app.listen(app.get("port"), ()=> {
    console.log(`Server on port ${app.get("port")}`)
});

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

