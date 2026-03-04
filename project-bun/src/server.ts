// Bun sudah menyediakan global Bun, tidak perlu import

const server = Bun.serve({
  port: 3000,

  fetch(request: Request) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    console.log(`[${new Date().toLocaleTimeString()}] ${method} ${path}`);

    // GET /
    if (path === "/" && method === "GET") {
      return new Response(
        JSON.stringify({ message: "Selamat datang dihalaman Home Semuanya!!!" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // GET /about
    else if (path === "/about" && method === "GET") {
      return new Response(JSON.stringify({ message: "Halaman About" }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    // GET /users/... (mirip url.startsWith)
    else if (path.startsWith("/users/") && method === "GET") {
      return new Response(
        JSON.stringify([
          { id: 1, name: "Adhelia" },
          { id: 2, name: "Issabel" },
        ]),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // POST /api/users
    else if (path === "/api/users" && method === "POST") {
      return new Response(
        JSON.stringify({ message: "User berhasil dibuat (contoh)" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 201,
        }
      );
    }

    // 404
    else {
      return new Response(
        JSON.stringify({ message: "Router tidak ditemukan" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 404,
        }
      );
    }
  },
});

console.log(`🚀 Server Bun berjalan di http://localhost:${server.port}`);