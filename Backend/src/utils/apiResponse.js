class apiResponse
{
    constructor(statusCode,data={},message="successfull response")
    {
        this.statusCode=statusCode
        this.data=data
        this.message=message
        this.success=true
    }
}

export {apiResponse}