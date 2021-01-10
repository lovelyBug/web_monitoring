var fs = require('fs');

fs.writeFile('./config/db.js', "", (err) => {
    if (err) throw err;
    console.log("数据库配置文件清理完成！");
    fs.readFile('./config/db_local.js', function(err, data){
        let newString = data.toString();
        fs.writeFile('./config/db.js', newString, (err) => {
            if (err) throw err;
            console.log("数据库配置重写完成！");
        });
    })
});
