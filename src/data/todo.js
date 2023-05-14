const Mock = require("mockjs");

module.exports = () => {

    const template = {
        "list|1-10": [{title: "@title(10)", age: "@last"}],
        "post|1-2": [{"name": "cname", text: "@paragraph(5,10)"}],
        "profile": {
            id: "@guid",
            name: "@cname"

        },
        "comments|1-3": [{title: "@text(10)", id: "@guid"}],
    };

    const data = Mock.mock(template);
    return data;

};
