import path from 'path';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import dataBuilder from './data-builder.js';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const app = express();

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(bodyParser.json());

app.use("/ar", (req, res, next) => {
	dataBuilder.getMonthlyAvg();
	next();
}, express.static(path.join(__dirname, 'public')));

app.use(cors());

const PORT = process.env.PORT || 9001;

app.listen(PORT, () => console.log(`We're live in ${process.env.NODE_ENV} mode on port ${PORT}`));
