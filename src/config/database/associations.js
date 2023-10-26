import Repair from '../../modules/repairs/repairs.model.js';
import User from '../../users/user.model.js';


export const initModel = () => {
  User.hasMany(Repair, { foreignKey: 'userId', as: 'userCreateRepair' })
  Repair.belongsTo(User, { foreignKey: 'userId' })

 }