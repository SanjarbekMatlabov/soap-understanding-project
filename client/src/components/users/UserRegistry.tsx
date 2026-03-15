import type { User } from "@/src/types/user";

type UserRegistryProps = {
  users: User[];
  isLoading: boolean;
  isSubmitting: boolean;
  onRefresh: () => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export function UserRegistry({
  users,
  isLoading,
  isSubmitting,
  onRefresh,
  onEdit,
  onDelete,
}: UserRegistryProps) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-6 backdrop-blur-xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-300">Read / manage</p>
          <h2 className="mt-2 text-2xl font-bold text-white">User Registry</h2>
        </div>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="rounded-full border border-fuchsia-400/25 bg-fuchsia-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-200 transition hover:border-fuchsia-300/50 hover:bg-fuchsia-400/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Syncing..." : "Sync Users"}
        </button>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70">
        <div className="grid grid-cols-[1.3fr_1.5fr_180px] gap-4 border-b border-white/10 px-5 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
          <span>Name</span>
          <span>Email</span>
          <span>Actions</span>
        </div>

        <div className="max-h-[560px] overflow-y-auto">
          {isLoading ? (
            <div className="space-y-3 p-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 animate-pulse rounded-2xl border border-white/5 bg-white/5"
                />
              ))}
            </div>
          ) : users.length === 0 ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">
              <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-200">
                Empty registry
              </div>
              <h3 className="mt-5 text-2xl font-bold text-white">No users available</h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
                Create the first record from the panel on the left. The page will sync automatically through your SOAP endpoint.
              </p>
            </div>
          ) : (
            users.map((user, index) => (
              <div
                key={user.id}
                className="grid grid-cols-[1.3fr_1.5fr_180px] gap-4 border-b border-white/6 px-5 py-4 transition hover:bg-white/5"
              >
                <div>
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="mt-1 text-xs text-slate-500">UID · {user.id.slice(0, 10)}...</p>
                </div>
                <div>
                  <p className="text-sm text-slate-200">{user.email}</p>
                  <p className="mt-1 text-xs text-slate-500">Row #{String(index + 1).padStart(2, "0")}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200 transition hover:bg-cyan-400/20"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    disabled={isSubmitting}
                    className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-200 transition hover:bg-rose-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
