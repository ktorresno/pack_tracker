export const SIXTY = 60;
export const ONE_HUNDRED = 100;
export const ONE_THOUSAND = 1000;
export const WILDCARD_ASTERISK = '*';
export const API_PREFIX_DEFAULT = '/api/v1';

export enum HttpCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
};

export enum ErrMessagesDefaults {
    ERR_STR = "error",
    INTERNAL_SERVER_ERROR = "Internal Server Error"
};

export enum NodeEnv {
    ENV_DEV = "development",
    ENV_TEST = "testing",
    ENV_PROD = "production"
};

export enum LogLevels {
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    HTTP = 'http',
    VERBOSE = 'verbose',
    DEBUG = 'debug',
    SILLY = 'silly'
};

export enum DeliveryStatus {
    Shipped = "Shipped", // The delivery service has the package and customer has been given a tracking number.
    InTransit = "In transit", // The parcel is on its way to the recipient.
    OutForDelivery = "Out for delivery", // On the last phase. The order is expected to be delivered shortly.
    Delivered = "Delivered", // The package is received successfully.
    AttemptedDelivery = "Attempted delivery", // Some issues prevented the delivering process.
    Canceled = "Canceled", // Due to reasons like stock issues or payment problems.
    HeldAtCustoms = "Held at customs", // Await clearance for the package.
    AwaitingPickup = "Awaiting pickup", // Customer can collect their ready at the courier pickup location.
    Delayed = "Delayed", // External factors have postponed the delivery.
    Lost = "Lost", // The delivery network can't locate the parcel.
};

export enum DeliveryStatusMessage {
    Shipped = "The delivery service has the package and customer has been given a tracking number.",
    InTransit = "The parcel is on its way to the recipient.",
    OutForDelivery = "On the last phase. The order is expected to be delivered shortly.",
    Delivered = "The package is received successfully.",
    AttemptedDelivery = "Some issues prevented the delivering process.",
    Canceled = "Due to reasons like stock issues or payment problems.",
    HeldAtCustoms = "Await clearance for the package.",
    AwaitingPickup = "Customer can collect their ready at the courier pickup location.",
    Delayed = "External factors have postponed the delivery.",
    Lost = "The delivery network can't locate the parcel.",
};