export class Validate {
    static email (mail:string) {
        if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mail)){
            return true
        }
        return false
    }
    static password (password: string){
        return password.length >=6
    }
}