"use server";

import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { Prisma } from "@/generated/prisma/client";
import { requireAdmin } from "@/lib/admin/session";
import { slugify } from "@/lib/admin/slug";
import {
  isUploadedFile,
  removeUploadedImage,
  saveWineImage,
  UploadError,
} from "@/lib/admin/uploads";
import { wineFormSchema, type WineFormState } from "@/lib/admin/wine-schema";
import { prisma } from "@/lib/db";

export type LoginState = { error?: string; email?: string };

export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        email: String(formData.get("email") ?? ""),
        error:
          error.type === "CredentialsSignin"
            ? "Неверный email или пароль"
            : "Не удалось войти. Проверьте подключение к базе данных.",
      };
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/admin/login" });
}

function refreshPublicPages() {
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin");
}

async function saveWine(wineId: string | null, formData: FormData): Promise<WineFormState> {
  await requireAdmin();

  const values = Object.fromEntries(
    [...formData].filter((entry): entry is [string, string] => typeof entry[1] === "string"),
  );
  const fail = (state: Omit<WineFormState, "status" | "values" | "attempt">): WineFormState => ({
    status: "error",
    values,
    attempt: crypto.randomUUID(),
    ...state,
  });

  const parsed = wineFormSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const fieldErrors: WineFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof NonNullable<WineFormState["fieldErrors"]>;
      fieldErrors[field] ??= issue.message;
    }
    return fail({ message: "Проверьте выделенные поля", fieldErrors });
  }

  const { slug: rawSlug, ...wine } = parsed.data;
  const slug = rawSlug || slugify(wine.name, wine.vintage);
  const mainFile = formData.get("imageMainFile");
  const detailFile = formData.get("imageDetailFile");
  const previous = wineId ? await prisma.wine.findUnique({ where: { id: wineId } }) : null;
  if (wineId && !previous) return fail({ message: "Вино не найдено — возможно, его уже удалили" });

  async function upload(file: FormDataEntryValue | null, current: string | null, suffix: string, field: "imageMainFile" | "imageDetailFile") {
    if (!isUploadedFile(file)) return { path: current };
    try {
      return { path: await saveWineImage(file, `${slug}${suffix}`) };
    } catch (error) {
      if (error instanceof UploadError) return { error: { [field]: error.message } };
      throw error;
    }
  }

  const main = await upload(mainFile, wine.imageMain, "", "imageMainFile");
  const detail = await upload(detailFile, wine.imageDetail, "-detail", "imageDetailFile");
  if (main.error || detail.error) {
    const fieldErrors = { ...main.error, ...detail.error };
    return fail({ message: Object.values(fieldErrors)[0], fieldErrors });
  }
  const imageMain = main.path ?? null;
  const imageDetail = detail.path ?? null;

  if (!imageMain) {
    return fail({
      message: "Добавьте основное фото",
      fieldErrors: { imageMainFile: "Загрузите основное фото или укажите путь к нему" },
    });
  }

  const data = { ...wine, slug, imageMain, imageDetail };

  try {
    if (wineId) await prisma.wine.update({ where: { id: wineId }, data });
    else await prisma.wine.create({ data });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return fail({
        message: "Вино с таким адресом (slug) уже есть",
        fieldErrors: { slug: "Этот slug уже занят — укажите другой" },
      });
    }
    throw error;
  }

  if (previous && previous.imageMain !== imageMain) await removeUploadedImage(previous.imageMain);
  if (previous && previous.imageDetail !== imageDetail) await removeUploadedImage(previous.imageDetail);

  refreshPublicPages();
  redirect(`/admin?saved=${encodeURIComponent(wine.name)}`);
}

export async function createWine(_state: WineFormState, formData: FormData) {
  return saveWine(null, formData);
}

export async function updateWine(wineId: string, _state: WineFormState, formData: FormData) {
  return saveWine(wineId, formData);
}

export async function deleteWine(wineId: string) {
  await requireAdmin();
  const wine = await prisma.wine.delete({ where: { id: wineId } });
  await removeUploadedImage(wine.imageMain);
  await removeUploadedImage(wine.imageDetail);
  refreshPublicPages();
}

export async function setWinePublished(wineId: string, published: boolean) {
  await requireAdmin();
  await prisma.wine.update({ where: { id: wineId }, data: { published } });
  refreshPublicPages();
}
