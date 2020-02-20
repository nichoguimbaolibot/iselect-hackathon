import DynamoDB from 'aws-sdk/clients/DynamoDB'

export class DDB {
    private _service = new DynamoDB.DocumentClient()

    public static marshall (data) {
        return DynamoDB.Converter.marshall(data)
    }

    public static unmarshall (data) {
        return DynamoDB.Converter.unmarshall(data)
    }

    public async putItem (params) {
        try {
            const data = await this._service.put(params).promise();

            return data
        } catch (error) {
            
            throw new Error(error)
        }
    }
}
