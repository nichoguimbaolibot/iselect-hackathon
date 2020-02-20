import { CommonUtils } from '../../common/utils/common-utils'
import { DDB } from '../../services/dynamodb' 
import AWSUtil from 'aws-sdk/lib/util';

const { TABLE_NAME } = process.env;

export class ProcessHandler {
    constructor(private _events) {}

    get events () {

        return this._events
    }

    private ddb () {
        return new DDB();
    }

    private putParams (data) {
        const params = {
            TableName: TABLE_NAME,
            Item: DDB.marshall(data)
        }
        return params
    }

    private generateUUID(data) {
        return {
            data,
            prospect_id: AWSUtil.uuid.v4()
        }
    }

    private async putItem(params) {
        try {
    
            const data = await this.ddb().putItem(params)
    
            return {
                statusCode: 200,
                data,
            }
        } catch (error) {
    
            return {
                statusCode: 500,
                data: error
            }
        }
    }

    private transform (data) {
        let object: any = {}
        Object.values(data).forEach((data1: any) => {
            const keys = Object.keys(data1).map(item => item)
            keys.forEach(item2 => {
                object = {
                    ...object,
                    [`${item2}`]: data1[item2]
                }
            })
        })

        return object
    }

    public async execute() {
        if (!CommonUtils.isJsonParseable(this.events.body)) {
            return {
                statusCode: 500,
                body: 'Invalid JSON data.'
            }
        }

        const parseBody = JSON.parse(this.events.body)
        const transformedData = this.transform(parseBody);
        const validData = this.generateUUID(transformedData)
        const params = this.putParams(validData);
        const data = await this.putItem(params);

        return data;
    }

    
}