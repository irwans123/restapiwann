var __path = process.cwd()
var expres = require('express');
var creator = "Wann"
var router = expres.Router();
var fs = require("fs");
var fth = require('node-fetch');
var { jadwalsholat } = require('@bochilteam/scraper');

var {
  ytDonlodMp3,
  ytDonlodMp4,
  ytPlayMp3,
  ytPlayMp4,
  ytSearch
} = require("./../lib/utils/yt.js");

var { Searchnabi } = require('./../lib/kisahnabi.js');

var loghandler = {
  notparam: {
    status: false,
    creator: `${creator}`,
    code: 406,
    message: 'masukan parameter apikey',
    getApikey: 'gak punya apikey? chat gw aja yaaa di wa.me/6285646856646, gratiss'
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
    message: 'gak punya apikey? chat gw aja yaaa di wa.me/6285646856646, gratis'
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

const listkey = ["apiwann", "wannapi", "MASUKIN_APIKEY"];

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


//―――――――――――――――――――――――――――――――――――――――――― ┏  Social Media  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\
//download media
router.get('/download/ytmp3', async (req, res, next) => {
  const url = req.query.url;
  const apikey = req.query.apikey;
  if (!url) return res.json(loghandler.noturl)
  if (!apikey) return res.json(loghandler.notparam)
  if (listkey.includes(apikey)) {
    ytDonlodMp3(url)
      .then((result) => {
        res.json({
          status: true,
          code: 200,
          creator: `${creator}`,
          result
        })
      })
      .catch(e => {
        res.json(loghandler.invalidlink)
      });
  } else {
    res.json(loghandler.invalidKey)
  }
});
router.get('/download/ytmp4', async (req, res, next) => {
  const url = req.query.url;
  const apikey = req.query.apikey;
  if (!url) return res.json(loghandler.noturl)
  if (!apikey) return res.json(loghandler.notparam)
  if (listkey.includes(apikey)) {
    ytDonlodMp4(url)
      .then((result) => {
        res.json({
          status: true,
          code: 200,
          creator: `${creator}`,
          result
        })
      })
      .catch(e => {
        res.json(loghandler.invalidlink)
      });
  } else {
    res.json(loghandler.invalidKey)
  }
});

router.get('/download/tiktok', async (req, res, next) => {
  const apikey = req.query.apikey;
  const url = req.query.url;

  if (!url) return res.json(loghandler.noturl)
  if (!apikey) return res.json(loghandler.notparam)

  if (listkey.includes(apikey)) {
    fetch(encodeURI(`https://aemt.me/download/tiktokdl?url=${url}`))
      .then(response => response.json())
      .then(hasil => {

        var result = hasil.result;
        res.json({
          status: true,
          creator: `${creator}`,
          result
        })
      })
      .catch(e => {
        res.json(loghandler.invalidlink)
      })
  } else {
    res.json(loghandler.invalidKey)
  }
})

router.get('/download/ig', async (req, res, next) => {
  const apikey = req.query.apikey;
  const url = req.query.url;

  if (!url) return res.json(loghandler.noturl)
  if (!apikey) return res.json(loghandler.notparam)

  if (listkey.includes(apikey)) {
    fetch(encodeURI(`https://aemt.me/download/igdl?url=${url}`))
      .then(response => response.json())
      .then(hasil => {
        var result = hasil.result
        res.json({
          status: true,
          creator: `${creator}`,
          result

        })
      })
      .catch(e => {
        res.json(loghandler.invalidlink)
      })
  } else {
    res.json(loghandler.invalidKey)
  }
})

router.get('/downloader/facebook', async (req, res, next) => {
  const apikey = req.query.apikey;
  const url = req.query.url;

  if (!url) return res.json(loghandler.notquery)
  if (!apikey) return res.json(loghandler.notparam)

  if (listkey.includes(apikey)) {
    fetch(encodeURI(`https://aemt.me/download/fbdl?url=${url}`))
      .then(response => response.json())
      .then(hasil => {

        var result = hasil.result;
        res.json({
          status: true,
          creator: `${creator}`,
          result
        })
      })
      .catch(e => {
        res.json(loghandler.invalidlink)
      })
  } else {
    res.json(loghandler.invalidKey)
  }
})

//stalk media
router.get('/stalk/tiktok', async (req, res, next) => {
  const apikey = req.query.apikey;
  const username = req.query.username;

  if (!username) return res.json(loghandler.notusername)
  if (!apikey) return res.json(loghandler.notparam)

  if (listkey.includes(apikey)) {
    fetch(encodeURI(`https://aemt.me/download/tiktokstalk?username=${username}`))
      .then(response => response.json())
      .then(hasil => {

        var result = hasil.result;
        res.json({
          status: true,
          creator: `${creator}`,
          result
        })
      })
      .catch(e => {
        res.json({
          status: false,
          creator: `${creator}`,
          message: "error, mungkin username tidak valid"
        })
      })
  } else {
    res.json(loghandler.invalidKey)
  }
})

router.get('/stalk/ig', async (req, res, next) => {
  const apikey = req.query.apikey;
  const username = req.query.username;

  if (!username) return res.json(loghandler.notusername)
  if (!apikey) return res.json(loghandler.notparam)

  if (listkey.includes(apikey)) {
    fetch(encodeURI(`https://aemt.me/download/igstalk?username=${username}`))
      .then(response => response.json())
      .then(hasil => {

        var result = hasil.result;
        res.json({
          status: true,
          creator: `${creator}`,
          result
        })
      })
      .catch(e => {
        res.json(loghandler.error)
      })
  } else {
    res.json(loghandler.invalidKey)
  }
})

router.get('/stalk/npm', async (req, res, next) => {
  var Apikey = req.query.apikey,
    query = req.query.query

  if (!Apikey) return res.json(loghandler.notparam)
  if (listkey.includes(Apikey)) {
    if (!query) return res.json({ status: false, creator: `${creator}`, message: "masukan parameter query" })

    fetch(encodeURI(`https://registry.npmjs.org/${query}`))
      .then(response => response.json())
      .then(data => {
        var result = data;
        res.json({
          status: true,
          creator: `${creator}`,
          result
        })
      })
      .catch(e => {
        res.json(loghandler.error)
      })
  } else {
    res.json(loghandler.invalidKey)
  }
})

//search media
router.get('/search/jarak', async (req, res, next) => {
  var Apikey = req.query.apikey,
    dari = req.query.dari,
    ke = req.query.ke

  if (!Apikey) return res.json(loghandler.notparam)
  if (listkey.includes(Apikey)) {
    if (!dari) return res.json({ status: false, creator: `${creator}`, message: "masukan parameter dari" })
    if (!ke) return res.json({ status: false, creator: `${creator}`, message: "masukan parameter ke" })

    fetch(encodeURI(`https://aemt.me/jarak?dari=${dari}&ke=${ke}`))
      .then(response => response.json())
      .then(data => {
        var result = data.url;
        res.json({
          status: true,
          creator: `${creator}`,
          result
        })
      })
      .catch(e => {
        res.json(loghandler.error)
      })
  } else {
    res.json(loghandler.invalidKey)
  }
})

router.get('/search/pinterest', async (req, res, next) => {
  const apikey = req.query.apikey;
  const query = req.query.query;

  if (!query) return res.json(loghandler.notquery)
  if (!apikey) return res.json(loghandler.notparam)

  if (listkey.includes(apikey)) {
    fetch(encodeURI(`https://aemt.me/pinterest?query=${query}`))
      .then(response => response.json())
      .then(hasil => {

        var result = hasil.result;
        res.json({
          status: true,
          creator: `${creator}`,
          result
        })
      })
      .catch(e => {
        res.json(loghandler.error)
      })
  } else {
    res.json(loghandler.invalidKey)
  }
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Islamic  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

router.get('/muslim/asmaulhusna', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (listkey.includes(Apikey)) {

    const result = JSON.parse(fs.readFileSync(__path + '/data/AsmaulHusna.json'));
    res.json({
      status: true,
      creator: `${creator}`,
      result
    })
  } else {
    res.json(loghandler.invalidKey)
  }
})

router.get('/muslim/jadwalshalat', async (req, res, next) => {
  const kota = req.query.kota;
  const apikey = req.query.apikey;

  if (!kota) return res.json({ status: false, creator: `${creator}`, message: "masukan parameter kota" })
  if (!apikey) return res.json(loghandler.notparam)
  if (listkey.includes(apikey)) {
    jadwalsholat(kota)
      .then((result) => {
        res.json({
          status: true,
          code: 200,
          creator: `${creator}`,
          result
        })
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    res.json(loghandler.invalidKey)
  }
});

router.get('/muslim/hadits', async (req, res, next) => {
  var Apikey = req.query.apikey,
    kitab = req.query.kitab,
    nomor = req.query.nomor
  if (!Apikey) return res.json(loghandler.notparam)
  if (listkey.includes(Apikey)) {
    if (!kitab) return res.json({ status: false, creator: `${creator}`, message: "masukan parameter kitab" })
    if (!nomor) return res.json({ status: false, creator: `${creator}`, message: "masukan parameter nomor" })

    fetch(encodeURI(`https://hadits-api-zhirrr.vercel.app/books/${kitab}/${nomor}`))
      .then(response => response.json())
      .then(data => {
        var result = data.data;
        res.json({
          status: true,
          code: 200,
          creator: `${creator}`,
          result
        })
      })
      .catch(e => {
        res.json(loghandler.error)
      })
  } else {
    res.json(loghandler.invalidKey)
  }
})

router.get('/muslim/quran', async (req, res, next) => {
  var Apikey = req.query.apikey,
    surah = req.query.surah,
    ayat = req.query.ayat

  if (!Apikey) return res.json(loghandler.notparam)
  if (listkey.includes(Apikey)) {
    if (!surah) return res.json({ status: false, creator: `${creator}`, message: "masukan parameter surah" })
    if (!ayat) return res.json({ status: false, creator: `${creator}`, message: "masukan parameter ayat" })

    fetch(encodeURI(`https://alquran-apiii.vercel.app/surah/${surah}/${ayat}`))
      .then(response => response.json())
      .then(data => {
        var result = data.data;
        res.json({
          status: true,
          code: 200,
          creator: `${creator}`,
          result
        })
      })
      .catch(e => {
        res.json(loghandler.error)
      })
  } else {
    res.json(loghandler.invalidKey)
  }
})

router.get('/muslim/kisahnabi', async (req, res, next) => {
  var nabi = req.query.nabi,
    Apikey = req.query.apikey;

  if (!Apikey) return res.json(loghandler.notparam)
  if (listkey.includes(Apikey)) {
    Searchnabi(nabi)
      .then(result => {
        res.json({
          status: true,
          code: 200,
          creator: `${creator}`,
          result
        })
      })
      .catch(e => {
        res.json(loghandler.error)
      })
  } else {
    res.json(loghandler.invalidKey)
  }
})

router.get('/muslim/tahlil', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (listkey.includes(Apikey)) {

    fetch(encodeURI(`https://islamic-api-zhirrr.vercel.app/api/tahlil`))
      .then(response => response.json())
      .then(data => {
        var result = data.data;
        res.json({
          status: true,
          code: 200,
          creator: `${creator}`,
          result
        })
      })
      .catch(e => {
        res.json(loghandler.error)
      })
  } else {
    res.json(loghandler.invalidKey)
  }
})

router.get('/muslim/ayatkursi', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (listkey.includes(Apikey)) {

    fetch(encodeURI(`https://islamic-api-zhirrr.vercel.app/api/ayatkursi`))
      .then(response => response.json())
      .then(data => {
        var result = data.data;
        res.json({
          status: true,
          code: 200,
          creator: `${creator}`,
          result
        })
      })
      .catch(e => {
        res.json(loghandler.error)
      })
  } else {
    res.json(loghandler.invalidKey)
  }
})

router.get('/muslim/doaharian', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (listkey.includes(Apikey)) {

    fetch(encodeURI(`https://islamic-api-zhirrr.vercel.app/api/doaharian`))
      .then(response => response.json())
      .then(data => {
        var result = data.data;
        res.json({
          status: true,
          code: 200,
          creator: `${creator}`,
          result
        })
      })
      .catch(e => {
        res.json(loghandler.error)
      })
  } else {
    res.json(loghandler.invalidKey)
  }
})

router.get('/muslim/niatshalat', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (listkey.includes(Apikey)) {

    fetch(encodeURI(`https://islamic-api-zhirrr.vercel.app/api/niatshalat`))
      .then(response => response.json())
      .then(data => {
        var result = data;
        res.json({
          status: true,
          code: 200,
          creator: `${creator}`,
          result
        })
      })
      .catch(e => {
        res.json(loghandler.error)
      })
  } else {
    res.json(loghandler.invalidKey)
  }
})

router.get('/muslim/bacaanshalat', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (listkey.includes(Apikey)) {

    fetch(encodeURI(`https://islamic-api-zhirrr.vercel.app/api/bacaanshalat`))
      .then(response => response.json())
      .then(data => {
        var result = data;
        res.json({
          status: true,
          code: 200,
          creator: `${creator}`,
          result
        })
      })
      .catch(e => {
        res.json(loghandler.error)
      })
  } else {
    res.json(loghandler.invalidKey)
  }
})
//―――――――――――――――――――――――――――――――――――――――――― ┏  Random Image  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\
router.get('/wallpaper/aesthetic', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (listkey.includes(Apikey)) {
    try {
      var img = JSON.parse(fs.readFileSync(__path + '/data/aesthetic.json'))
      var result = img[~~(Math.random() * img.length)]
      var data = await fth(result).then(v => v.buffer())
      await fs.writeFileSync(__path + '/tmp/wallpaper.png', data)
      res.sendFile(__path + '/tmp/wallpaper.png')
    } catch (error) {
      res.json(loghandler.error)
    }
  } else {
    res.json(loghandler.invalidKey)
  }
})
router.get('/wallpaper/ciberspace', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (listkey.includes(Apikey)) {
    try {
      var img = JSON.parse(fs.readFileSync(__path + '/data/CyberSpace.json'))
      var result = img[~~(Math.random() * img.length)]
      var data = await fth(result).then(v => v.buffer())
      await fs.writeFileSync(__path + '/tmp/wallpaper.png', data)
      res.sendFile(__path + '/tmp/wallpaper.png')
    } catch (error) {
      res.json(loghandler.error)
    }
  } else {
    res.json(loghandler.invalidKey)
  }
})

router.get('/wallpaper/game', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (listkey.includes(Apikey)) {
    try {
      var img = JSON.parse(fs.readFileSync(__path + '/data/GameWallp.json'))
      var result = img[~~(Math.random() * img.length)]
      var data = await fth(result).then(v => v.buffer())
      await fs.writeFileSync(__path + '/tmp/wallpaper.png', data)
      res.sendFile(__path + '/tmp/wallpaper.png')
    } catch (error) {
      res.json(loghandler.error)
    }
  } else {
    res.json(loghandler.invalidKey)
  }
})

router.get('/wallpaper/programming', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (listkey.includes(Apikey)) {
    try {
      var img = JSON.parse(fs.readFileSync(__path + '/data/Programming.json'))
      var result = img[~~(Math.random() * img.length)]
      var data = await fth(result).then(v => v.buffer())
      await fs.writeFileSync(__path + '/tmp/wallpaper.png', data)
      res.sendFile(__path + '/tmp/wallpaper.png')
    } catch (error) {
      res.json(loghandler.error)
    }
  } else {
    res.json(loghandler.invalidKey)
  }
})

router.get('/wallpaper/moutain', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (listkey.includes(Apikey)) {
    try { 
      var img = JSON.parse(fs.readFileSync(__path + '/data/Mountain.json'))
      var result = img[~~(Math.random() * img.length)]
      var data = await fth(result).then(v => v.buffer())
      await fs.writeFileSync(__path + '/tmp/wallpaper.png', data)
      res.sendFile(__path + '/tmp/wallpaper.png')
    } catch (error) {
      res.json(loghandler.error)
    }
  } else {
    res.json(loghandler.invalidKey)
  }
})
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