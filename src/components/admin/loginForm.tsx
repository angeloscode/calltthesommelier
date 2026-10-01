"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/admin/actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={formAction} className="grid gap-4">
      {state.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          key={state.email ?? ""}
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          defaultValue={state.email}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Пароль</Label>
        <Input id="password" name="password" type="password" autoComplete="current-password" required />
      </div>
      <Button type="submit" size="lg" disabled={isPending}>
        {isPending ? "Входим…" : "Войти"}
      </Button>
    </form>
  );
}
