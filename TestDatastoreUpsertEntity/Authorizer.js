const google = require("googleapis").google;

const key = JSON.parse(process.env.GCLOUD_SERVICE_TOKEN);
const jwtClient = new google.auth.JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: ["https://www.googleapis.com/auth/cloud-platform"]
});
google.options({auth: jwtClient, project: process.env.GCLOUD_PROJECT_ID});