function validate(input) {
    let errors = {};


    if(!input.name){
        errors.name = 'name is required';
    }else if(!/^\w{3,20}$/.test(input.name)){
        errors.name = 'Invalid name'
    }else if(!input.address){
        errors.address = 'address is required';
    }
    else if(!input.email){
        errors.email = 'email is required';
    }
    return errors;
}
