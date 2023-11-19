const nodemailer = require('nodemailer');
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
require('dotenv').config();

const Mailgen = require('mailgen');

const { EMAIL, PASSWORD } = require('../env.js');

const signup = async (req, res) => {

    try {
        const { username, password, email, phonenumber } = req.body;
        const listUser = await Users.findAll();

        let config = {
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        }

        let transporter = nodemailer.createTransport(config);

        let MailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: process.env.APP_NAME,
                link: process.env.APP_LINK,
            }
        })

        let response = {
            body: {
                name: username,
                intro: "Hung Store xin chào",
                table: {
                    data: [
                        {
                            "Thông tin tài khoản": "Tên người dùng",

                            "": username,
                        }, {
                            "Thông tin tài khoản": "Mật khẩu",
                            "": password,
                        }, {
                            "Thông tin tài khoản": "Số điện thoại",
                            "": phonenumber,
                        }, {
                            "Thông tin tài khoản": "Email",
                            "": email
                        }
                    ]
                },
                outro: "Chúc bạn một ngày tốt lành <3"
            }
        }

        let mail = MailGenerator.generate(response)

        let message = {
            from: EMAIL,
            to: email,
            subject: "New Account",
            html: mail
        }


        var excuting = true;
        let message1 = "";

        for (let i of listUser) {
            if (i.username === username) {
                excuting = false;
                message1 = "Tên người dùng đã tồn tại";
                break;
            } else if (i.email === email) {
                excuting = false;
                message1 = "Email đã được sử dụng";
                break;
            }
        }

        if (excuting === false) {
            res.status(400).json(message1);
        } else {
            transporter.sendMail(message).then(() => {

                bcrypt.hash(password, 10).then((hash) => {
                    Users.create({
                        username: username,
                        password: hash,
                        email: email,
                        phonenumber: phonenumber,
                        avatar: "https://cdn.icon-icons.com/icons2/3446/PNG/512/account_profile_user_avatar_icon_219236.png"
                    })
                });
                return res.status(201).json({
                    msg: "you should receive an email"
                })
            }).catch(error => {
                return res.status(400).json(error)
            })
        }
    } catch (error) {
        res.status(404).json(error);
    }
}

const login = async (req, res) => {

    try {
        const username = req.body.username;
        let password = req.body.password;
        password = String(password);

        const user = await Users.findOne({ where: { username: username } });

        if (!user) res.status(400).json("Tên người dùng không tồn tại");
        else
            bcrypt.compare(password, user.password).then((match) => {
                if (!match) {
                    res.status(400).json("Sai mật khẩu");
                }
                else {
                    const accessToken = sign(
                        { username: user.username, id: user.id },
                        process.env.SECRET_TYPE
                    )
                    res.json({ token: accessToken, user });
                }
            })
    } catch (error) {
        res.status(400).json(error);
    }

}

const verify1 = (req, res) => {

    try {

        const userEmail = req.body.email;
        const username = req.body.username;
        const OTP = req.body.OTP;

        let config = {
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        }

        let transporter = nodemailer.createTransport(config);

        let MailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: process.env.APP_NAME,
                link: process.env.APP_LINK,
            }
        })

        let response = {
            body: {
                name: username,
                intro: "Hung Store xin chào",
                table: {
                    data: [
                        {
                            "Thông tin": "Mã OTP",
                            OTP: OTP,
                        }
                    ]
                },
                outro: "Chúc bạn một ngày tốt lành <3"
            }
        }

        let mail = MailGenerator.generate(response)

        let message = {
            from: EMAIL,
            to: userEmail,
            subject: "OTP",
            html: mail
        }

        transporter.sendMail(message).then(() => {
            return res.status(201).json({
                msg: "you should receive an email"
            })
        }).catch(error => {
            return res.status(500).json({ error })
        })

    } catch (error) {
        res.status(400).json(error);
    }
}

const sendMail = (req, res) => {
    try {

        const userEmail = req.body.email;
        const username = req.body.username;
        const messageBody = req.body.message;

        let config = {
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        }

        let transporter = nodemailer.createTransport(config);

        let MailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: process.env.APP_NAME,
                link: process.env.APP_LINK,
            }
        })

        let response = {
            body: {
                name: username,
                intro: `${username} xin chào`,
                table: {
                    data: [
                        {
                            "Thông tin": "Mã OTP",
                            OTP: OTP,
                        }
                    ]
                },
            }
        }

        let mail = MailGenerator.generate(response)

        let message = {
            from: userEmail,
            to: EMAIL,
            subject: "OTP",
            html: mail
        }

        transporter.sendMail(message).then(() => {
            return res.status(201).json({
                msg: "you should receive an email"
            })
        }).catch(error => {
            return res.status(500).json({ error })
        })

    } catch (error) {
        res.status(400).json(error);
    }
};

const forgotPassword = (req, res) => {

    try {
        const email = req.body.email;
        const OTP = req.body.OTP;

        const user = Users.findOne({where: {email: email}});
        if (user) {
            let config = {
                service: 'gmail',
                auth: {
                    user: EMAIL,
                    pass: PASSWORD
                }
            }
            
            let transporter = nodemailer.createTransport(config);
            let MailGenerator = new Mailgen({
                theme: "default",
                product: {
                    name: process.env.APP_NAME,
                    link: process.env.APP_LINK,
                }
            })

            let response = {
                body: {
                    table: {
                        data: [
                            {
                                "Thông tin": "Mã OTP",
                                OTP: OTP,
                            }
                        ]
                    },
                }
            }
    
            let mail = MailGenerator.generate(response)
    
            let message = {
                from: userEmail,
                to: EMAIL,
                subject: "OTP",
                html: mail
            }
    
            transporter.sendMail(message).then(() => {
                return res.status(201).json({
                    msg: "you should receive an email"
                })
            }).catch(error => {
                return res.status(500).json({ error })
            })
        } else {
            res.status(400).json("Email chưa được tạo tài khoản");
        }

    } catch (err) {
        res.status(400).send("Lượng truy cập quá lớn so với server free");
    }

};


module.exports = {
    signup,
    login,
    verify1,
    sendMail,
    forgotPassword
}