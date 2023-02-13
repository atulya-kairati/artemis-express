const request = require('supertest')

const { connectToMongoCluster, disconnectMongo } = require("../../services/mongo.connect")
const app = require("../../app")


describe("All test", () => {

    beforeAll(async () => {
        await connectToMongoCluster();
    });


    afterAll(async () => {
        await disconnectMongo();
    });

    describe("Test GET /launches", () => {
        test("HTTP response should be 200 OK", async () => {
            const response = await request(app)
                .get('/v1/launches')
                .expect(200)

        })

        test("Should return json content", async () => {
            const response = await request(app)
                .get('/v1/launches')
                .expect("Content-Type", /json/)
        })
    })


    describe("Test POST /launches", () => {
        const launchData = {
            mission: "Manus Explorer A",
            rocket: "Mushroom",
            launchDate: "January 8, 2099",
            target: "Kepler-296 f"
        }

        const launchDataWithoutDate = {
            mission: "Manus Explorer A",
            rocket: "Mushroom",
            target: "Kepler-296 f"
        }

        const launchDataWithInvalidDate = {
            mission: "Manus Explorer A",
            rocket: "Mushroom",
            launchDate: "dddd",
            target: "Kepler-296 f"
        }

        test("HTTP response should be 200 and check if return is same same as request body", async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchData)
                .expect(201)
                .expect("Content-Type", /json/)

            // We are checking if the response contains all the parameter except date
            expect(response.body).toMatchObject(launchDataWithoutDate)

            // We handle date seperately
            const requestDate = new Date(launchData.launchDate).valueOf()
            const responseDate = new Date(response.body.launchDate).valueOf()

            expect(responseDate).toBe(requestDate)
        })


        test("Should catch missing required propertied error", async () => {
            const response = await request(app)
                .post("/v1/launches")
                .send(launchDataWithoutDate)
                .expect(400)
                .expect('Content-Type', /json/)

            expect(response.body).toStrictEqual({ success: false, msg: "required properties not found" })

        })
        test("Should catch invalid date error", async () => {

            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithInvalidDate)
                .expect(400)
                .expect("Content-Type", /json/)

            expect(response.body).toStrictEqual({ success: false, msg: "not a valid date" })
        })
    })

});

