"use client";

import { useState, useEffect, useRef } from "react";
import { MdVideoCall, MdSmartToy, MdSearch } from "react-icons/md";

interface SearchResult {
  id: string;
  type: "meeting" | "agent";
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock data for testing
const mockData: SearchResult[] = [
  {
    id: "meeting-1",
    type: "meeting",
    title: "Weekly Team Standup",
    description: "Daily sync with the development team",
    href: "/meetings/weekly-standup",
    icon: <MdVideoCall className="h-4 w-4" />
  },
  {
    id: "meeting-2", 
    type: "meeting",
    title: "Product Review Session",
    description: "Review new features and roadmap",
    href: "/meetings/product-review",
    icon: <MdVideoCall className="h-4 w-4" />
  },
  {
    id: "agent-1",
    type: "agent",
    title: "Meeting Assistant",
    description: "AI agent for meeting transcription and notes",
    href: "/agents/meeting-assistant",
    icon: <MdSmartToy className="h-4 w-4" />
  },
  {
    id: "agent-2",
    type: "agent", 
    title: "Follow-up Bot",
    description: "Automated follow-up email generator",
    href: "/agents/follow-up-bot",
    icon: <MdSmartToy className="h-4 w-4" />
  },
  {
    id: "meeting-3",
    type: "meeting",
    title: "Client Demo",
    description: "Product demonstration for potential clients",
    href: "/meetings/client-demo",
    icon: <MdVideoCall className="h-4 w-4" />
  }
];

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Filter results based on query
  const filteredResults = mockData.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredResults.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : filteredResults.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (filteredResults[selectedIndex]) {
            // Navigate to the selected item
            window.location.href = filteredResults[selectedIndex].href;
            onClose();
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredResults, onClose]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current && selectedIndex >= 0) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth"
        });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-2xl p-0">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-base-300">
          <MdSearch className="h-5 w-5 text-base-content/60" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search meetings and agents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input input-ghost flex-1 text-lg placeholder-base-content/60"
          />
          <kbd className="kbd kbd-sm hidden sm:inline-flex">ESC</kbd>
        </div>

        {/* Results */}
        <div ref={resultsRef} className="max-h-96 overflow-y-auto">
          {filteredResults.length === 0 ? (
            <div className="p-8 text-center text-base-content/60">
              {query ? "No results found" : "Start typing to search..."}
            </div>
          ) : (
            <div className="py-2">
              {filteredResults.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => {
                    window.location.href = result.href;
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 p-4 text-left hover:bg-base-200 transition-colors ${
                    index === selectedIndex ? "bg-base-200" : ""
                  }`}
                >
                  <div className="flex-shrink-0 text-base-content/60">
                    {result.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-base-content truncate">
                        {result.title}
                      </p>
                      <div className={`badge badge-sm ${
                        result.type === "meeting" 
                          ? "badge-primary" 
                          : "badge-secondary"
                      }`}>
                        {result.type}
                      </div>
                    </div>
                    <p className="text-sm text-base-content/60 truncate">
                      {result.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 bg-base-200 text-xs text-base-content/60">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="kbd kbd-xs">↑↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="kbd kbd-xs">↵</kbd>
              <span>Select</span>
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="kbd kbd-xs">⌘K</kbd>
            <span>Search</span>
          </span>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
