import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./schema.d";
import Cookies from "js-cookie";

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      request.headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return request;
  },

  async onResponse({ response, request }) {
    if (response.status === 401) {
      const refreshToken = Cookies.get("refreshToken");
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

        Cookies.set("accessToken", newAccess, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });
        Cookies.set("refreshToken", newRefresh, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });

        const newRequest = new Request(request, {
          headers: new Headers(request.headers),
        });
        newRequest.headers.set("Authorization", `Bearer ${newAccess}`);
        return fetch(newRequest);
      } else {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
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
