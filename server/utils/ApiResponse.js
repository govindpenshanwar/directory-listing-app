class ApiResponse {
    constructor(statusCode, message, payload) {
        this.statusCode = statusCode
        this.success = statusCode < 400
        this.message = message
        this.payload = payload
    }
}
export default ApiResponse;