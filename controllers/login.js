//登录验证API
function longin(req,res) {
    console.log(req);
    res.addsomething = {
        auth:true
    }
    return res.json();
}

module.exports = longin;