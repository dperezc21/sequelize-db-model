
export class CreateModelError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Create Model Error"
    }
}