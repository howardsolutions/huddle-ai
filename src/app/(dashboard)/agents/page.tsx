"use client";

export default function AgentsPage() {
  return (  
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          AI Agents
        </h1>
        <p className="text-gray-600">
          Manage and configure your AI assistants for meetings
        </p>
      </div>

      {/* Agents Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your AI Agents
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Create and customize AI agents to assist with meeting management, note-taking, and follow-ups
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
              + Create Agent
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              Browse Templates
            </button>
          </div>
        </div>
      </div>

      {/* Placeholder for agents list */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No agents created yet</h3>
          <p className="text-gray-600 mb-4">Create your first AI agent to enhance your meetings</p>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
            Create Agent
          </button>
        </div>
      </div>
    </>
  );
}
