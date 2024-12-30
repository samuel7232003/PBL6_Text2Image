import { apiInstance } from "./api";

export async function testApi(textPrompt:string, style:string):Promise<any> {
    const data = {
        prompt: textPrompt,
        style: style
    }
    try{
        const respone = await apiInstance.post("/genImg", data);
        return respone;
    } catch (error) {
        throw error;
    }
}