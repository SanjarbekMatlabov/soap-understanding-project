"use client";

import { useEffect, useState, type FormEvent } from "react";

import { userSoapApi } from "@/src/lib/soap/users";
import { initialFormState, type FormState, type User } from "@/src/types/user";

export const useUsersCrud = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Connecting to SOAP service...");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadUsers = async (successStatus?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const parsedUsers = await userSoapApi.list();
      setUsers(parsedUsers);
      setStatus(
        successStatus ??
          (parsedUsers.length > 0
            ? `${parsedUsers.length} user records synced from SOAP backend.`
            : "SOAP backend is online. No users found yet.")
      );
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
      setStatus("SOAP sync failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setForm(initialFormState);
    setEditingId(null);
  };

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name || !form.email || (!editingId && !form.password)) {
      setError("Name, email, and password are required for new users.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      if (editingId) {
        await userSoapApi.update({
          id: editingId,
          name: form.name,
          email: form.email,
          password: form.password || undefined,
        });

        resetForm();
        await loadUsers(`User ${form.name} updated successfully.`);
        return;
      }

      await userSoapApi.create(form);
      resetForm();
      await loadUsers(`User ${form.name} created successfully.`);
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEdit = (user: User) => {
    setEditingId(user.id);
    setForm({
      name: user.name,
      email: user.email,
      password: "",
    });
    setStatus(`Editing ${user.name}. Save to send an update request.`);
    setError(null);
  };

  const deleteUser = async (user: User) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await userSoapApi.remove(user.id);
      if (editingId === user.id) {
        resetForm();
      }
      await loadUsers(`User ${user.name} deleted successfully.`);
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  return {
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
  };
};
