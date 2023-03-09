import { Injectable } from '@nestjs/common';


@Injectable({})
export class AuthService {
    async singUp(): Promise<unknown> {
        return {
            msg: "i am sing in"
         }
    }
    
    async singIn(): Promise<unknown> {
        return "i am singin"
    }
}
