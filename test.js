const user = new UserModel({
    email, password
})
const account = await user.save()