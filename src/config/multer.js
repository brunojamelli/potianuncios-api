const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const { logger } = require("../logger");

const MAX_SIZE_TWO_MEGABYTES = 3 * 1024 * 1024;

const storageTypes = {
    local: multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './uploads');
        },
        filename: function (req, file, callback) {
            logger.debug("enviando foto pelo config separado!");
            callback(null, `${Date.now()} - ${file.originalname}`);
        },
    }),
    // s3: multerS3({
    //     s3: new aws.S3(),
    //     bucket: process.env.BUCKET_NAME,
    //     contentType: multerS3.AUTO_CONTENT_TYPE,
    //     acl: "public-read",
    //     key: (req, file, cb) => {
    //         crypto.randomBytes(16, (err, hash) => {
    //             if (err) cb(err);

    //             const fileName = `${hash.toString("hex")}-${file.originalname}`;

    //             cb(null, fileName);
    //         });
    //     },
    // }),
};

module.exports = {
    // dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage: storageTypes[process.env.STORAGE_TYPE],
    limits: {
        fileSize: MAX_SIZE_TWO_MEGABYTES,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif",
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type."));
        }
    },
};