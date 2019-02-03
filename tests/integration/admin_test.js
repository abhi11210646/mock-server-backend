
const request = require('supertest');
const mongoose = require('mongoose');

module.exports = (server) =>{
    describe('/ADMIN', async () => {
        let token, token2, id1 = mongoose.Types.ObjectId(),
            id2 = mongoose.Types.ObjectId(),
            id3 = mongoose.Types.ObjectId();
        // let server;
        let Project;
        let jwtService;
        // do initialization
        beforeAll(async () => {
            // server = require("../../server");
            Project = mongoose.model('Project');
            jwtService = require("../../app/services/jwtService");
            token = await new jwtService().createJwtToken({ id: id1, email: "jonu.1504@gmail.com", role: "ADMIN" });
            token2 = await new jwtService().createJwtToken({ id: id2, email: "jonu.150456565@gmail.com" });
        });
        let project;
        beforeEach(async () => {
            project = new Project({ name: 'my_project_api', user: id2 });
            await project.save();
        });
        afterEach(async () => {
            await project.remove();
        });
        describe('POST /', async () => {
            it('Should return 401 if User is not ADMIN', async () => {
                const res = await request(server).post('/api/assignProject/').set('Authorization', 'jwt ' + token2);
                expect(res.status).toBe(401);
            });
            it('Should successfully assign if User ADMIN', async () => {
                const res = await request(server)
                    .post('/api/assignProject/')
                    .set('Authorization', 'jwt ' + token)
                    .send({ project: project._id, user: id3 });
                expect(res.status).toBe(200);
                const proje = await Project.findOne({ _id: project._id, user: id3 });
                expect(proje).toBeTruthy();
            });
        });
        // do cleanup
        afterAll(async () => {
            await server.close();
        });
    
    });
}

