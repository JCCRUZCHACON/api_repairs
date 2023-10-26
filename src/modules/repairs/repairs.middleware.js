import { catchAsync } from '../../errors/catchAsync.js';
import { RepairService } from './repairs.service.js';

const repairService = new RepairService();

export const validRepair = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;

    const repair = await repairService.findOne(id);

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'user not found',
      });
    }
    req.repair = repair;
    next();
    
  } catch (error) {
    return res.status(500).json(error);
  }
})
