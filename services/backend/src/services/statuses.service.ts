import { Request, Response } from 'express';
import { param, validationResult } from 'express-validator';
import { getRepository } from 'typeorm';
import MovieStatus from '@entities/MovieStatus';
import { StatusResponse } from '@shared/status';

const toStatusResponse = (status: MovieStatus): StatusResponse => ({
  order: status.order,
  id: status.id,
  displayName: status.displayName,
});

export const getAllStatuses = async (_req: Request, res: Response) => {
  const statusRepo = getRepository(MovieStatus);
  const statuses = await statusRepo.find();
  return res.status(200).json(statuses.map(toStatusResponse));
};

export const validateGetStatus = () => [param('statusId').isUUID()];

export const getStatus = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const statusRepo = getRepository(MovieStatus);
  const { statusId } = req.params;

  const status = await statusRepo.findOne(statusId);

  if (!status) {
    return res.status(404).json({
      errors: { message: `Could not find status with ID ${statusId}` },
    });
  }

  return res.status(200).json(toStatusResponse(status));
};
