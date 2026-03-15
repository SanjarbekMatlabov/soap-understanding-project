"use client";

import { UserFormPanel } from "@/src/components/users/UserFormPanel";
import { UserHero } from "@/src/components/users/UserHero";
import { UserRegistry } from "@/src/components/users/UserRegistry";
import { useUsersCrud } from "@/src/hooks/use-users-crud";

export function UserDashboard() {
  const {
    users,
    form,
    editingId,
    error,
    status,
    isLoading,
    isSubmitting,
    loadUsers,
    resetForm,
    updateField,
    submitForm,
    startEdit,
    deleteUser,
  } = useUsersCrud();

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(217,70,239,0.16),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#0f172a_45%,_#020617_100%)] text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-6 py-10 lg:px-10">
        <UserHero recordCount={users.length} isEditing={Boolean(editingId)} />

        <section className="grid gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">
          <UserFormPanel
            form={form}
            editingId={editingId}
            error={error}
            status={status}
            isLoading={isLoading}
            isSubmitting={isSubmitting}
            onFieldChange={updateField}
            onSubmit={submitForm}
            onRefresh={() => void loadUsers()}
            onReset={resetForm}
          />

          <UserRegistry
            users={users}
            isLoading={isLoading}
            isSubmitting={isSubmitting}
            onRefresh={() => void loadUsers()}
            onEdit={startEdit}
            onDelete={(user) => void deleteUser(user)}
          />
        </section>
      </div>
    </main>
  );
}
