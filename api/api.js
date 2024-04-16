var express = require('express');
var creator = "Wann"
var router = express.Router();

loghandler = {
  notparam: {
    status: false,
    creator: `${creator}`,
    code: 406,
    message: 'masukan parameter apikey'
  },
  noturl: {
    status: false,
    creator: `${creator}`,
    code: 406,
    message: 'masukan parameter url'
  },
  notgcname: {
    status: false,
    creator: `${creator}`,
    code: 406,
    message: 'masukkan paramer gcname'
  },
  notgcicon: {
    status: false,
    creator: `${creator}`,
    code: 406,
    message: 'masukkan paramer gcicon'
  },
  notpp: {
    status: false,
    creator: `${creator}`,
    code: 406,
    message: 'masukkan paramer pp'
  },
  notbg: {
    status: false,
    creator: `${creator}`,
    code: 406,
    message: 'masukkan paramer bg'
  },
  notmemberCount: {
    status: false,
    creator: `${creator}`,
    code: 406,
    message: 'masukkan paramer memberCount'
  },
  notquery: {
    status: false,
    creator: `${creator}`,
    code: 406,
    message: 'masukkan parameter query'
  },
  notkata: {
    status: false,
    creator: `${creator}`,
    code: 406,
    message: 'masukan parameter kata'
  },
  nottext: {
    status: false,
    creator: `${creator}`,
    code: 406,
    message: 'masukan parameter text'
  },
  nottext2: {
    status: false,
    creator: `${creator}`,
    code: 406,
    message: 'masukan parameter text2'
  },
  notnabi: {
    status: false,
    creator: `${creator}`,
    code: 406,
    message: 'masukan parameter nabi'
  },
  nottext3: {
    status: false,
    creator: `${creator}`,
    code: 406,
    message: 'masukan parameter text3'
  },
  nottheme: {
    status: false,
    creator: `${creator}`,
    code: 406,
    message: 'masukan parameter theme'
  },
  notusername: {
    status: false,
    creator: `${creator}`,
    code: 406,
    message: 'masukan parameter username'
  },
  notvalue: {
    status: false,
    creator: `${creator}`,
    code: 406,
    message: 'masukan parameter value'
  },
  invalidKey: {
    status: false,
    creator: `${creator}`,
    code: 406,
    message: 'apikey invalid'
  },
  invalidlink: {
    status: false,
    creator: `${creator}`,
    message: 'error, mungkin link anda tidak valid.'
  },
  invalidkata: {
    status: false,
    creator: `${creator}`,
    message: 'error, mungkin kata tidak ada dalam api.'
  },
  error: {
    status: false,
    creator: `${creator}`,
    message: '404 ERROR'
  }
}

const listkey = ["apiwann", "wannapi"];

router.post("/apikey", async (req, res, next) => {
  const key = req.query.key;
  if (listkey.includes(key)) {
    res.json({
      message: 'apikey sudah terdaftar'
    });
  } else {
    listkey.push(key);
    res.json({
      message: `berhasil mendaftarkan ${key} Kedatabase apikey`
    });
  }
});

router.delete("/apikey", async (req, res, next) => {
  const key = req.query.delete;
  if (listkey.includes(key)) {
    res.json({
      message: 'apikey tidak ada sebelumnya'
    })
  } else {
    listkey.splice(key, 1)
    res.json({
      message: 'apikey berhasil dihapus'
    });
  }
});

//―――――――――――――――――――――――――――――――――――――――――― ┏  Other  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\


router.get('/cekapikey', async (req, res, next) => {
  const apikey = req.query.apikey;
  if (!apikey) return res.json(loghandler.notparam)
  if (listkey.includes(apikey)) {
    res.json({
      status: 'active',
      creator: `${creator}`,
      apikey: `${apikey}`,
      message: 'APIKEY ACTIVE'
    })
  } else {
    res.json(loghandler.invalidKey)
  }
})

module.exports = router