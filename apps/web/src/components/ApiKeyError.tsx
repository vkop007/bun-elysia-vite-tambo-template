import { AlertCircle, Key, ExternalLink } from "lucide-react";

export function ApiKeyError() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              API Key Missing
            </h1>
            <p className="text-sm text-slate-500">Configuration required</p>
          </div>
        </div>

        <p className="text-slate-600 mb-6">
          To use this template, you need to set up your Tambo API key.
        </p>

        <div className="bg-slate-50 rounded-xl p-4 mb-6">
          <h2 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <Key className="h-4 w-4" />
            Setup Instructions
          </h2>
          <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
            <li>
              Get your API key from{" "}
              <a
                href="https://tambo.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center gap-1"
              >
                tambo.ai
                <ExternalLink className="h-3 w-3" />
              </a>
            </li>
            <li>
              Create a{" "}
              <code className="bg-slate-200 px-1.5 py-0.5 rounded text-xs font-mono">
                .env
              </code>{" "}
              file in the project root
            </li>
            <li>
              Add your key:
              <pre className="bg-slate-200 rounded-lg p-2 mt-1 text-xs font-mono overflow-x-auto">
                VITE_TAMBO_API_KEY=tambo_your_key_here
              </pre>
            </li>
            <li>Restart the dev server</li>
          </ol>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="w-full bg-indigo-600 text-white rounded-lg py-3 font-medium hover:bg-indigo-700 transition-colors"
        >
          I've added my API key - Reload
        </button>
      </div>
    </div>
  );
}
