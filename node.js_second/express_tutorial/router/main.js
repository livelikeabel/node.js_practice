module.exports = function(app, fs)
{

    app.get('/',function(req,res){
        res.render('index', {
            title: "MY HOMPAGE",
            length: 5
        });
    });

    // 모든 유저 리스트를 출력하는 GET API(json 형태로.)
    //__dirname 은 현재 모듈의 위치를 나타냅니다. router 모듈은 router 폴더에 들어있으니, data 폴더에 접근하려면 /../ 를 앞부분에 붙여서 먼저 상위폴더로 접근해야합니다.
    app.get('/list', function(req, res){
        fs.readFile( __dirname + "/../data/" + "user.json", 'utf8', function(err, data){
            console.log( data );
            res.end( data );
        });
    });

    // 특정 유저 username의 디테일한 정보를 가져오는 GET API
    // GET/getUser/:username
    app.get('/getUser/:username', function(req, res){
        fs.readFile( __dirname + "/../data/user.json", 'utf8', function(err, data){
            var users = JSON.parse(data);//fs.readFile()로 파일을 읽었을 시엔 텍스트 형태로읽어지기 때문에, JSON.parse() 롤 해야합니다.
            console.log(users[req.params.username]);
            res.json(users[req.params.username]);
        });
    });


    app.post('/addUser/:username', function(req, res){

        var result = {  };
        var username = req.params.username;

        // CHECK REQ VALIDITY
        if(!req.body["password"] || !req.body["name"]){
            result["success"] = 0;
            result["error"] = "invalid request";
            console.log(result);
            res.json(result);
            return;
        }

        // LOAD DATA & CHECK DUPLICATION
        fs.readFile( __dirname + "/../data/user.json", 'utf8', function(err, data){
            var users = JSON.parse(data);
            if(users[username]){
                // DUPLICATION FOUND
                result["success"] = 0;
                result["error"] = "duplicate";
                console.log(result);
                res.json(result);
                return;
            }

            // ADD TO DATA
            users[username] = req.body;

            // SAVE DATA //users를 덮어쓰는건가?
            fs.writeFile( __dirname + "/../data/user.json",
                          JSON.stringify(users, null, '\t'), "utf8", function(err, data){//stringify(users, null, 2) 은 JSON 의 pretty-print 를 위함 입니다.
                result = {"success": 1};
                console.log(result);
                res.json(result);
            });
        });
    });
























}
