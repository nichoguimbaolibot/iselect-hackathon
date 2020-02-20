import { ProcessHandler } from './process-handler'

export const handleFacebookAPI = async (events) => {
    const process = new ProcessHandler(events)
    
    const data = await process.execute();

    return data
}
