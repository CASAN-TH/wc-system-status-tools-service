'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Systemstatustool = mongoose.model('Systemstatustool');

var credentials,
    token,
    mockup;

describe('Systemstatustool CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            name: "WC transients",
            action: "Clear transients",
            description: "This tool will clear the product/shop transients cache.",
            message: "this is message"
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Systemstatustool get use token', (done) => {
        request(app)
            .get('/api/systemstatustools')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                done();
            });
    });

    it('should be Systemstatustool get by id', function (done) {

        request(app)
            .post('/api/systemstatustools')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/systemstatustools/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.name, mockup.name);
                        assert.equal(resp.data.action, mockup.action);
                        assert.equal(resp.data.description, mockup.description);
                        assert.equal(resp.data.message, mockup.message);
                        done();
                    });
            });

    });

    it('should be Systemstatustool post use token', (done) => {
        request(app)
            .post('/api/systemstatustools')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.status, 200);
                assert.equal(resp.data.name, mockup.name);
                assert.equal(resp.data.action, mockup.action);
                assert.equal(resp.data.description, mockup.description);
                assert.equal(resp.data.message, mockup.message);
                done();
            });
    });

    it('should be systemstatustool put use token', function (done) {

        request(app)
            .post('/api/systemstatustools')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update',
                    action: "Clear transients",
                    description: "This tool will clear the product/shop transients cache.",
                    message: "this is message"
                }
                request(app)
                    .put('/api/systemstatustools/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.name, update.name);
                        assert.equal(resp.data.action, update.action);
                        assert.equal(resp.data.description, update.description);
                        assert.equal(resp.data.message, update.message);
                        done();
                    });
            });

    });

    it('should be systemstatustool delete use token', function (done) {

        request(app)
            .post('/api/systemstatustools')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/systemstatustools/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be systemstatustool get not use token', (done) => {
        request(app)
            .get('/api/systemstatustools')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be systemstatustool post not use token', function (done) {

        request(app)
            .post('/api/systemstatustools')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be systemstatustool put not use token', function (done) {

        request(app)
            .post('/api/systemstatustools')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/systemstatustools/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be systemstatustool delete not use token', function (done) {

        request(app)
            .post('/api/systemstatustools')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/systemstatustools/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Systemstatustool.remove().exec(done);
    });

});