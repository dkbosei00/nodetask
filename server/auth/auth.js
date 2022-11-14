const User = require("../model/users.js")
const bcrypt = require("bcryptjs")



exports.register = async (req, res, next) =>{
    const {username, password} = req.body
    if(password.length < 6){
        return res.status(400).json({message: "Password cannot be less an 6 characters"})
    }
    try{
        bcrypt.hash(password, 10).then(async (hash) =>{
        await User.create({username, password: hash})
        })
        .then(user=>
            res.status(200).json({success: true, message: "User was successfully created.", user
        }))
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
                result ? res.status(200).json({message: "Login successful", user}) 
                : res.status(400).json({message: "Login was not successful"})
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
