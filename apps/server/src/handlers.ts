/**
 * Backend API Handlers
 * These handlers demonstrate the full-stack pattern where Tambo components call the Elysia backend.
 */

// In-memory storage for todos
const todoStore = new Map<
  string,
  { id: string; text: string; completed: boolean }[]
>();

/**
 * Chart Data Handler - Generates chart data from backend
 * Called by SimpleChart component
 */
export const chartDataHandler = ({ query }: { query: { topic?: string } }) => {
  const topic = query.topic || "monthly sales";

  // Generate sample data based on topic
  const generateData = (topic: string) => {
    const dataTemplates: Record<
      string,
      { labels: string[]; valueRange: [number, number] }
    > = {
      sales: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        valueRange: [1000, 5000],
      },
      users: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        valueRange: [100, 500],
      },
      revenue: {
        labels: ["Q1", "Q2", "Q3", "Q4"],
        valueRange: [50000, 200000],
      },
      growth: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        valueRange: [5, 25],
      },
      default: { labels: ["A", "B", "C", "D", "E"], valueRange: [10, 100] },
    };

    const key =
      Object.keys(dataTemplates).find((k) => topic.toLowerCase().includes(k)) ||
      "default";
    const template = dataTemplates[key];

    return template.labels.map((label) => ({
      label,
      value: Math.floor(
        Math.random() * (template.valueRange[1] - template.valueRange[0]) +
          template.valueRange[0],
      ),
    }));
  };

  return {
    title: topic.charAt(0).toUpperCase() + topic.slice(1),
    data: generateData(topic),
  };
};

/**
 * Get Todos Handler - Fetch todos from server-side store
 * Called by TodoList component
 */
export const getTodosHandler = ({ query }: { query: { listId?: string } }) => {
  const listId = query.listId || "default";
  const items = todoStore.get(listId) || [];
  return { listId, items };
};

/**
 * Create Todo Handler - Save todos to server-side store
 * Called when AI generates a todo list
 */
export const createTodoHandler = async ({ body, set }: any) => {
  const { listId = "default", title, items } = body;

  if (!items || !Array.isArray(items)) {
    set.status = 400;
    return { error: "Items array is required" };
  }

  todoStore.set(listId, items);
  return { success: true, listId, title, count: items.length };
};
