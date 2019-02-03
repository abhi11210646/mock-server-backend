
const request = require('supertest');
const mongoose = require('mongoose');
module.exports = (server) =>{
describe('/APIs', async () => {
    let token, id = mongoose.Types.ObjectId();
    // let server;
    let Project;
    let Api;
    let jwtService;
    const apiSchema = {
        "project": "5c34a59e8d88e67a74cd532a",
        "req": {
            "method": "GET", "path": "/abhishek2"
        },
        "res": {
            "bodyType": "application/json",
            "statusCode": "201",
            "headers": [{ "x-CACHE": "from redis cache" }],
            "body": "{ 'name': 'jonu' }"
        }
    }
    // do initialization
    beforeAll(async () => {
        // server = require("../../server");
        Project = mongoose.model('Project');
        Api = mongoose.model('Api');
        jwtService = require("../../app/services/jwtService");
        token = await new jwtService().createJwtToken({ id, email: "jonu.1504@gmail.com" });
    });
    let project, apis = [];
    beforeEach(async () => {
        project = new Project({ name: 'my_project_api', user: id });
        apiSchema["project"] = project._id
        apis = await Api.insertMany([apiSchema]);
        project.apis = [apis[0]._id];
        await project.save();
    });
    afterEach(async () => {
        await project.remove();
    });
    describe('GET /', async () => {
        it('Should return 401 if User is not logged in', async () => {
            const res = await request(server).get('/api/api/' + project._id);
            expect(res.status).toBe(401);
        });
        it('Should return status false if ID not Valid', async () => {
            const res = await request(server).get('/api/api/1').set('Authorization', 'jwt ' + token);
            expect(res.body.status).toBeFalsy();
        });
        it('Should return 200 if Valid Input', async () => {
            const res = await request(server).get('/api/api/' + project._id).set('Authorization', 'jwt ' + token);
            expect(res.status).toBe(200);
        });
    });
    describe('DELETE /', async () => {
        it('Should return 401 if User is not logged in', async () => {
            const res = await request(server).delete('/api/api');
            expect(res.status).toBe(401);
        });
        it('Should return 200 on Valid Input', async () => {
            const res = await request(server).delete('/api/api').set('Authorization', 'jwt ' + token).send({ apiID: apis[0]._id, user: id });
            expect(res.status).toBe(200);
        });
    });
    describe('POST /', async () => {
        it('Should return 401 if User is not logged in', async () => {
            const res = await request(server).post('/api/api');
            expect(res.status).toBe(401);
        });
        it('Should return 400 if InValid input is Passed', async () => {
            const res = await request(server).post('/api/api').set('Authorization', 'jwt ' + token).send({ project: "dd", req: {}, res: {} });
            expect(res.status).toBe(400);
        });
        it('Should return 409 if API is exists', async () => {
            const res = await request(server).post('/api/api').set('Authorization', 'jwt ' + token).send(apiSchema);
            expect(res.status).toBe(409);
        });
        it('Should return 200 on Valid Input', async () => {
            apiSchema.req.method = "POST"
            const res = await request(server).post('/api/api').set('Authorization', 'jwt ' + token).send(apiSchema);
            expect(res.status).toBe(201);
        });
    });
    // do cleanup
    afterAll(async () => {
        await server.close();
    });

});

}