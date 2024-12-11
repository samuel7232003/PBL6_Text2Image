import { apiInstance } from "./api";

export async function testApi(image:string):Promise<any> {
    const data = {
        prompt: image
    }
    try{
        const respone = await apiInstance.post("/genImg", data);
        return respone;
    } catch (error) {
        throw error;
    }
}