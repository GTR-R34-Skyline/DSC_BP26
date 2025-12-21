"use client";

import { Event, EventStatus } from "@/app/events/page";
import { IconX, IconCheck, IconClock, IconCircleDot } from "@tabler/icons-react";

interface AdminPanelProps {
  events: Event[];
  onStatusChange: (eventId: string, newStatus: EventStatus) => void;
  onClose: () => void;
}

const getStatusOptions = (currentStatus: EventStatus): EventStatus[] => {
  switch (currentStatus) {
    case "coming":
      return ["ongoing"];
    case "ongoing":
      return ["completed"];
    case "completed":
      return ["coming", "ongoing"];
    default:
      return [];
  }
};

const getStatusIcon = (status: EventStatus) => {
  switch (status) {
    case "coming":
      return <IconClock size={16} />;
    case "ongoing":
      return <IconCircleDot size={16} />;
    case "completed":
      return <IconCheck size={16} />;
  }
};

const getStatusLabel = (status: EventStatus) => {
  switch (status) {
    case "coming":
      return "Coming Soon";
    case "ongoing":
      return "Ongoing";
    case "completed":
      return "Completed";
  }
};

const getStatusColor = (status: EventStatus) => {
  switch (status) {
    case "coming":
      return "bg-blue-500/20 border-blue-500/30 text-blue-300 hover:bg-blue-500/30";
    case "ongoing":
      return "bg-green-500/20 border-green-500/30 text-green-300 hover:bg-green-500/30";
    case "completed":
      return "bg-gray-500/20 border-gray-500/30 text-gray-300 hover:bg-gray-500/30";
  }
};

export default function AdminPanel({
  events,
  onStatusChange,
  onClose,
}: AdminPanelProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md z-[100] flex flex-col">
        <div
          className="h-full overflow-y-auto backdrop-blur-md"
          style={{
            background: "linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(30, 27, 75, 0.9) 100%)",
            borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: `
              -4px 0 24px rgba(0, 0, 0, 0.5),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 p-6 border-b border-white/10 bg-black/20 backdrop-blur-md z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
              >
                <IconX size={20} className="text-white" />
              </button>
            </div>
            <p className="text-sm text-white/60">
              Manage event statuses dynamically
            </p>
          </div>

          {/* Events List */}
          <div className="p-6 space-y-4">
            {events.map((event) => {
              const availableStatuses = getStatusOptions(event.status);
              
              return (
                <div
                  key={event.id}
                  className="p-4 rounded-lg border border-white/10 bg-white/5"
                >
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-white/40">#{event.number}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}
                      >
                        {getStatusLabel(event.status)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-white/60 line-clamp-2">
                      {event.description}
                    </p>
                  </div>

                  {/* Status Change Buttons */}
                  {availableStatuses.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-xs text-white/50 mb-2">Change Status:</p>
                      <div className="flex flex-wrap gap-2">
                        {availableStatuses.map((status) => (
                          <button
                            key={status}
                            onClick={() => onStatusChange(event.id, status)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 flex items-center gap-1.5 ${getStatusColor(status)}`}
                          >
                            {getStatusIcon(status)}
                            To {getStatusLabel(status)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {availableStatuses.length === 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-xs text-white/40">
                        No status changes available
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 p-6 border-t border-white/10 bg-black/20 backdrop-blur-md">
            <p className="text-xs text-white/40 text-center">
              Changes are saved in session. Refresh to reset.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

