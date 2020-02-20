import AWS from 'aws-sdk'

export class S3 {
    private _service = new AWS.S3();

    async uploadToS3(bucket: string, key: string, body: any) {
        const params = {
            Bucket: bucket,
            Key: key,
            ContentType: 'binary',
            Body: Buffer.from(body, 'binary'),
        }
        try {
            const data = await this._service.putObject(params).promise();
            console.log('UPLOAD TO S3 SUCCESS', data)
            return data;
        } catch (error) {
            const stringify = JSON.stringify(error)
            console.log('UPLOAD TO S3 ERROR', stringify)

            throw new Error(stringify)
        }
    }
}
