export interface HttpResponseModel {
    responseResult: boolean;
    data: any;
    message: string;
}

export interface PostRequestByDynamicFiterModel {
    columnName: string;
    filter: string;
    searchText: string;
    searchText2: string;
}