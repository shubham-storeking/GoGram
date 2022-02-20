const PasswordVerification = require("../../models/PasswordVerification");
const User = require("../../models/User");
const SendEmail = require("../../utils/SendEmail");

function GenCode() {
    const code = ""
    for (let i = 0; i < 8; i++) {
        code += Math.round(Math.random() * 9)
    }
}

async function SendPasswordRecoveryCode(req, res) {
    const code = GenCode()
    const email = req.body.email

    try {
        let pv = await PasswordVerification.findOne({ email })

        if (!pv) {
            pv = new PasswordVerification({ code, email, isVerified: false })
        }

        await pv.save()

        await SendEmail(email, "Recover password", {
            html: `<h1>Recover password</h1><br></br><p>${code}</p>`
        })
    }
    catch (e) {

    }
}

async function VerifyCode(req, res) {
    const email = req.body.email
    const code = req.body.code

    const pv = await PasswordVerification.findOne({ code, email })

    if (!pv) {
        res.sendStatus(400)
        return
    }

    pv.isVerified = true

    pv.save()

    res.sendStatus(200)
}

async function ChangePassword(req, res) {
    const email = req.body.email
    const newPassword = req.body.newPassword

    const pv = await PasswordVerification.findOne({email})

    if(!pv)
    {
        res.sendStatus(400)
        return
    }

    const user = await User.findOne({ email })

    user.password = newPassword

    await user.save()

    await PasswordVerification.deleteOne({_id: pv._id})

    res.sendStatus(200)
}

module.exports = {
    ChangePassword,
    SendPasswordRecoveryCode,
    VerifyCode
}
