// bunu diğer listemele işlemleri için kullancaksın 

import{ResponseModel} from "./responseModel";
 
export interface ListResponseModel<T> extends ResponseModel{
    // datada bir T arrayi verdik
    data:T[];

}