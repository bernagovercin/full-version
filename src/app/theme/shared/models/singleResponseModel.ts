//bunu login için kullanacaksın 


import { ResponseModel } from "./responseModel";


export interface SingleReponseModel <T> extends ResponseModel{
data:T
}