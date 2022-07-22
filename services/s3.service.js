const S3 = require('aws-sdk/clients/s3');
const uuid = require('uuid').v4;

const {config} = require("../configs");

const BuckedConfig = new S3({
    region: config.AWS_S3_REGION,
    secretAccessKey: config.AWS_S3_SECRET_KEY,
    accessKeyId: config.AWS_S3_ACCESS_KEY,
})

const uploadFile = async (file, itemType, itemId) => {

    const Key = _buildFilePath(file.name, itemType, itemId);

    return BuckedConfig.upload({
        Bucket: config.AWS_S3_BUCKET, //куди грузимо
        Key, // просто ім"я файлу
        ContentType: file.mimetype, // з маленької
        ACL: 'public-read',
        Body: file.data,
    })
        .promise(); // головне поставити, бо не буде працювати
};

const updateFile = async (file, fileURL) => {

    const path = fileURL.split(config.AWS_S3_BUCKET_URL).pop();

    return BuckedConfig.putObject({
        Bucket: config.AWS_S3_BUCKET,
        Key: path, //можна назвати теж Key
        ContentType: file.mimetype,
        ACL: 'public-read',
        Body: file.data,
    })
        .promise();
};

const deleteFile = async (fileURL) => {
    const Key = fileURL.split(config.AWS_S3_BUCKET_URL).pop();

    return BuckedConfig.deleteObject({
        Bucket: config.AWS_S3_BUCKET,
        Key,
    })
        .promise()
};

module.exports = {
    deleteFile,
    updateFile,
    uploadFile,
}; // потым йдемо в контроллер (юзер-контроллер)

function _buildFilePath(fileName, itemType, itemId) {
    const ext = fileName.split('.').pop(); //ріжемо по крапці, вертаємо останній jpg (без .)

    // const ext1 = path.extname(fileName); // довше відпрацьовує, верне .jpg

    // return  `${itemType}/${itemId}/${Date.now()}.${ext}`
    return `${itemType}/${itemId}/${uuid()}.${ext}`

    // name можна написати Date.now(), а можна використовувати бібліотеку uuid v4
}
