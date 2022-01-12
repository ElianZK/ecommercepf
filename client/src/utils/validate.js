export function validate(state) {
    let errors = {};


    if(!state.name){
        errors.name = 'name is required';
    }else if(!/^\w{3,20}$/.test(state.name)){
        errors.name = 'Invalid name'
    }else if(!state.address.city){
        errors.address = 'address is required';

    }else if(!state.address.country){
    errors.address = 'address is required';
    
    }else if(!state.address.postalCode){
    errors.address = 'address is required';
    }

    else if(!state.email){
        errors.email = 'email is required';
    }
    return errors;
}
