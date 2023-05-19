const Mock = require("mockjs");
const Random = Mock.Random;

module.exports = () => {
    const template = {
        "data|1-5": [{key: "@id", text: "@sentence(3, 5)", status: Random.boolean() ? "pending" : "done"}],
        "list|1-10": [{title: "@title(10)", age: "@last"}],
        "post|1-2": [{"name": "cname", text: "@paragraph(5,10)"}],
        "profile": {
            id: "@guid",
            name: "@cname",
            text: "text"

        },
        "comments|1-3": [{title: "@text(10)", id: "@guid"}],
    };
    const data = Mock.mock(template);
    return data;
};
