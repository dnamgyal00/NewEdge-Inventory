import { Client } from "minio";

const minioClient = new Client({
    endPoint: '192.168.131.122',   //192.168.131.225
    port: 9000, 
    useSSL: false, 
    accessKey: 'T7Lkgx2o2VhJ4ImC4Fx3',
    secretKey: '0SrFBOLulHLbPYVV6pcHpx1Zxh4LvG4GdIdt6tVd',
});

export default minioClient;