import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

/** Каталог для загруженных файлов. Лежит вне public/: Next в продакшене не отдаёт файлы, добавленные туда после сборки. */
export const uploadRoot = path.resolve(/*turbopackIgnore: true*/ process.env.UPLOAD_DIR ?? "storage/uploads");

export const MEDIA_PREFIX = "/media/";

const allowedTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

export class UploadError extends Error {}

export function isUploadedFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File && value.size > 0;
}

/** Сохраняет картинку и возвращает публичный путь вида /media/wines/<file>. */
export async function saveWineImage(file: File, slug: string) {
  const extension = allowedTypes[file.type];
  if (!extension) throw new UploadError("Поддерживаются JPG, PNG, WebP и AVIF");
  if (file.size > MAX_UPLOAD_BYTES) throw new UploadError("Файл больше 8 МБ");

  const directory = path.join(uploadRoot, "wines");
  await mkdir(directory, { recursive: true });

  const fileName = `${slug}-${randomUUID().slice(0, 8)}.${extension}`;
  await writeFile(path.join(directory, fileName), Buffer.from(await file.arrayBuffer()));

  return `${MEDIA_PREFIX}wines/${fileName}`;
}

/** Удаляет ранее загруженный файл (картинки из public/ не трогает). */
export async function removeUploadedImage(publicPath: string | null | undefined) {
  if (!publicPath?.startsWith(MEDIA_PREFIX)) return;
  const filePath = path.join(uploadRoot, publicPath.slice(MEDIA_PREFIX.length));
  if (!filePath.startsWith(uploadRoot)) return;
  await unlink(filePath).catch(() => undefined);
}
