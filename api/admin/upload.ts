import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { requireAdmin } from "../_lib/auth";

// Server side of the client-direct-upload flow for @vercel/blob. The browser
// calls upload() from client/src/lib/adminApi.ts, which POSTs here first to
// get a signed token (checked against the admin session), then uploads the
// file bytes straight to Blob storage — never through this function, so the
// ~4.5MB serverless request-body limit doesn't apply to the image itself.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body as HandleUploadBody;
    const jsonResponse = await handleUpload({
      body,
      request: req as unknown as Request,
      onBeforeGenerateToken: async () => {
        const authenticated = await requireAdmin(req);
        if (!authenticated) {
          throw new Error("Not authenticated");
        }
        return {
          allowedContentTypes: ["image/png", "image/jpeg", "image/webp", "image/avif"],
          addRandomSuffix: true,
          maximumSizeInBytes: 8 * 1024 * 1024,
        };
      },
      onUploadCompleted: async () => {
        // Not relied upon — see plan notes; this webhook won't fire on
        // localhost during `vercel dev`, and the admin form gets the blob
        // URL directly from the client-side upload() call instead.
      },
    });

    return res.status(200).json(jsonResponse);
  } catch (err) {
    console.error("[api/admin/upload] failed", err);
    const message = err instanceof Error ? err.message : "Upload failed";
    return res.status(400).json({ error: message });
  }
}
