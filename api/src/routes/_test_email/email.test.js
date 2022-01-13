const request = require('supertest')
const server = require('../../app')

it('Can send emails with valid inputs', () => {
    return request(server)
    .post('/api/mail')
    .send({
        to:'lorenadearmas01@gmail.com',
        subject: 'Subject',
        text: 'Compra',
        html: '<strong>notification@henrecommerce.com</strong>',
        sandboxMode: true
    })
    .expect(202);
})