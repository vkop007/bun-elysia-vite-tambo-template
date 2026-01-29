import { useEffect, useState } from "react";
import { BarChart3, Loader2 } from "lucide-react";

interface DataPoint {
  label: string;
  value: number;
}

interface SimpleChartProps {
  topic: string;
}

export function SimpleChart({ topic }: SimpleChartProps) {
  const [data, setData] = useState<DataPoint[]>([]);
  const [title, setTitle] = useState(topic);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:3000/api/chart?topic=${encodeURIComponent(topic)}`,
        );
        if (!response.ok) throw new Error("Failed to fetch chart data");
        const result = await response.json();
        setTitle(result.title);
        setData(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load chart");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [topic]);

  if (loading) {
    return (
      <div className="p-6 bg-white w-full flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
        <span className="ml-3 text-slate-600">Fetching chart data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white w-full">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
          <p className="font-medium">Unable to load chart</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="p-6 bg-white w-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-50 rounded-xl text-slate-900 border border-slate-100">
            <BarChart3 className="h-4 w-4" />
          </div>
          <h3 className="font-semibold text-sm tracking-tight text-slate-900">
            {title}
          </h3>
        </div>
        <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
          From Backend
        </div>
      </div>

      <div className="flex items-end gap-4 h-48 pt-4 border-b border-slate-100/60 pb-4">
        {data.map((point, index) => {
          const heightPercentage = Math.round((point.value / maxValue) * 100);
          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-3 group h-full justify-end"
            >
              <div
                className="w-full max-w-[24px] bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-all relative animate-in slide-in-from-bottom-4 duration-500 shadow-sm"
                style={{
                  height: `${Math.max(heightPercentage, 4)}%`,
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold py-1.5 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 shadow-xl pointer-events-none z-10">
                  {point.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-start gap-4 mt-4">
        {data.map((point, index) => (
          <div
            key={index}
            className="flex-1 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate"
            title={point.label}
          >
            {point.label}
          </div>
        ))}
      </div>
    </div>
  );
}
