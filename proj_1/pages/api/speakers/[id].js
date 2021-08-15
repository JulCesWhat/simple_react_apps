import path from 'path';
import fs from 'fs';

const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const delay = (ms) => (
    new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms)
    })
);

const handler = async (req, res) => {
    const method = req?.method;
    const id = req?.query?.id;
    const recordFromBody = req?.body;
    const jsonFile = path.resolve('./', 'db.json');

    switch (method) {
        case 'POST':
            postMethod();
            break;
        case 'PUT':
            putMethod();
            break;
        case 'DELETE':
            deleteMethod();
            break;
        default:
            res.status(501).send(`Method ${method} not implemented`);
            console.log(`Method ${method} not implemented`);
    }

    async function putMethod() {
        try {
            const readFileData = await readFile(jsonFile);
            await delay(1000);
            const speakers = JSON.parse(readFileData).speakers;
            if (speakers) {
                const newSpeakersArray = speakers.map((sp) => (sp.id === id ? recordFromBody : sp));
                writeFile(jsonFile, JSON.stringify({ speakers: newSpeakersArray }, null, 2));
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(recordFromBody), null, 2);
                console.log(`PUT /api/speakers/${id} status: 200`);
            } else {
                res.status(400).send('Error: Request failed with status code 404');
            }
        } catch (e) {
            res.status(500).send(`PUT /api/speakers/${id} status:500 unexpected error`);
            console.log(`PUT /api/speakers/${id} status:500 unexpected error`, e);
        }
    }

    async function postMethod() {
        try {
            const readFileData = await readFile(jsonFile);
            await delay(1000);
            const speakers = JSON.parse(readFileData).speakers;
            if (speakers) {
                const idNew = speakers.reduce((acc, curr) => {
                    const idCurr = parseInt(curr.id);
                    return idCurr > acc ? idCurr : acc;
                }, 0) + 1;

                const newSpeakRec = { ...recordFromBody, id: idNew.toString() };
                const newSpeakersArr = [...speakers, newSpeakRec];
                writeFile(jsonFile, JSON.stringify({ speakers: newSpeakersArr }, null, 2));
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(speakers, null, 2));
                console.log(`POST /api/speakers/${id} status: 200`);
            } else {
                res.status(400).send('Error: Request failed with status code 404');
            }
        } catch (e) {
            res.status(500).send(`POST /api/speakers/${id} status:500 unexpected error`);
            console.log(`POST /api/speakers/${id} status:500 unexpected error`, e);
        }
    }

    async function deleteMethod() {
        try {
            const readFileData = await readFile(jsonFile);
            await delay(1000);
            const speakers = JSON.parse(readFileData).speakers;
            if (speakers) {
                const newSpeakersArray = speakers.map((sp) => (sp.id !== id));
                writeFile(jsonFile, JSON.stringify({ speakers: newSpeakersArray }, null, 2));
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(speakers.find((rec) => (rec.id === id)), null, 2));
                console.log(`DELETE /api/speakers/${id} status: 200`);
            } else {
                res.status(400).send('Error: Request failed with status code 404');
            }
        } catch (e) {
            res.status(500).send(`DELETE /api/speakers/${id} status:500 unexpected error`);
            console.log(`DELETE /api/speakers/${id} status:500 unexpected error`, e);
        }
    }
}

export default handler;