const Mock = require("mock");

module.exports = () => {

    const template = {
        "post|1-2": [{"name": "cname", text: "@paragraph(5,10)"}],
        "profile": {
            id: "@guid",
            name: "@cname"

        },
        "comments|1-3": [{title: "@text(10)", id: "@guid"}]
    };

    const data = Mock.mock(template);
    return data;

};
