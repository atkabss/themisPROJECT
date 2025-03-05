const fs = require('fs').promises;
const path = require('path');
const url = require('url');

const req_Combat = async (req, res) => {
    console.log(`Handling request: ${req.url}`);

    const pathname = decodeURIComponent(url.parse(req.url).pathname);

    if (pathname === "/req_stage_Combat") {
        // 返回 Combat.html 页面
        const filepath = path.join(__dirname, 'Combat.html');

        try {
            const htmlContent = await fs.readFile(filepath, 'utf-8');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(htmlContent);
        } catch (err) {
            console.error("Error reading Combat.html file:", err);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end("404 Not Found");
        }
    } else if (pathname.startsWith('/public/')) {
        // 处理图片和静态资源请求
        const filepath = path.join(__dirname, pathname);

        try {
            const content = await fs.readFile(filepath);
            const ext = path.extname(filepath);
            const mimeType = {
                ".png": "image/png",
                ".jpg": "image/jpeg",
                ".gif": "image/gif",
                ".css": "text/css",
                ".js": "application/javascript",
            };

            res.writeHead(200, { "Content-Type": mimeType[ext] || "application/octet-stream" });
            res.end(content);
        } catch (err) {
            console.error("Error serving static file:", err);
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 Not Found");
        }
    } else {
        // 未知路径返回 404
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
};

module.exports = req_Combat;
