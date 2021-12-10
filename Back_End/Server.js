var express = require('express')
let Covid = require('./CovidSchema')
let mongodbConnected = require('./MongoDBConnect')
const cors = require('cors');


var app = express()
var bodyparser = require('body-parser');
const { RSA_PSS_SALTLEN_AUTO } = require('constants');
const { number } = require('prop-types');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))
app.use(express.json());

app.use(cors());
console.log("COVID", Covid)
app.get('/', function(req, res){

})

app.get('/about', function(req, res){
    res.send("mongodb express React and mongoose app, react runs in another app")
    Covid.countDocuments().exec()
    .then(count=>{
        console.log("Total documents count before addition: ", count)
    })
    .catch(err=> {
        console.error(err)
    })
})

app.get('/allcases', function(req, res){
    Covid.find(function(err, allcases){
        if(err){
            console.log(err);
        }else
        {
            res.json(allcases);
        }
    }).limit(20000);
});

app.post('/addcovid', function(req, res)
{
    console.log("From front end: ", req.body)
    let newcase = new Covid(req.body)
    console.log("newcase-> ", newcase)
    newcase.save()
    .then(todo => {
        res.status(200).json({'Covid':'case added sucessfully' + todo});
    })
    .catch(err => {
      res.status(400).send('adding new case failed' + err);
    })
});

app.post('/updatecase/', function(req, res){
    let updatecase = new Covid(req.body)
    console.log(updatecase)
    const filter = {
        state:updatecase.state, 
        county:updatecase.county
    }
    console.log("update: ", {state:updatecase.state, county:updatecase.county}, 'update->', updatecase)

    Covid.findOneAndUpdate(filter,{
        date:updatecase.date,
        county:updatecase.county,
        state:updatecase.state,
        cases:updatecase.cases,
        deaths:updatecase.deaths
    },
        (err, docs)=>{
            if (err){
                console.log(err)
            }else{
                res.status(200).json(docs);
                console.log("Old Doc: "+docs);
            }
        });
});

app.post('/DeleteCases/:state/:county', function(req, res){
   
    console.log("deleting")
    Covid.deleteOne({state:req.params.state, county:req.params.county }, function (err, result) {
        if (err)
            console.log(err);
        else{
            res.status(200).json(result.n);
            console.log(result.n);
        }
    })
})

app.get('/count/:state/:county', function(req,res){
    

    Covid.aggregate([
        {
                $match: {state: req.params.state, county:req.params.county}
        },
        {
            $group: { _id:null, cases:{$sum: "$cases"}, deaths:{$sum: "$deaths"}}
        }
    ],
     function(err, result){
        if(err){
            res.send(err);
            console.log(err);
        }else{
            res.json(result);
            console.log(result);
        }
    });
    
})

app.post('/casesgte/:num', function(req,res){
    var c = req.params.num;
    
    Covid.aggregate([
        {
            $group: { _id:{date:"$date", state:"$state"},cases:{$sum: "$cases"}}
        },
        {
            $project:{
                _id:1,
                cases:1,
                great:{$gt:["$cases", Number(c)]}
            }
        },
        {
            $match:{great:true}
        },
        {
            $project:{
                _id:0,
                state:"$_id.state",
                date:"$_id.date",
                cases:1

            }
        }
    ],
     function(err, result){
        if(err){
            res.send(err);
            console.log(err);
        }else{
            res.json(result);
            console.log(result);
        }
    });
})

app.get('/osinfo', function(req,res){
    const os = require('os')
    var cpu ={};
    cpu =[];
    var fin = {};
    fin = [];
    var netback = {};
    netback = [];
    
    cpu.push(os.cpus())
    console.log(netback)
    var net = {};
    net = os.networkInterfaces()
    console.log(net);

    if(net.Ethernet != null){
        var eth = [
            net.Ethernet[1].address,
            net.Ethernet[1].netmask,
            net.Ethernet[1].mac,
            net.Ethernet[0].address,
            net.Ethernet[0].netmask,
            net.Ethernet[0].mac
        ]
    }else{
        netback.push(os.networkInterfaces())
        var eth = ['NOT CONNECTED', 'NOT CONNECTED', 'NOT CONNECTED', 'NOT CONNECTED',
         'NOT CONNECTED', 'NOT CONNECTED' ]
    }

    console.log("Network information: ")
    console.log(eth)
    
    var info = {
        temporary_directory:os.tmpdir(),
        hostname:os.hostname(),
        platform:os.platform(),
        release:os.release(),
        uptime:((os.uptime()/3600).toFixed(2) + " hours"),
        username:os.userInfo().username,
        homedir:os.userInfo().homedir,
        total_memory:((os.totalmem()/1000000000).toFixed(2) + " GB"),
        free_memory:((os.freemem()/1000000000).toFixed(2) + " GB"),
        model:cpu[0][0].model,
        speed:cpu[0][0].speed,
        cores:cpu[0].length,
        phisical_cores:(cpu[0].length/2),
        ethernet_ipv4_address:eth[0],
        ethernet_ipv4_netmask:eth[1],
        ethernet_ipv4_mac:eth[2],
        ethernet_ipv6_address:eth[3],
        ethernet_ipv6_netmask:eth[4],
        ethernet_ipv6_mac:eth[5],
        netinfo:netback
    }
    
    fin.push(info);
    console.log("FINAL INFROMATION SENT TO API: ")
    console.log(fin)
    
    res.json(fin)

})

app.post('/twentycases', function(req,res){
    let findcase = new Covid(req.body)
    console.log(JSON.stringify(findcase));
    console.log(findcase.date + "  "+ findcase.state);
    

    Covid.find({date:findcase.date, state:findcase.state}, function(err, allcases){
        if(err){
            console.log(err);
        }else{
            if(allcases.length === 0){
            console.log('No data found -->' + null)
            res.json(null);
            }else{
            console.log(allcases)
            res.json(allcases);
            }
        }
    }).limit(20);
    
})

app.listen(5000, function(){
    console.log("server is running on the port 5000")
})