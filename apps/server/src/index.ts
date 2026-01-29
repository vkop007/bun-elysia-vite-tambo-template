import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import {
  chartDataHandler,
  getTodosHandler,
  createTodoHandler,
} from "./handlers";

const app = new Elysia()
  .use(cors())
  .get("/", () => "Tambo + Elysia AI Server is running")
  // Chart API - generates chart data for visualization
  .get("/api/chart", chartDataHandler)
  // Todos API - server-side storage for todos
  .get("/api/todos", getTodosHandler)
  .post("/api/todos", createTodoHandler);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
console.log("📡 Available endpoints:");
console.log("  GET  /api/chart?topic=<topic>");
console.log("  GET  /api/todos?listId=<id>");
console.log("  POST /api/todos");
