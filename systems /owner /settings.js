     const chalk = require("chalk")
     const fs = require("fs")

     global.owner = ['6285279522326'] // ganti nomor lu

     let file = require.resolve(__filename)
     fs.watchFile(file, () => {
	 fs.unwatchFile(file)
	 console.log(chalk.redBright(`Update'${__filename}'`))
   	 delete require.cache[file]
	 require(file)
     })
