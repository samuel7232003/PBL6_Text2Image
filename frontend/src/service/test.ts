import { apiInstance } from "./api";

export async function testApi(image:string):Promise<any> {
    const data = {
        text: image
    }
    try{
        const respone = await apiInstance.post("/", data);
        return respone;
    } catch (error) {
        throw error;
    }
}