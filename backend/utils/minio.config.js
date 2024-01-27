import { Client } from "minio";
const bucketName = "inventory"
const secretKEy = '0SrFBOLulHLbPYVV6pcHpx1Zxh4LvG4GdIdt6tVd'
const accesskey = 'T7Lkgx2o2VhJ4ImC4Fx3'
const expiration = 6 * 24 * 60 * 60; // Expiration time in seconds (1 day in this example)


const minioClient = new Client({
    endPoint: '127.0.0.1',
    port: 9000, // Your MinIO server port
    useSSL: false, // Set to true if you're using HTTPS
    accessKey: accesskey,
    secretKey: secretKEy,
});


export const uploadFile = async (req, res) => {
  //const bucket = req.body.bucket; // Adjust this based on how you send the bucketName and expiration
  

  // Assuming you are using multer for handling file uploads, and the file is in req.file
  const file = req.file;

  try {
    // console.log("HEHEHEH NEKO");
    // console.log("Bucket name:",bucket);
    await minioClient.fPutObject(bucketName, file.originalname, `public/${file.originalname}`, (err, etag) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'File upload failed.' });
      }
      console.log('File uploaded successfully.');
    });
    const url = minioClient.presignedGetObject(bucketName, file.originalname, expiration);
    //console.log(`Pre-signed URL: ${url}`);
    return res.json({status:200,msg:'Image Upload Successful',url:url}); 

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
