import httpStatus from "http-status";

export class AppErrors {
    constructor(type, resource = "resource") {
        this.status;
        this.message;

        //Instantiate the custom error with the
        //object factory -> set the status and message
        this.createError(type, resource);
    }

    createError(type, resource) {
        switch (type) {
            case "notFound":
                this.status = httpStatus.NOT_FOUND;
                this.message = `${resource} not found`;
                break;
            case "conflict":
                this.status = httpStatus.CONFLICT;
                this.message = `${resource} already exists`;
                break;
            case "unprocessableEntity":
                this.status = httpStatus.UNPROCESSABLE_ENTITY;
                this.message = resource; //Custom Joi message
                break;
            case "badRequest":
                this.status = httpStatus.BAD_REQUEST;
                this.message = resource;
            case "internalServer":
                this.status = httpStatus.INTERNAL_SERVER_ERROR;
                this.message = resource;
            default:
                break;
        }
    }

    customMessage(message) {
        this.message = message;
    }
}

export default {
    notFound: (resource) => new AppErrors("notFound", resource),
    conflict: (resource) => new AppErrors("conflict", resource),
    unprocessableEntity: (joiMessage) => new AppErrors("unprocessableEntity", joiMessage),
    badRequest: (resource) => new AppErrors("badRequest", resource),
    internalServer: (resource) => new AppErrors("internalServer", resource),
};