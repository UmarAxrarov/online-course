export class requset_errors extends Error {
    constructor(message,status,errorType) {
        super(message,status);
        this.status = status;
        this.isException = true;
        this.errorType = errorType || "";
    }
}