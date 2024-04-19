__path = process.cwd()

var expresss = require('express');
var router = expresss.Router();

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../view/index.html'));
	
});
router.get('/dosc', (req, res) => {
	res.sendFile(path.join(__dirname, '../view/dosc.html'));
});

router.get('/config', (req, res) => {
    const config = {
        status: true,
        result: {
            prefix : '.',
            namabot: 'Ceria-Bot',
            namaowner: 'Wann',
            instagram: 'irwns23_',
            youtube : 'Gak Punya'
        }
    }
    res.json(config)
})
