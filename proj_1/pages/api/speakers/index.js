import path from 'path';
import fs from 'fs';

const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const delay = (ms) => (
    new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms)
    })
);


const handler = async (req, res) => {
    const jsonFile = path.resolve('./', 'db.json');
    try {
        const readFileData = await readFile(jsonFile);
        await delay(1000);
        const speakers = JSON.parse(readFileData).speakers;
        if (speakers) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(speakers, null, 2));
            console.log('GET /api/speakers status: 200');
        }
    } catch (e) {
        res.status(400).send('File not found on Server');
        console.log('/api/speakers error', e);
    }
}

export default handler;