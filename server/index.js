const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(cors());


app.use('/api/lyric', function (req, res) {
    let url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
    axios.get(url, {
        headers: {referer: 'https://c.y.qq.com', host: 'c.y.qq.com'},
        params: req.query
    }).then((response) => {
        let ret = response.data;
        if (typeof ret === 'string') {
            let reg = /^\w+\(({[^()]+})\)$/;

            let matches = ret.match(reg);

            if (matches) {
                ret = JSON.parse(matches[1])
            }
        } else {
            res.status(503).send('error')
        }
        res.json(ret)
    }).catch((e) => {
        console.log(e)
    })
});
app.use('/api/hotKey', function (req, res) {
    let url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
    axios.get(url, {
        headers: {referer: 'https://c.y.qq.com', host: 'c.y.qq.com'},
        params: req.query
    }).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })
});
app.use('/api/hot', function (req, res) {
    let param = ''
    let date = +new Date()
    let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?_' + date;
    switch (req.query.index) {
        case '0':
            param = {
                "ids": [4962990, 1889266, 8292, 476205, 1672450, 1248135, 4029059, 102654611, 106291312, 1032932, 105838893, 103048995, 200363210, 1293976, 158265],
                "types": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
            break;
        case '1':
            param = {
                "ids": [694646, 101147345, 95662, 1249935, 168793, 107541275, 190211, 168797, 492476, 189959, 469237, 7141122, 1314922, 184503, 1247462],
                "types": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
            break;
        case '2':
            param = {
                "ids": [1861642, 726188, 7072007, 109072253, 7035462, 102295959, 102873338, 5057872, 101804785, 5002691, 5002687, 102973296, 7198890, 101807228, 101806757],
                "types": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
            break;
        case '3':
            param = {
                "ids": [104903683, 201613665, 200913639, 200195551, 108654017, 107359012, 108748705, 108030909, 107960774, 106148089, 108964289, 108284581, 105561624, 107312816],
                "types": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
            break;
        case '4':
            param = {
                "ids": [104769200, 105564586, 1865641, 1770753, 7315288, 105477358, 1883828, 102335206, 739120, 4943082, 5037883, 1761010, 478068, 104384419, 105747880],
                "types": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
            break;
        case '5':
            param = {
                "ids": [1458215, 605652, 3039036, 605650, 2308585, 1458218, 605926, 425131, 425133, 425138, 425132, 2513565, 425135, 425136, 1458212],
                "types": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
            break;

    }
    axios.post(url, {
        req_0: {
            "module": "track_info.UniformRuleCtrlServer",
            "method": "GetTrackInfo",
            "param": param
        },
        "comm": {
            "g_tk": 5381, "uin": 0, "format": "json", "ct": 23, "cv": 0
        }
    }).then(response => {
        res.send(response.data)
    })
})
app.use('/api/hotSongGet', function (req, res) {
    let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
    axios.get(url, {
        headers: {
            referer: 'https://y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then(responese => {
        res.status(200).json(responese.data)
    })
})
app.listen(8080, () => {
    console.log('server run')
});

