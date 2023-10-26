import { catchAsync } from '../../errors/catchAsync.js';
import { RepairService } from './repairs.service.js';


const repairService = new RepairService();

export const findAllRepairs = catchAsync(async (req, res, next) => {
  
    const repairs = await repairService.findAll();
    return res.status(200).json(repairs);
  })


export const createRepair = catchAsync(async (req, res, next) => {
  
    const repair = await repairService.create(req.body);
    return res.status(201).json(repair);
  
  })


export const findOneRepairs = catchAsync((req, res, next) => {
  
    const { repair } = req;
    return res.status(200).json(repair);
  })


export const updateRepair = catchAsync(async (req, res, next) => {
  
    const { repair } = req
    await repairService.update(repair)

    return res.status(200).json(({
      message: 'user has been updated'
    }))
})


export const deleteRepair = catchAsync(async (req, res, next) => {
  
    const { repair } = req;
    await repairService.delete(repair);
    return res.status(204).json(null);
  
  })
