const request = require('supertest');
const mongoose = require('mongoose');
const expect = require("chai").expect;
// module.exports = (server) => {
    describe('/PROJECTs', async () => {
        let token, token2;
        let server;
        let Project, projects = [], project;
        let jwtService;
        let id = mongoose.Types.ObjectId();
        let id2 = mongoose.Types.ObjectId();
        // do initialization
        before(async () => {
            server = require("../../server");
            Project = mongoose.model('Project');
            jwtService = require("../../app/services/jwtService");
            token = await new jwtService().createJwtToken({ id: id, email: "jonu.1504@gmail.com" });
            token2 = await new jwtService().createJwtToken({ id: id2, email: "jonu.150444444@gmail.com" });
        });
        beforeEach(async () => {
            project = new Project({ name: 'my_project222', user: id });
            projects.push(project);
            await project.save();
        });
        afterEach(async () => {
            await Project.remove({});
            // _id: { $in: projects.map(p => p._id) }
            projects = [];
        });
        describe('GET /', () => {

            it('Should return 401 if User is not logged in', async () => {
                const res = await request(server).get('/api/project');
                expect(res.status).to.equal(401);
            });
            it('Should return status false if ID not Valid', async () => {
                // console.log('p',token)
                const res = await request(server).get('/api/project/1').set('Authorization', 'jwt ' + token);
                expect(res.body.status).to.false;
            });
            it('Should return  Projects if Id is not Passed', async () => {
                const res = await request(server).get('/api/project').set('Authorization', 'jwt ' + token);
                expect(res.status).to.equal(200);
                expect(res.body.data.projects).to.have.lengthOf(projects.length);
            });
            it('Should return 200 with Project if Id is Valid', async () => {
                const res = await request(server).get('/api/project/' + projects[0]._id).set('Authorization', 'jwt ' + token);
                expect(res.status).to.equal(200);
                expect(res.body.data.projects[0]).to.have.property('name', projects[0].name);
            });
            it('Should return empty array if token passed is different', async () => {
                const res = await request(server).get('/api/project').set('Authorization', 'jwt ' + token2);
                expect(res.body.data.projects).to.be.an('array').that.is.empty;
            });

        });
        describe('DELETE /', () => {
            it('Should return 401 if User is not logged in', async () => {
                const res = await request(server).delete('/api/project');
                expect(res.status).to.equal(401);
            });
            it('should return 404 if no PROJECT with the given id was found', async () => {
                const res = await request(server).delete('/api/project').set('Authorization', 'jwt ' + token).send({ projectID: mongoose.Types.ObjectId() });
                expect(res.status).to.equal(404);
            });
            it('should return 200 if PROJECT is successfully deleted', async () => {
                const res = await request(server).delete('/api/project').set('Authorization', 'jwt ' + token).send({ projectID: project._id });
                expect(res.status).to.equal(200);
            });
        });
        describe('POST /', () => {
            it('Should return 401 if User is not logged in', async () => {
                const res = await request(server).post('/api/project');
                expect(res.status).to.equal(401);
            });
            it('Should return 201 if input is valid', async () => {
                const res = await request(server).post('/api/project').set('Authorization', 'jwt ' + token).send({ name: "my_project222_jonu" });
                expect(res.status).to.equal(201);
            });
            it('Should return status false if project already exists', async () => {
                const res = await request(server).post('/api/project').set('Authorization', 'jwt ' + token).send({ name: "my_project222" });
                expect(res.body.status).to.false;
            });
        });
        // do cleanup
        after(async () => {
            await server.close();
        });
    });

