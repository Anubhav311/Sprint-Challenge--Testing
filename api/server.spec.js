const request = require('supertest');

const server = require('./server.js');

describe('server', () => {
    
    describe('GET/', () => {
        
        it('should return an array', () => {
            return request(server)
                .get('/api/games')
                .then(res => {
                    expect(Array.isArray(res.body)).toBe(true);
                })
        })

        it('should return status code 200', () => {
            return request(server)
                .get('/api/games')
                .then(res => {
                    expect(res.status).toBe(200);
            })
        })

        it('should check the "title" property', () => {
            function titleChecker(arr) {
                for(i=0; i<arr.body.length; i++) {
                    if(arr.body[i].hasOwnProperty('title')) {titleStatus = true;} 
                    else {return false;}
                }
                return titleStatus
            }
            return request(server)
                .get('/api/games')
                .then(res => {
                    expect(titleChecker(res)).toBe(true)
                })
        })
    })

})

