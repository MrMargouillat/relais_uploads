const Meeting = require("./meetings")
let meeting = new Meeting
let assert = require("chai").assert

describe("Meetings", () => {
    describe("select by id", () => {
        it("should return an object with data of a meeting", (done) => {
            meeting.selectById(1).then(res => {
                    assert.isObject(res)
                    assert.property(res, 'id');
                    assert.property(res, 'year');
                    assert.property(res, 'place');
                    done()
                })
                .catch((err) => {
                    assert.ifError(err)
                    done()
                })

        })
    })
    describe("get all meetings", () => {
        it("should return an array with objects", done => {
            meeting.getAll()
                .then(result => {
                    assert.isArray(result, "return an array")
                    assert.isObject(result[0])
                    done()
                })
                .catch(err => {
                    assert.ifError(err)
                    done()
                })
        })
    })
})