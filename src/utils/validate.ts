
export function validate(value: string, type: string, format: any = "") {
	if (!format) {
        if(type){
            switch(type){
                case "name":
                    format = /^[А-ЯA-Z]{1}[а-яА-Яa-zA-Z][a-zA-Z0-9-_\.]{1,}$/;
                    break;
                case "phone":
                    format = "";
                    break;
                case "email":
                    format = /^[а-яА-Яa-zA-Z0-9._%+-]+@[а-яА-Яa-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    break; 
                case "login":
                    format = /^[a-zA-Z](.[a-zA-Z0-9_-]*)$/;
                    break;                     
                case "password":
                    format = "";
                    break;                     
                case "not-empty":
                    format = /^$/;
                    break;            
            }
        }
	}
    if (!format.test(value)) {
        throw new Error("Неверный формат");
    }	
    return true;
}
