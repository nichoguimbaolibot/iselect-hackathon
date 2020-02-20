import { DDB } from '../../services/dynamodb' 

const { DYNAMODB_TABLE } = process.env;

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
            TableName: DYNAMODB_TABLE,
            Item: DDB.marshall(data)
        }
        return params
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

    public async execute() {
        console.log('EVENTS', this.events)
        // // const params = this.putParams();

        // const put = await this.putItem(params);

        // return put;

        return {
            statusCode: 200,
            body: this.events
        }
    }

    
}