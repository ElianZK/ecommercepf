function Validate(input) {
    let errors = {};


    if(!input.name){
        errors.name = 'name is required';
    }else if(!/^\w{3,20}$/.test(input.name)){
        errors.name = 'Invalid name'
    }else if(!input.lastName){
        errors.lastName = 'lastName es required'
    }else if(!/^[a-zA-ZA\s]{3,20}$/.test(input.lastName)){
        errors.lastName = 'Invalid lastName'
    }else if(!input.address){
        errors.address = 'address is required';
    }
    else if(!input.email){
        errors.email = 'email is required'
    } else if(!input.email){
        errors.email = 'Invalid email'
    }
    return errors;
}
