import http from 'http';
import { readFile } from 'fs/promises';
import { join } from 'path';

const server = http.createServer();

server.on('request', async (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    const pdf = await readFile(join(__dirname, 'test.pdf'));
    res.write(JSON.stringify({
        name: 'test.pdf',
        bin: pdf.toString('base64')
    }));
    res.end();
});

server.listen(50991);
