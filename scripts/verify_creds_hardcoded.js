const cloudinary = require('cloudinary').v2;

const cloudName = 'drh4sirjt';
const apiKey = '869838243928481';
const apiSecret = 'mu7e0LIu6rbRyqrV_1zEmh5P9pI';

console.log(`Testing with:
Cloud: ${cloudName}
Key: ${apiKey}
Secret: ${apiSecret}
`);

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
});

cloudinary.api.ping((error, result) => {
    if (error) {
        console.error("Ping Failed:", error);
    } else {
        console.log("Ping Success:", result);
    }
});
