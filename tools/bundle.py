#!/usr/bin/env python3
"""Gabungkan ES Modules menjadi script biasa agar halaman bisa dibuka tanpa server (file://)."""
import os, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
ENTRIES = {
    "js/main.js": "js/main.bundle.js",
    "js/memories.js": "js/memories.bundle.js",
    "js/photobooth.js": "js/photobooth.bundle.js",
    "js/final.js": "js/final.bundle.js",
    "games/bunny-rescue/js/main.js": "games/bunny-rescue/js/game.bundle.js",
}
IMPORT = re.compile(r"^import\s+(.+?)\s+from\s+'(.+?)';$", re.M)


def bundle(entry, output):
    done, chunks = {}, []

    def add(path):
        if path in done:
            return done[path]
        source = path.read_text()
        header = []
        for what, rel in IMPORT.findall(source):
            dep = add((path.parent / rel).resolve())
            if what.startswith("* as "):
                header.append(f"const {what[5:]} = {dep};")
            elif what.startswith("{"):
                header.append(f"const {what} = {dep};")
            else:
                header.append(f"const {what} = {dep}.default;")
        body = IMPORT.sub("", source)
        names = re.findall(r"^export (?:async )?(?:const|let|function|class) (\w+)", body, re.M)
        body = re.sub(r"^export default ", "const __default = ", body, flags=re.M)
        if "const __default = " in body:
            names.append("default: __default")
        body = re.sub(r"^export ", "", body, flags=re.M)
        url = os.path.relpath(path, (ROOT / output).parent).replace(os.sep, "/")
        body = body.replace("import.meta.url", f"new URL('{url}', SELF).href")
        name = f"__m{len(done)}_{len(chunks)}"
        name = "__" + re.sub(r"\W", "_", str(path.relative_to(ROOT)))
        done[path] = name
        chunks.append(f"const {name} = await (async () => {{\n" + "\n".join(header) + f"\n{body}\nreturn {{ {', '.join(names)} }};\n}})();\n")
        return name

    add(ROOT / entry)
    (ROOT / output).write_text("// Dibuat oleh tools/bundle.py. Jangan diedit langsung.\n(async () => {\nconst SELF = document.currentScript.src;\n" + "".join(chunks) + "})();\n")


for source, target in ENTRIES.items():
    bundle(source, target)

for page in ROOT.rglob("*.html"):
    html = page.read_text()
    html = re.sub(r'<script type="module" src="([^"]*?)(?<!bundle)\.js"></script>',
                  lambda m: f'<script defer src="{m[1]}.bundle.js"></script>', html)
    html = html.replace("games/bunny-rescue/js/main.bundle.js", "games/bunny-rescue/js/game.bundle.js")
    if page.parent.name == "bunny-rescue":
        html = html.replace('src="js/main.bundle.js"', 'src="js/game.bundle.js"')
    page.write_text(html)
print("bundle selesai")
