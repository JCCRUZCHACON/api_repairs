import { UserService } from './user.service.js';
import { encryptedPassword, verifyPassword } from "../../config/plugins/encripted-password.plugin.js"
import generateJWT from "../../config/plugins/generate-jwt.plugin.js"
import { catchAsync } from "../../errors/index.js"
import { validateLogin, validateRegister } from "./user.schema.js"

const userService = new UserService();

export const findAllUsers = async (req, res, next) => {
  try {
    const users = await userService.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const createUser = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const findOneUser = (req, res, next) => {
  try {
    const { user } = req;
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const { email, name} = req.body
    const { user } =req
    
    await userService.update(user, {email, name})

    return res.status(200).json(({
      message: 'user has been updated'

    }))
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const { user } = req;
    await userService.delete(user);
    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).json(error);
  }
};


export const login = catchAsync(async(req, res, next) => {
  const { hasError, errorMessages, userData } = validateLogin(req.body)
  
  if(hasError){
    return res.status(422).json({
      status: 'error',
      message: errorMessages
    })
  }

  //1. validar que el usuario exista en base de datos
  const user = await userService.findOneUserByEmail(userData.email)

  if(!user){
    return next(new AppError('This account does not exist', 404))
  }

  const isCorrectPassword = await verifyPassword(
    userData.password,
    user.password
  )
  //2 validar la contraseña si es correcta
  if(!isCorrectPassword){
    return next(new AppError('Incorrect email or password', 401))
  }
  //3 generar el token
  const token = await generateJWT(user.id)
  //4. enviar la respuesta al cliente
  return res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      status:user.status,
    }
  })
  

})

export const register = catchAsync(async(req, res, next) => {
    const { hasError, errorMessages, userData } = validateRegister(req.body);

    if(hasError){
      return res.status(422).json({
        status: 'error',
        message: errorMessages
      })
    }

    const user = await userService.createUser(userData)

    const token = await generateJWT(user.id)

    return res.status(201).json({
      token,
      user: {
        id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      status:user.status,
      }
    })
})

export const changePassword = catchAsync(async(req, res, next) => {
  //1. traerme el usuario
  const { sessionUser } = req;

  //2. traerme los datos de la req.body
  const { currentPassword, newPassword } = req.body;

  //3. validar si la contraseña actual y la nueva son iguales, si es asi enviar un error
  if( currentPassword === newPassword ){
    return next(new AppError('The password cannot be equals', 400))
  }

  //4. validar si la contraseña actual es igual a la contraseña en base de datos
  const isCorrectPassword = await verifyPassword(
    currentPassword,
    sessionUser.password
  )
 
  if(!isCorrectPassword){
    return next(new AppError('Incorrect email or password', 401))
  }

  //5. encriptar la nueva contraseña
  const hashedNewPassword = await encryptedPassword(newPassword)

  await userService.updateUser(sessionUser, {
    password: hashedNewPassword,
    chagedPasswordAt: new Date(),
  })

  return res.status(200).json({
    message: 'The user password was updated successfully'
  })
})

export const deleteAccount = catchAsync(async(req, res, next) => {
  const { user } = req;
  
  await userService.deleteUser(user)

  res.status(204).json(null)
})