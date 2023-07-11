var register = require('../model/RegisterModel');

const user_register = async (req,res) => {

    var data = await register.find({"email":req.body.email});

    if(data.length == 0)
    {
        var data = await register.create(req.body);

        res.status(200).json({
            status:"Success",
            data
        })
    }
    else
    {
        res.status(200).json({
            status:"Your Email address is Already registered."
        })
    }
}

const user_login = async (req,res) => {

    var data = await register.find({"email":req.body.email});

    if(data.length == 1)
    {
        if(data[0].password==req.body.password)
        {
            res.status(200).json({
                status:"Success"
            })
        }
        else
        {
            res.status(200).json({
                status:"Check Password"
            })
        }
    }
    else if(data.length==0)
    {
        res.status(200).json({
            status:"Check your email"
        })
    }
    else if(data.length !=0)
    {
        res.status(200).json({
            status:"Find Multiple Account",
            data
        })
    }
}

module.exports = {
    user_register,
    user_login
}