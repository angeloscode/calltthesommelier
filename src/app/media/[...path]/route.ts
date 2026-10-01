import { readFile } from "node:fs/promises";
import path from "node:path";
import { uploadRoot } from "@/lib/admin/uploads";

const contentTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
};

export async function GET(_request: Request, { params }: RouteContext<"/media/[...path]">) {
  const segments = (await params).path;
  const filePath = path.resolve(uploadRoot, ...segments);
  const contentType = contentTypes[path.extname(filePath).toLowerCase()];

  if (!filePath.startsWith(uploadRoot + path.sep) || !contentType) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const file = await readFile(filePath);
    return new Response(file, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
