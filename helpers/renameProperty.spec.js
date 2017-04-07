let renameProperty = require("./renameProperty")
let assert = require("chai").assert

describe("renameProperty", () => {
    describe("renameProperty", () => {
        it("should rename a property", () => {
            let obj = {
                title: "random things"
            }
            obj = renameProperty(obj, "title", "newTitle")
            assert.property(obj, "newTitle")
        })
    })
})