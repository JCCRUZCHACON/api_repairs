import { RepairService } from './repairs.service.js';

const repairService = new RepairService();

export const findAllRepairs = async (req, res, next) => {
  try {
    const repairs = await repairService.findAll();
    return res.status(200).json(repairs);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const createRepair = async (req, res, next) => {
  try {
    const repair = await repairService.create(req.body);
    return res.status(201).json(repair);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const findOneRepairs = (req, res, next) => {
  try {
    const { repair } = req;
    return res.status(200).json(repair);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const updateRepair = async (req, res, next) => {
  try {
    const { repair } = req
    
    await repairService.update(repair)

    return res.status(200).json(({
      message: 'user has been updated'
    }))
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const deleteRepair = async (req, res, next) => {
  try {
    const { repair } = req;
    await repairService.delete(repair);
    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).json(error);
  }
};
