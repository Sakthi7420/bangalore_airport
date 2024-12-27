import {
    EndpointAuthType,
    EndpointHandler,
    EndpointRequestType,
  } from 'node-server-engine';
  import { Module, Course, User, Audit } from 'db';
  import { Response } from 'express';
  import {
    MODULE_NOT_FOUND,
    MODULE_CREATION_ERROR,
    MODULE_UPDATE_ERROR,
    MODULE_DELETION_ERROR,
    MODULE_GET_ERROR,
  } from './modules.const';
  
  export const getModulesHandler: EndpointHandler<EndpointAuthType> = async (
    req: EndpointRequestType[EndpointAuthType],
    res: Response
  ): Promise<void> => {
    try {
      const modules = await Module.findAll({
        include: [
          { model: Course, attributes: ['id', 'courseName'] },
          { model: User, as: 'creator', attributes: ['id', 'firstName', 'lastName'] },
          { model: User, as: 'updater', attributes: ['id', 'firstName', 'lastName'] },
        ],
      });
  
      if (!modules.length) {
        res.status(404).json({ message: MODULE_NOT_FOUND });
        return;
      }
  
      res.status(200).json({ modules });
    } catch (error) {
      res.status(500).json({ message: MODULE_GET_ERROR, error });
    }
  };
  
  export const createModuleHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
  ): Promise<void> => {
    const { courseId, moduleName, moduleDescription, createdBy } = req.body;
    let finalSequence;
  
    try {
      if (!courseId || !moduleName || !moduleDescription || !createdBy) {
        // Return a 400 error if any required fields are missing
        res.status(400).json({
          errorCode: 'invalid-request',
          message: 'Missing required fields',
        });
        return;
      }
  
      const course = await Course.findByPk(courseId);
      if (!course) {
        // Return a 404 error if the course does not exist
        res.status(404).json({ message: 'Course not found' });
        return;
      }
  
      const lastModule = await Module.findOne({
        where: { courseId },
        order: [['sequence', 'DESC']],
      });
      
      let finalSequence = 1; // Default value
      
      if (lastModule) {
        const lastSequence = lastModule.sequence;
        if (Number.isInteger(lastSequence)) {
          finalSequence = lastSequence + 1;
        }
      }
      
      console.log('Next sequence:', finalSequence);      
  
      // Create the new module
      const newModule = await Module.create({
        courseId,
        moduleName,
        moduleDescription,
        sequence: finalSequence, // Use the calculated sequence
        createdBy,
      });
  
      // Log the new module to check its values
      console.log('New module created:', newModule);
  
      // Log the creation in the Audit table
      await Audit.create({
        entityType: 'Module',
        entityId: newModule.id,
        action: 'CREATE',
        newData: newModule,
        performedBy: req.user?.id,
      });
  
      // Send a success response with the newly created module
      res.status(201).json({ message: 'Module created successfully', newModule });
    } catch (error) {
      // Log any errors and send a 500 response
      console.error(error); // Log the error for better debugging
      res.status(500).json({ message: MODULE_CREATION_ERROR, error });
    }
  };
  
  

  export const updateModuleHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    const { moduleName, moduleDescription, updatedBy } = req.body;
  
    try {
      const module = await Module.findByPk(id);
      if (!module) {
        res.status(404).json({ message: MODULE_NOT_FOUND });
        return;
      }
  
      const previousData = { ...module.toJSON() };
  
      module.set({
        moduleName,
        moduleDescription,
        updatedBy,
      });
  
      await module.save();
  
      await Audit.create({
        entityType: 'Module',
        entityId: module.id,
        action: 'UPDATE',
        oldData: previousData,
        newData: module,
        performedBy: req.user?.id,
      });
  
      res.status(200).json({ message: 'Module updated successfully', module });
    } catch (error) {
      res.status(500).json({ message: MODULE_UPDATE_ERROR, error });
    }
  };
  
  export const deleteModuleHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
  
    try {
      const module = await Module.findByPk(id);
      if (!module) {
        res.status(404).json({ message: MODULE_NOT_FOUND });
        return;
      }
  
      await Audit.create({
        entityType: 'Module',
        entityId: module.id,
        action: 'DELETE',
        oldData: module,
        performedBy: req.user?.id,
      });
  
      await module.destroy();
  
      res.status(200).json({ message: 'Module deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: MODULE_DELETION_ERROR, error });
    }
  };
  