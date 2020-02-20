export class CommonUtils {
    public static isJsonParseable (data) {
        try {
            // @ts-ignore
            const item = JSON.parse(data)

            return true
        } catch (error) {
            return false
        }
    }
}