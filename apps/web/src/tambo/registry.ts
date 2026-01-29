import { TamboComponent } from "@tambo-ai/react";
import { SimpleChart } from "../components/SimpleChart";
import { TodoList } from "../components/TodoList";
import { z } from "zod";

export const components: TamboComponent[] = [
  {
    name: "chart",
    component: SimpleChart,
    description:
      "Display a visual chart by fetching data from the Elysia backend. Use this for showing sales, revenue, users, growth, or any data trends.",
    propsSchema: z.object({
      topic: z
        .string()
        .describe(
          "The topic to generate chart data for (e.g., 'sales', 'users', 'revenue', 'growth')",
        ),
    }),
  },
  {
    name: "todo",
    component: TodoList,
    description:
      "Create and manage a todo list. Items are stored on the Elysia backend for persistence.",
    propsSchema: z.object({
      title: z.string().optional().describe("Title of the task list"),
      initialItems: z
        .array(
          z.object({
            id: z.string(),
            text: z.string(),
            completed: z.boolean(),
          }),
        )
        .optional()
        .describe("List of initial tasks"),
    }),
  },
];
