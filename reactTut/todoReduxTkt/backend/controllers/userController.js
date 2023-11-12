const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const  {PrismaClient}  = require('@prisma/client');
const prisma = new PrismaClient();
const { signAccessToken } = require('../utils/jwt');
const authUser = asyncHandler(async (req, res) => {

});
const registerUser = asyncHandler(async (req, res) => {
    const input = req.body;
    if (!(input.name && input.email && input.password)) {
        res.status(400);
        throw new Error('Please fill out all fields');
    }
    
    // Check if user already exists
    const userExists =  await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      })
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const hashPwd = await bcrypt.hash(input.password, 10);
    console.log(hashPwd)
    const newUser = await prisma.user.create({
        data: { 
            name: input.name,
            email: input.email,
            password: hashPwd,
            todos: []
        }
    })
    console.log(newUser)
    if (newUser) {
        res.status(201).json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            token: await signAccessToken(newUser.id)
        })
    } else {
        res.status(400);
        throw new Error('Failed to create user');
    }
});

module.exports = { authUser, registerUser };