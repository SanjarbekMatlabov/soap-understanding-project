import type { FormEvent } from "react";

import type { FormState } from "@/src/types/user";

type UserFormPanelProps = {
  form: FormState;
  editingId: string | null;
  error: string | null;
  status: string;
  isLoading: boolean;
  isSubmitting: boolean;
  onFieldChange: <K extends keyof FormState>(field: K, value: FormState[K]) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onRefresh: () => void;
  onReset: () => void;
};

export function UserFormPanel({
  form,
  editingId,
  error,
  status,
  isLoading,
  isSubmitting,
  onFieldChange,
  onSubmit,
  onRefresh,
  onReset,
}: UserFormPanelProps) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Mutation panel</p>
          <h2 className="mt-2 text-2xl font-bold text-white">
            {editingId ? "Edit User" : "Create User"}
          </h2>
        </div>
        {editingId && (
          <button
            onClick={onReset}
            className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-200 transition hover:border-cyan-400/50 hover:text-cyan-200"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-200">Name</span>
          <input
            value={form.name}
            onChange={(event) => onFieldChange("name", event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:bg-cyan-400/5"
            placeholder="Amina Khan"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-200">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => onFieldChange("email", event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:bg-cyan-400/5"
            placeholder="amina@soaplab.dev"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-200">
            Password {editingId && <span className="text-slate-500">(optional on update)</span>}
          </span>
          <input
            type="password"
            value={form.password}
            onChange={(event) => onFieldChange("password", event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:bg-cyan-400/5"
            placeholder="••••••••"
          />
        </label>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex flex-1 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-bold uppercase tracking-[0.24em] text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Processing..." : editingId ? "Update User" : "Create User"}
          </button>
          <button
            type="button"
            onClick={onRefresh}
            disabled={isLoading}
            className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-slate-200 transition hover:border-cyan-400/50 hover:bg-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Refresh
          </button>
        </div>
      </form>

      <div className="mt-6 rounded-3xl border border-cyan-400/20 bg-cyan-400/8 p-4 text-sm text-cyan-100">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Live status</p>
        <p className="mt-2 leading-6">{status}</p>
        {error && <p className="mt-3 text-rose-300">{error}</p>}
      </div>
    </div>
  );
}
