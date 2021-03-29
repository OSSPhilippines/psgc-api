import express from "express";
import morgan from "morgan"; /* logger */
import helmet from "helmet"; /* protection */
import cors from "cors";
import limiter from "./utils/rateLimit"; /* rate limit */
import { checkApiKey, errorHandler, notFound } from "./middlewares";
import allowedIps from "./utils/allowedIps";
import path from "path";
import serveStatic from "serve-static";

/* api */
import api from "./api/_index";
import v1 from "./v1/_index";
import apiKeyController from "./api/keys";

require("dotenv").config();

/* mongoose */
import mongoose from "mongoose";
try {
    mongoose.connect(process.env.MONGODB_URL!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
} catch (error) {
    console.warn("Failed to connect to mongo");
    console.warn(error);
}

const app = express();

app.use(morgan("common"));
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
                styleSrc: ["'self'", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com"],
                fontSrc: ["'self'", "fonts.gstatic.com", "https://cdn.jsdelivr.net"]
            }
        },
    })
);
app.use(cors());
app.use(express.json());

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set("trust proxy", 1);

/* routes */
app.use(serveStatic(path.join(__dirname, "../public")));

/* generate api key */
app.use("/key", allowedIps, apiKeyController.getApiKey);

/* api with apikey ckck */
app.use("/api", limiter, api);
app.use("/v1", checkApiKey, v1);

/* errorHandler middlerware */
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5050;
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
