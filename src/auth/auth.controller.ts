import { Controller, Post, ValidationPipe, Body, Req, UseGuards } from '@nestjs/common';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';
import * as nodemailer from 'nodemailer';


export var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yehudacooper2@gmail.com',
        pass: '***********'
    }
});


@Controller('auth')
export class AuthController {
    constructor(private myAuthService: AuthService) {

    }
    @Post('/signup')
    createUser(@Body(ValidationPipe) userDto: AuthCredentialsDto): Promise<User> {
        return this.myAuthService.signUp(userDto);
    }

    @Post('/signin')
    async signIn(@Body(ValidationPipe) userDto: AuthCredentialsDto): Promise<{ any }> {



        return this.myAuthService.signIn(userDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log(user);

    }

    @Post('/contactus')
    contactus(@Body() usermsg: any): any {
        var mailOptions = {
            from: 'yehudacooper2@gmail.com',
            to: 'yehudacooper2@gmail.com',
            subject: usermsg.subject,
            text: usermsg.message
        };

        var mailOptions2 = {
            from: 'yehudacooper2@gmail.com',
            to: usermsg.email,
            subject: 'Silver Store',
            text: 'thank you for contacting us...'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        transporter.sendMail(mailOptions2, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }

    @Post('/checkout')
    checkout(@Body() usercheckout: any): any {
        const fs = require('fs');
        var mailOptions = {
            from: 'yehudacooper2@gmail.com',
            to: 'yehudacooper2@gmail.com',
            subject: usercheckout.subject,
            text: usercheckout.message
        };

        var mailOptions2 = {
            from: 'yehudacooper2@gmail.com',
            to: usercheckout.email,
            subject: 'Silver Store',
            text: usercheckout.message,

        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        transporter.sendMail(mailOptions2, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }



}
