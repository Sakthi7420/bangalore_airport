import {
  EndpointAuthType,
  EndpointHandler,
  EndpointRequestType
} from 'node-server-engine';

import {
  JOB_BOARD_NOT_FOUND,
  JOB_BOARD_CREATION_ERROR,
  JOB_BOARD_UPDATE_ERROR,
  JOB_BOARD_DELETION_ERROR,
  JOB_BOARD_GET_ERROR,
  COMPANYINFO_NOT_FOUND
} from './jobBoard.const';

import { JobBoard, CompanyInfo, Audit } from 'db';
import { Response } from 'express';

export const getAllJobBoardHandler: EndpointHandler<EndpointAuthType> = async (
  req: EndpointRequestType[EndpointAuthType],
  res: Response
): Promise<void> => {
  try {
    const jobBoard = await JobBoard.findAll({
      include: [
        {
          model: CompanyInfo,
          as: 'companyInfo',
          attributes: ['id', 'companyName', 'companyImg']
        }
      ]
    });

    if (jobBoard.length === 0) {
      res.status(404).json({ message: JOB_BOARD_NOT_FOUND });
      return;
    }

    res.status(200).json({ jobBoard });
  } catch (error) {
    res.status(500).json({ message: JOB_BOARD_GET_ERROR, error });
  }
};

// Create a new job board
export const createJobBoardHandler: EndpointHandler<
  EndpointAuthType.JWT
> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  const { user } = req;
  const {
    companyId,
    jobRole,
    jobRoleDesc,
    jobType,
    jobLocation,
    experience,
    salary,
    jobLink
  } = req.body;

  try {
    const jobBoard = await CompanyInfo.findByPk(companyId);

    if (!jobBoard) {
      res.status(404).json({ message: COMPANYINFO_NOT_FOUND });
      return;
    }

    // Create the JobBoard
    const newJobBoard = await JobBoard.create({
      companyId,
      jobRole,
      jobRoleDesc,
      jobType,
      jobLocation,
      experience,
      salary,
      jobLink
    });

    await Audit.create({
      entityType: 'JobBoard',
      entityId: newJobBoard.id,
      action: 'CREATE',
      newData: newJobBoard,
      performedBy: user?.id
    });

    res
      .status(201)
      .json({ message: 'JobBoard created successfully', newJobBoard });
  } catch (error) {
    res.status(500).json({ message: JOB_BOARD_CREATION_ERROR, error });
  }
};

// Get a JobBoard by ID
export const getJobBoardByIdHandler: EndpointHandler<EndpointAuthType> = async (
  req: EndpointRequestType[EndpointAuthType],
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const jobBoard = await JobBoard.findByPk(id, {
      include: [
        {
          model: CompanyInfo,
          as: 'companyInfo',
          attributes: ['id', 'companyName', 'companyImg']
        }
      ]
    });

    if (!jobBoard) {
      res.status(404).json({ message: JOB_BOARD_NOT_FOUND });
      return;
    }

    res.status(200).json({ jobBoard });
  } catch (error) {
    res.status(500).json({ message: JOB_BOARD_GET_ERROR, error });
  }
};


export const getJobBoardByCompanyIdHandler: EndpointHandler<EndpointAuthType> = async (
  req: EndpointRequestType[EndpointAuthType],
  res: Response
): Promise<void> => {
  const { id } = req.params; // Expect a single companyId from the request params

  try {
    // Validate if companyId is provided
    if (!id) {
      res.status(400).json({ message: 'companyId is required' });
      return;
    }

    // Fetch the batch module schedule for the provided batchId
    const jobBoard = await JobBoard.findOne({
      where: { companyId: id }, // Match the specific batchId
      include: [
        {
          model: CompanyInfo,
          as: 'companyInfo',
          attributes: ['id', 'companyName', 'companyImg']
        }
      ]
    });

    if (!jobBoard) {
      res.status(404).json({ message: 'JobBoard not found for the given Company ID' });
      return;
    }

    res.status(200).json({ jobBoard });
  } catch (error) {
    console.error('Error fetching jobBoard:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a job board
export const updateJobBoardHandler: EndpointHandler<
  EndpointAuthType.JWT
> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { user } = req;
  const {
    companyId,
    jobRole,
    jobRoleDesc,
    jobType,
    jobLocation,
    experience,
    salary,
    jobLink
  } = req.body;

  try {
    const updateJobBoard = await JobBoard.findByPk(id);

    if (!updateJobBoard) {
      res.status(404).json({ message: JOB_BOARD_NOT_FOUND });
      return;
    }

    const companyInfo = await CompanyInfo.findByPk(companyId);
    if (!companyInfo) {
      res.status(404).json({ message: COMPANYINFO_NOT_FOUND });
      return;
    }

    const previousData = {
      companyId: updateJobBoard.companyId,
      jobRole: updateJobBoard.jobRole,
      jobRoleDesc: updateJobBoard.jobRoleDesc,
      jobType: updateJobBoard.jobType,
      jobLocation: updateJobBoard.jobLocation,
      experience: updateJobBoard.experience,
      salary: updateJobBoard.salary,
      jobLink: updateJobBoard.jobLink
    };

    updateJobBoard.set({
      companyId: companyId,
      jobRole: jobRole,
      jobRoleDesc: jobRoleDesc,
      jobType: jobType,
      jobLocation: jobLocation,
      experience: experience,
      salary: salary,
      jobLink: jobLink
    });

    await Audit.create({
      entityType: 'JobBoard',
      entityId: updateJobBoard.id,
      action: 'UPDATE',
      OldData: previousData,
      newData: updateJobBoard,
      performedBy: user?.id
    });

    await updateJobBoard.save();

    res
      .status(200)
      .json({ message: 'JobBoard updated successfully', updateJobBoard });
  } catch (error) {
    res.status(500).json({ message: JOB_BOARD_UPDATE_ERROR, error });
  }
};

// Delete a job board
export const deleteJobBoardHandler: EndpointHandler<
  EndpointAuthType.JWT
> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { user } = req;

  try {
    const deleteJobBoard = await JobBoard.findByPk(id);

    if (!deleteJobBoard) {
      res.status(404).json({ message: JOB_BOARD_NOT_FOUND });
      return;
    }

    await Audit.create({
      entityType: 'JobBoard',
      entityId: deleteJobBoard.id,
      action: 'DELETE',
      oldData: deleteJobBoard, // Old data before deletion
      performedBy: user?.id
    });

    await deleteJobBoard.destroy();

    res.status(200).json({ message: 'Job Board deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: JOB_BOARD_DELETION_ERROR, error });
  }
};
