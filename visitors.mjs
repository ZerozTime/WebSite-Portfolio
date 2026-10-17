
import { getStore } from "@netlify/blobs";

const store = getStore("portfolio-visitor-counter");

export default async (request) => {
  if (request.method !== "GET" && request.method !== "POST") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    if (request.method === "POST") {
      const current = await store.get("total", {
        type: "text"
      });

      const total = Number(current ?? 0) + 1;

      await store.set("total", String(total));

      return Response.json({ total });
    }

    const current = await store.get("total", {
      type: "text"
    });

    return Response.json({
      total: Number(current ?? 0)
    });
  } catch (error) {
    console.error("Visitor counter error:", error);

    return Response.json(
      { error: "Unable to load visitor count" },
      { status: 500 }
    );
  }
};
