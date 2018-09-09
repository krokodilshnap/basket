const smartgrid = require('smart-grid');

const settings = {
	filename: "_smartGrid",
	outputStyle: 'scss',
    columns: 12,
    offset: "30px",
    container: {
        maxWidth: "1280px",
        fields: "30px"
    },
    breakPoints: {
        lg: {
            width: "1200px"
        },
        md: {
            width: "992px",
            fields: "15px"
        },
        sm: {
            width: "768px"
        },
        xs: {
            width: "576px"
        }
    },
};

smartgrid('./app/scss/components', settings);