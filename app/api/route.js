export async function GET(req) {
  const ua = req.headers.get("user-agent") || "";
  const origin = new URL(req.url).origin;

  // 🎮 ROBLOX → RETURN LUA
  if (ua.toLowerCase().includes("roblox")) {
    const lua = `
-- SoftProjects Loader
loadstring(game:HttpGet("https://pastefy.app/tIdl8lGq/raw?part=9ae3e89e74cda6a5.lua", true))()
`;
    return new Response(lua, {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  // 🌐 BROWSER → RETURN WEBSITE
  const TEXT = `loadstring(game:HttpGet("${origin}/api"))()`;

  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>SoftProjects API</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body{margin:0;min-height:100vh;display:grid;place-items:center;background:radial-gradient(circle at top,#0b1020,#060914);font-family:system-ui;color:#e5e7eb;}
.glow{padding:2px;border-radius:16px;background:linear-gradient(120deg,#60a5fa,#a78bfa,#22d3ee,#60a5fa);background-size:300% 300%;animation:glow 6s ease infinite;box-shadow:0 0 40px rgba(96,165,250,.35);}
.box{background:#0f172a;border-radius:14px;padding:18px 20px;display:flex;gap:14px;align-items:center;border:1px solid #1e293b;}
code{font-family:ui-monospace,Consolas,monospace;font-size:14px;color:#93c5fd;white-space:nowrap;max-width:70vw;overflow-x:auto;}
button{background:#020617;border:1px solid #334155;color:#e5e7eb;padding:6px 12px;border-radius:8px;cursor:pointer;}
button:hover{background:#0f172a;}
@keyframes glow{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
</style>
</head>
<body>
<div class="glow">
  <div class="box">
    <code id="t">${TEXT}</code>
    <button onclick="navigator.clipboard.writeText(document.getElementById('t').innerText)">Copy</button>
  </div>
</div>
</body>
</html>`;

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
