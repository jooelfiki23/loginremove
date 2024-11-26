const LocalStrategy = require("passport-local").Strategy;
const usernewff = require('./configschema');


module.exports = configpass = (passport) => {
    // إعداد LocalStrategy
    passport.use(
        new LocalStrategy(
            { usernameField: "username", passwordField: "password" }, // تحديد الحقول
            async (username, password, done) => {
                try {
                    // البحث عن المستخدم في قاعدة البيانات
                    const user = await usernewff.findOne({ username: username });
                    if (!user) {
                        return done(null, false, { message: "User not found" });
                    }

                    // مقارنة كلمة المرور
                    const isMatch =  user.password === password;
                    if (!isMatch) {
                        return done(null, false, { message: "Incorrect password" });
                    }

                    return done(null, user);
                } catch (err) {
                    return done(err);
                }
            }
        )
    );

    // تهيئة serializeUser
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // تهيئة deserializeUser
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await usernewff.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};
