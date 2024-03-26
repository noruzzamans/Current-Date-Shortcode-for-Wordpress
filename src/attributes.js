const attributes = {
    blockID: {
        type: "string",
        default: ""
    },
    dateFormat: {
        type: "string",
        default: "jS F Y"
    },
    textColor: {
        type: "string",
        default: ""
    },
    fontSize: {
        type: "number",
        default: 17
    },
    letterSpacing: {
        type: "number",
        default: 0
    },
    textTransform: {
        type: "string",
        default: "None"
    },
    fontFamily: {
        type: "string",
        default: "default",
    },
    fontWeight: {
        type: "string",
        default: "Normal"
    },
    lineHeight: {
        type: "number",
        default: 24
    },
    padding: {
        type: "object", 
        default: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },
    },
};

export default attributes;
