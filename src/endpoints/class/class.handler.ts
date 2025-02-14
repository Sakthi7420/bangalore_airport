import {
    EndpointAuthType,
    EndpointHandler,
    EndpointRequestType
  } from 'node-server-engine';
  import { Class, Audit, CourseAssignment } from 'db';
  import { Response } from 'express';
  import {
    CLASS_NOT_FOUND,
    CLASS_CREATION_ERROR,
    CLASS_UPDATE_ERROR,
    CLASS_DELETION_ERROR,
    CLASS_GET_ERROR
  } from './class.const';
  import { Module } from 'db';
  
  // Get all classes
  export const getClassHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
  ): Promise<void> => {
    try {
      const classes = await Class.findAll({
        include: [
          {
            model: CourseAssignment,
            as: 'courseAssignments',
            attributes: ['id', 'courseAssignmentQuestionName']
          },
          {
            model: Module,
            as: 'module', // Ensure this matches the alias in the model association
            attributes: ['id','courseId','moduleName', 'moduleDescription', 'sequence'],
          },
        ]
      });
  
      if (classes.length === 0) {
        res.status(404).json({ message: CLASS_NOT_FOUND });
        return;
      }
  
      res.status(200).json({ classes });
    } catch (error) {
      res.status(500).json({ message: CLASS_GET_ERROR, error });
    }
  };
  
  // Create class
  export const createClassHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
  ): Promise<void> => {
    const { user } = req;
    const { classTitle, classDescription, classRecordedLink, assignmentId, moduleId, classDate, materialForClass } = req.body;
  
  
    try {
      const newClass = await Class.create({
        classTitle,
        classDescription,
        classRecordedLink,
        assignmentId,
        moduleId,
        classDate,
        materialForClass
      });
  
      await Audit.create({
        entityType: 'Class',
        entityId: newClass.id,
        action: 'CREATE',
        newData: newClass,
        performedBy: user?.id
      });
  
      res.status(201).json({ message: 'Class created successfully', newClass });
    } catch (error) {
      res.status(500).json({ message: CLASS_CREATION_ERROR, error });
    }
  };
  
  // Get class by ID
  export const getClassByIdHandler: EndpointHandler<
    EndpointAuthType.JWT
  > = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
  
    try {
      const classData = await Class.findByPk(id, {
        include: [
          {
            model: CourseAssignment,
            as: 'courseAssignments',
            attributes: ['id', 'courseAssignmentQuestionName']
          },
          {
            model: Module,
            as: 'module', // Ensure this matches the alias in the model association
            attributes: ['id','courseId','moduleName', 'moduleDescription', 'sequence'],
          },
        ]
      });
  
      if (!classData) {
        res.status(404).json({ message: CLASS_NOT_FOUND });
        return;
      }
  
      res.status(200).json({ classData });
    } catch (error) {
      res.status(500).json({ message: CLASS_GET_ERROR, error });
    }
  };
  
  
  // Get class by ModuleId
  export const getClassByModuleIdHandler: EndpointHandler<
    EndpointAuthType.JWT
  > = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
  
    try {
      const classData = await Class.findAll({
        where: { moduleId: id }, // Match the specific moduleId
        include: [
          {
            model: CourseAssignment,
            as: 'courseAssignments',
            attributes: ['id', 'courseAssignmentQuestionName']
          },
          {
            model: Module,
            as: 'module', // Ensure this matches the alias in the model association
            attributes: ['id','courseId','moduleName', 'moduleDescription', 'sequence'],
          },
        ]
      });
  
      if (!classData) {
        res.status(404).json({ message: CLASS_NOT_FOUND });
        return;
      }
  
      res.status(200).json({ classData });
    } catch (error) {
      res.status(500).json({ message: CLASS_GET_ERROR, error });
    }
  };
  
  // Update class
  export const updateClassHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    const { user } = req;
    const { classTitle, classDescription, classRecordedLink, assignmentId, moduleId, classDate, materialForClass } = req.body;
  
    try {
      const classData = await Class.findByPk(id);
  
      if (!classData) {
        res.status(404).json({ message: CLASS_NOT_FOUND });
        return;
      }
  
      classData.set({
        classTitle,
        classDescription,
        classRecordedLink,
        assignmentId,
        moduleId,
        classDate,
        materialForClass
      });
  
      await classData.save();
  
      await Audit.create({
        entityType: 'Class',
        entityId: classData.id,
        action: 'UPDATE',
        newData: classData,
        performedBy: user?.id
      });
  
      res.status(200).json({ message: 'Class updated successfully', classData });
    } catch (error) {
      res.status(500).json({ message: CLASS_UPDATE_ERROR, error });
    }
  };
  
  // Delete class
  export const deleteClassHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    const { user } = req;
  
    try {
      const classData = await Class.findByPk(id);
  
      if (!classData) {
        res.status(404).json({ message: CLASS_NOT_FOUND });
        return;
      }
  
      await Audit.create({
        entityType: 'Class',
        entityId: classData.id,
        action: 'DELETE',
        oldData: classData,
        performedBy: user?.id
      });
  
      await classData.destroy();
      res.status(200).json({ message: 'Class deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: CLASS_DELETION_ERROR, error });
    }
  };