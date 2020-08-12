export class UserRole {
    public static USER_ADMIN = 'Admin';
    public static USER_DEALER = 'Dealer';
    public static USER_CUSTOMER = 'Customer';
}

export class ResponseMessage {
    public static readonly OK = 'ok';
    public static readonly SUCCEEDED = 'Succeeded!';
    public static readonly LOGINED = 'user logined!';
    public static readonly FAILED = 'failed';
    public static readonly NO_DATA = 'No Data';
    public static readonly AUTHORIZATION_FAILED = 'Authorization Failed.';
    public static readonly NOT_VERIFIED_USER = 'This user not verified yet. Please verify or sign up again.';
    public static readonly SESSION_UNDEFINED = 'Session Undefined.';
    public static readonly NOT_CONFIRMED_EMAIL = 'Please verify this email and then try to login.';
    public static readonly INVALID_TOKEN = 'Token is not valid. Please try again.';
    public static readonly ALREADY_REGISTERED = 'You registered already. Please confirm again.';
    public static readonly INVALID_PARAM_OR_INTERNAL_ERROR = 'Invalid Parameters or Internal Server Error.';
    public static readonly INVALID_VERIFICATION_CODE = 'Invalid verification code.';
    public static readonly INVALID_PHONE_NUMBER = 'Invalid phone number.';
    public static readonly NOT_IMPLEMENTED_YET = 'Not implemented yet.';
    public static readonly NOT_FOUND_GARAGE = 'Not Found such garage.';
    public static readonly DUPLICATED_USER = 'There already exists a user has same post code or email.';
    public static readonly NOT_FOUND_USER = 'Not found user';
    public static readonly WRONG_VERIFY_CODE = 'Wrong Verification Code';
    public static readonly DUPLICATED_USERNAME = 'This username is already existed. Please select the other name.';

    public static readonly INVALID_OPERATION = 'Invalid operation';

    public static readonly FAILED_STRIPE_PAY = 'Failed to stripe pay.';
    public static readonly ALREADY_PAID = 'Already paid.';
    public static readonly NOT_ACCEPTED_QUOTE = 'Does not accepted this quote.';

    public static readonly NOT_FOUND_RECORD = 'Not Found such record.';
    public static readonly DUPLICATED_RECORD = 'Alread exist such record.';
    public static readonly NO_POLICY = 'No Policy.';
    public static readonly INVALID_PARAMS_OVER_200_PERCENT = 'There is some value over 200%. Please fix this.';

    // group status comment
    public static readonly DUPLICATED_GROUPNAME = 'This group name is already existed. Please select the other name';
    public static readonly NOT_FOUND_GROUP = 'Not found group';
    public static readonly NOT_FOUND_GROUP_MEMBERS = 'Not found group members';
    public static readonly NOT_FOUND_NON_GROUP_MEMBERS = 'Not found non-group members';

    // cover type status comment
    public static readonly DUPLICATED_COVERNAME = 'This cover name is already existed. Please select the other name';
    public static readonly NOT_FOUND_COVERTYPE = 'Not found cover type';

    // duration status comment
    public static readonly NOT_FOUND_DURATION = 'Not found duration';

    // purchase limit status comment
    public static readonly NOT_FOUND_LIMIT = 'Not found limit';

    // pricing status comment
    public static readonly NOT_FOUND_PRICING = 'Not found pricing';

    // pricing status comment
    public static readonly NOT_FOUND_SETTING = 'Not found setting';

    // pricing status comment
    public static readonly NOT_FOUND_PERMISSION = 'Not found permission';
}
