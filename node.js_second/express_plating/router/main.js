module.exports = function(app, fs)
{

    app.get('/',function(req,res){
        // var mn = require("/../data/menu.json");// 이거 의심
        fs.readFile( __dirname + "/../data/" + "menu.json", function(err, data){
          res.render('index_plating', {
              "title": "Plating"
              "menus": JSON.parse(data)
          });
        });
    });

    app.locals.money="199999999 won";
    // 모든 메뉴 리스트를 출력하는 GET API(json 형태로.)
    //__dirname 은 현재 모듈의 위치를 나타냅니다. router 모듈은 router 폴더에 들어있으니, data 폴더에 접근하려면 /../ 를 앞부분에 붙여서 먼저 상위폴더로 접근해야합니다.
    app.get('/list', function(req, res){
        fs.readFile( __dirname + "/../data/" + "menu.json", 'utf8', function(err, data){
            console.log( data );
              res.end( data );
        });
    });

    // 특정 유저 menu의 디테일한 정보를 가져오는 GET API
    // GET/getMenu/:menuname
    app.get('/getMenu/:menuname', function(req, res){
        fs.readFile( __dirname + "/../data/menu.json", 'utf8', function(err, data){
            var menus = JSON.parse(data);//fs.readFile()로 파일을 읽었을 시엔 텍스트 형태로읽어지기 때문에, JSON.parse() 롤 해야합니다.
            console.log(menus[req.params.menuname]);
            res.json(menus[req.params.menuname]);
        });
    });


    app.post('/addMenu/:menuname', function(req, res){

        var result = {  };
        var menuname = req.params.menuname;

        // CHECK REQ VALIDITY
        if(!req.body["name"]||!req.body["price"]){
            result["success"] = 0;
            result["error"] = "invalid request";
            console.log(result);
            res.json(result);
            return;
        }

        // LOAD DATA & CHECK DUPLICATION
        fs.readFile( __dirname + "/../data/menu.json", 'utf8', function(err, data){
            var menus = JSON.parse(data);
            if(menus[menuname]){
                // DUPLICATION FOUND
                result["success"] = 0;
                result["error"] = "duplicate";
                console.log(result);
                res.json(result);
                return;
            }

            // ADD TO DATA
            menus[menuname] = req.body;

            // SAVE DATA
            fs.writeFile( __dirname + "/../data/menu.json",
                          JSON.stringify(menus, null, '\t'), "utf8", function(err, data){//stringify(users, null, 2) 은 JSON 의 pretty-print 를 위함 입니다.
                result = {"success": 1};
                console.log(result);
                res.json(result);
            });
        });
    });


    app.put('/updateMenu/:menuname', function(req, res){

        var result = {  };
        var menuname = req.params.menuname;

        // CHECK REQ VALIDITY
        if(!req.body["name"] || !req.body["price"]){
            result["success"] = 0;
            result["error"] = "invalid request";
            console.log(result);
            res.json(result);
            return
        }

        //LOAD DATA
        fs.readFile( __dirname + "/../data/menu.json", 'utf8', function(err, data){
            var menus = JSON.parse(data);
            // ADD/MODIFY DATA
            menus[menuname] = req.body;

            //SAVE DATA
            fs.writeFile( __dirname + "/../data/menu.json",
                          JSON.stringify(menus, null, '\t'), "utf8", function(err, data){
                result = {"success": 1};
                res.json(result);
            });
        });

    });


    app.delete('/deleteMenu/:menuname', function(req, res){
        var result = {  };
        //LOAD DATA
        fs.readFile( __dirname + "/../data/menu.json", "utf8", function(err, data){
            var menus = JSON.parse(data);

            // IF NOT FOUND
            if(!menus[req.params.menuname]){
                result["success"] = 0;
                result["error"] = "not found";
                console.log(result);
                res.json(result);
                return;
            }

            delete menus[req.params.menuname];
            fs.writeFile(__dirname + "/../data/menu.json",
                        JSON.stringify(menus, null, '\t'), "utf8", function(err, data){
                result["success"] = 1;
                console.log(result);
                res.json(result);
                return;
            });
        });
    });





























}
