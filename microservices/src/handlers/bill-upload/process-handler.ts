import { S3 } from '../../services/s3'

const { BUCKET_S3 } = process.env

export class ProcessHandler {
    constructor(private _events) {}

    get events () {

        return this._events
    }

    private s3 () {
        return new S3();
    }

    public async execute() {
        try {
            const data = await this.s3().uploadToS3(BUCKET_S3 || '', this.events.body.filename, this.events.body.body);

            return {
                statusCode: 200,
                body: data
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: error
            }
        }
        
    }
}