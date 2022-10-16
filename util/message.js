// message

const { NOTFOUND } = require("dns");

const message = {
    // admin
    ADMIN_CREATE : "admin create",

    ACC_CREATE : "new client account Created",
    
    CLIENT_UPDATE : "successfully Update  client information",

    SUPER_ADIM : "only super admin can create admin" , 

    ONLY_ADMIN_CREATE : "only admin can create a client" ,



    // client

    ACC_UPDATE : "accounts deatils successfully update", 

    MONEY_SENT : "sent to" ,

    MONEY_RECIEVD : "recived from",

    TRAS_HISTRORY : "all trasctions", 

    CLIENT_PROFILE : "account deatils",

    UPDATE_CLI_DETAILS : "account details update...",

    LOW_BALNACE : "insufficient balance to transfer",

    SAME_ACCOUND_NUMBER : "cant't sent money to same account number",

    CHK_ACC_NO : "invalid account number",

    // common

    LOG_IN : "successfully Login",

    LOG_OUT : "logout", 

    UNBLE_TO_LOG_OUT : "failed to log_out",

    NOT_FOUND : "not found" , 

    INVALID_TOKKEN : "unable to verify tokken" , 

    CHK_LOGIN_DEATILS : "cheack login details and try again"
}

module.exports = message