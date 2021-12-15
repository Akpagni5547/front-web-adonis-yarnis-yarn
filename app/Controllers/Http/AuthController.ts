import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    console.log("object")
    const payload = await request.validate(UserValidator)
    await User.create(payload)
    response.redirect('/login')
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const users = request.only(['email', 'password'])
    await auth.attempt(users.email, users.password)
    response.redirect('/')
  }
}
