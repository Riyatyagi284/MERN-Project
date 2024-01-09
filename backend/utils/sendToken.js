// here we will write code for sending token and save it into the cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    const cookieName = 'myCookie';
    // options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.cookie(cookieName, token, options); 

    res.status(statusCode).json({
        success: true,
        user,
        token,
    })

};

module.exports = sendToken;