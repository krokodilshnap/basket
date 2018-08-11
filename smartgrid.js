const smartgrid = require('smart-grid');

const settings = {
	filename: "_smartGrid",
	outputStyle: 'scss'
};

smartgrid('./app/scss/components', settings);