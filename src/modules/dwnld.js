const puppeter = require('puppeteer')
const path = require('path')

async function DownloadIMG(imgBs64){
    const nombre = Math.random().toString(36).slice(2)

    const browser = await puppeter.launch();
    const page = await browser.newPage();
    
    await page.goto('data:image/jpeg;base64,' + imgBs64)
    await page.screenshot({path: path.join(__dirname, '../Imgs/' + nombre) + '.png'})

    await browser.close()
}
exports.DownloadIMG = DownloadIMG