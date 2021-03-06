const request = require('supertest');

const server = require('./server.js');
const db = require('../database/dbConfig');

describe('server', () => {

    beforeAll(async () => {
        await db('games').truncate();
    })
    
    describe('POST/', () => {

        it('should return a success message', () => {
            return request(server)
                .post('/api/games/register')
                .send({
                    title: 'testGame1',
                    genre: 'testGenre'
                })
                .then(res => {
                    expect(res.body.message).toBe("game added")
                })
        })

        it('should return 200 status code', () => {
            return request(server)
            .post('/api/games/register')
            .send({
                title: 'testGame3',
                genre: 'testGenre3'
            })
            .then(res => {
                expect(res.status).toBe(200)
            })
        })

        it('should return 422 error status code for incomplete information', () => {
            return request(server)
            .post('/api/games/register', {
                // title: 'testGame',
                genre: 'testGenre'
            })
            .then(res => {
                expect(res.status).toBe(422);
            })
        })
    })
    
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

    describe('GET:id/', () => {

        it('should send 200 status code', () => {
            return request(server)
                .get('/api/games/1')
                .then(res => {
                    expect(res.status).toBe(200);
                })
        })

        it('should send 404 status code if game is not found', () => {
            return request(server)
                .get('/api/games/5')
                .then(res => {
                    expect(res.status).toBe(404);
                })
        }) 

        it('should send an object', () => {
            return request(server)
                .get('/api/games')
                .then(res => {
                    expect(typeof(res.body)).toBe("object");
                })
        })
    })

    describe('DELETE:id/', () => {
        it('should return 404 status if game does not exist', () => {
            return request(server)
                .delete('/api/games/5')
                .then(res => {
                    expect(res.status).toBe(404);
                })
        });

        it('should return number of items deleted', () => {
            return request(server)
                .delete('/api/games/1')
                .then(res => {
                    expect(res.body).toBe(1)
                })
        })

        it('should send message if game does not exist', () => {
            return request(server)
                .delete('/api/games/5')
                .then(res => {
                    expect(res.body.message).toBe("there's no game with the same id");
                })
        })
    })

})

