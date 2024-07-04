

class apiError
{
    constructor(statusCode=400,message="something went wrong",error=[],stack="")
    {
        this.statusCode=statusCode
        this.message=message
        this.error=error
        this.success=false
        this.data=null
        if(stack)
            {
                this.stack=stack
            }
            else
            {
                Error.captureStackTrace(this, this.constructor)
            }
    }
}
export {apiError}