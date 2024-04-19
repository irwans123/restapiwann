const fs = require('fs');
const path = require('path');

const __path = process.cwd();

async function Searchnabi(nabi) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__path, `/data/kisahNabi/${nabi}.json`), (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        const scraper = JSON.parse(data);
        const result = {
          name: scraper.name,
          kelahiran: scraper.thn_kelahiran + ' sebelum masehi',
          wafat_usia: scraper.usia + ' tahun',
          singgah: scraper.tmp,
          thumb: scraper.img_url,
          kisah: scraper.description
        };
        resolve(result);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

module.exports = { Searchnabi };
