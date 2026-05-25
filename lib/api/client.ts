import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./schema.d";
import "dotenv/config";

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      request.headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return request;
  },

  async onResponse({ response, request }) {
    if (response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return response;

      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-tokens`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        },
      );

      if (refreshRes.ok) {
        const { accessToken: newAccess, refreshToken: newRefresh } =
          await refreshRes.json();

        localStorage.setItem("accessToken", newAccess);
        localStorage.setItem("refreshToken", newRefresh);

        const newRequest = new Request(request, {
          headers: new Headers(request.headers),
        });
        newRequest.headers.set("Authorization", `Bearer ${newAccess}`);
        return fetch(newRequest);
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    return response;
  },
};

export const apiClient = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
});

apiClient.use(authMiddleware);
