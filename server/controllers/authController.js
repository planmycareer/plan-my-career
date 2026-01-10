import { registerUser, loginUser } from '../services/authService.js'

export const register = async (req, res, next) => {
  try {
    const { name, email, password, class: studentClass } = req.body
    const result = await registerUser({ name, email, password, class: studentClass })
    res.json({ success: true, token: result.token, user: result.user })
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const result = await loginUser({ email, password })
    res.json({ success: true, token: result.token, user: result.user })
  } catch (err) {
    next(err)
  }
}
