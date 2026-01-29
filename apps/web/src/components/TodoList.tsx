import { useState, useEffect, useRef } from "react";
import { Check, Plus, Trash2, Square, Cloud } from "lucide-react";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  title?: string;
  initialItems?: TodoItem[];
}

export function TodoList({
  title = "Tasks",
  initialItems = [],
}: TodoListProps) {
  const [items, setItems] = useState<TodoItem[]>(initialItems);
  const [newItemText, setNewItemText] = useState("");
  const [saving, setSaving] = useState(false);
  const listId = useRef(`list-${Date.now()}`);

  // Save to backend whenever items change
  useEffect(() => {
    if (items.length === 0) return;

    const saveToBackend = async () => {
      setSaving(true);
      try {
        await fetch("http://localhost:3000/api/todos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ listId: listId.current, title, items }),
        });
      } catch (err) {
        console.error("Failed to save todos:", err);
      } finally {
        setSaving(false);
      }
    };

    // Debounce save
    const timeout = setTimeout(saveToBackend, 500);
    return () => clearTimeout(timeout);
  }, [items, title]);

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem: TodoItem = {
      id: crypto.randomUUID(),
      text: newItemText,
      completed: false,
    };

    setItems([...items, newItem]);
    setNewItemText("");
  };

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <div className="flex items-center gap-2">
          {saving && (
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Cloud className="w-3 h-3 animate-pulse" />
              Saving...
            </span>
          )}
          <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">
            {items.filter((i) => i.completed).length}/{items.length} Done
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`group flex items-center gap-3 p-3 rounded-xl transition-all border animate-in fade-in slide-in-from-bottom-2 fill-mode-both ${
              item.completed
                ? "bg-slate-50 border-slate-100"
                : "bg-white border-slate-200 hover:border-indigo-200 shadow-sm"
            }`}
            style={{
              animationDelay: `${index * 100}ms`,
              animationDuration: "400ms",
            }}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                item.completed
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-400 hover:bg-indigo-50 hover:text-indigo-500"
              }`}
            >
              {item.completed ? (
                <Check className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
            </button>
            <span
              className={`flex-1 text-sm font-medium transition-colors ${
                item.completed
                  ? "text-slate-400 line-through"
                  : "text-slate-700"
              }`}
            >
              {item.text}
            </span>
            <button
              onClick={() => deleteItem(item.id)}
              className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={addItem} className="relative">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add a new task..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-12 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
        />
        <button
          type="submit"
          disabled={!newItemText.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
