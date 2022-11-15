const User = require("../model/users.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtSecret = require("./secret.js")


exports.register = async (req, res, next) =>{
    const {username, password} = req.body
    if(password.length < 6){
        return res.status(400).json({message: "Password cannot be less an 6 characters"})
    }
    try{
        bcrypt.hash(password, 10).then(async (hash) =>{
        await User.create({username, password: hash})
        })
        .then(function(user){
            //Generate a token using id, username and expiry time (No sensitive info)
            const maxAge = 20 * 60 //20 minutes in seconds
            const token = jwt.sign(
                {id: user._id, username, role: user.role}, jwtSecret, { expiresIn: maxAge }
            )
            //Token is passed down to client as a cookie
            res.cookie("jwt", token,{
                httpOnly: true,
                maxAge: maxAge * 1000 //20 minutes in ms
            })
            res.status(201).json({
                message: "User successfully created.",
                user: user._id
            })
        })
        
    }catch(error){
        res.status(401).json({message: "User failed to create.", error: error.message})
    }

}

exports.login = async (req, res, next) =>{
    const {username, password} = req.body
    if(!username || !password){
        return res.status(400).json({message: "Username or password not found"})
    }
    try{
        const user = await User.findOne({username})
        if(!user){
            return res.status(401).json({message: "User not found."})
        }
        else{
            bcrypt.compare(password, user.password).then(function(result){
                if(result){
                    const maxAge = 20 * 60 //20 minutes in seconds
                    const token = jwt.sign({
                        id: user._id, username, role: user.role
                    }, jwtSecret, { expiresIn: maxAge})
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000 //20 minutes in ms
                    })
                    res.status(201).json({
                        message: "User logged in successfully",
                        user: user._id
                    })
                }else{
                    res.status(400).json({
                        message: "User login failed"
                    })
                }
            })
        }
    }catch(error){
        return res.status(500).json({message: "An error occured", error: error.message})
    }
}

exports.update = async (req, res, next)=>{
    const { role, id } = req.body
    if(role && id ){
        if(role === "admin"){
            await User.findById(id)
            .then(user=>{
                if(user.role !== "admin"){
                    user.role = role
                    user.save(err=>{
                        if(err){
                            res.status(400).json({message: "An error occured", error: error.message})
                            process.exit(1)
                        }
                        res.status(201).json({
                            message: "Update successful", user
                        })
                    })
                }else{
                    res.status(400).json({
                        message: "User is already an Admin"
                    })
                }
            })
        }else{
            res.status(400).json({
                message: "User is not an admin."
            })
        }
    }else{
        res.status(400).json({
            message: "Role or ID is not present."
        })
    }
}

exports.deleteUser = async (req, res, next) =>{
    const {id} = req.body
    await User.findById(id)
    .then(user => user.remove())
    .then(user => res.status(201).json({
        message: "User has been successfully deleted", user
    }))
    .catch(error =>{
        res.status(400).json({message: "An error has occured", error: error.message})
        
})}

exports.adminAuth = (req, res ,next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, jwtSecret, (err, decodedToken) =>{
            if(err){
                res.status(401).json({
                    message: "Not authorized."
                })
            }else{
                if (decodedToken.role !== "admin"){
                    return res.status(401).json({
                        message: "Unauthorized user."
                    })
                } else{
                    next()
                }
            }
        })
    }else{
        return res.status(400).json({
            message: "Not authorized, token not found"
        })
    }
}

exports.userAuth = (req, res ,next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, jwtSecret, (err, decodedToken) =>{
            if(err){
                res.status(401).json({
                    message: "Not authorized."
                })
            }else{
                if (decodedToken.role !== "Basic"){
                    return res.status(401).json({
                        message: "Unauthorized user."
                    })
                } else{
                    next()
                }
            }
        })
    }else{
        return res.status(400).json({
            message: "Not authorized, token not found"
        })
    }
}

exports.getUsers = async(req, res) =>{
    await User.find({})
    .then(users=>{
        const userFunction = users.map(user=>{
            const container = {}
            container.username = user.username
            container.role = user.role
            return container
        })
        res.status(200).json({user: userFunction})
    })
    .catch(err =>
        res.status(401).json({message: "Not successful", error: err.message})
        )
}

