import {
    EndpointAuthType,
    EndpointHandler,
    EndpointRequestType,
} from 'node-server-engine';
import { Module, Course, Audit } from 'db';
import { Response } from 'express';
import {
    MODULE_NOT_FOUND,
    MODULE_CREATION_ERROR,
    MODULE_UPDATE_ERROR,
    MODULE_DELETION_ERROR,
    MODULE_GET_ERROR,
    COURSE_NOT_FOUND
} from './modules.const';

export const getModulesHandler: EndpointHandler<EndpointAuthType> = async (
    req: EndpointRequestType[EndpointAuthType],
    res: Response
): Promise<void> => {
    try {
        const modules = await Module.findAll({
            include: [
                {
                    model: Course, as: 'course',
                    attributes:['id', 'courseName']
                }
            ]
        });

        res.status(200).json({ modules });
    } catch (error) {
        res.status(500).json({ message: MODULE_GET_ERROR, error });
    }
};

// export const createModuleHandler: EndpointHandler<EndpointAuthType.JWT> = async (
//     req: EndpointRequestType[EndpointAuthType.JWT],
//     res: Response
// ): Promise<void> => {

//     const { user } = req;
//     const { courseId, moduleName, moduleDescription, sequence } = req.body;


//     try {

//         const newModule = await Module.create({
//             courseId,
//             moduleName,
//             moduleDescription,
//             sequence,
//         });

//         // Log the action in the audit table
//         await Audit.create({
//             entityType: 'module',
//             entityId: newModule.id,
//             action: 'CREATE',
//             newData: newModule,
//             performedBy: user?.id,
//         });

//         res.status(201).json({ message: 'Module created successfully', newModule });
//     } catch(error) {
//         res.status(500).json({ message: MODULE_CREATION_ERROR, error });
//     }
// };

export const createModuleHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
  ): Promise<void> => {
    const { user } = req;
    const { courseId, moduleName, moduleDescription } = req.body; // Removed sequence from the payload
  
    try {
      // Get the highest sequence number for the given courseId
      const maxSequence = await Module.max('sequence', { where: { courseId } });
  
      // If no modules exist for this courseId, start from 1
      const nextSequence = (typeof maxSequence === 'number' ? maxSequence : 0) + 1;
  
      const newModule = await Module.create({
        courseId,
        moduleName,
        moduleDescription,
        sequence: nextSequence,
      });
  
      // Log the action in the audit table
      await Audit.create({
        entityType: 'module',
        entityId: newModule.id,
        action: 'CREATE',
        newData: newModule,
        performedBy: user?.id,
      });
  
      res.status(201).json({ message: 'Module created successfully', newModule });
    } catch (error) {
      console.error("Module creation error:", error);
      res.status(500).json({ message: MODULE_CREATION_ERROR, error });
    }
  };
  
//get by id
export const getModuleByIdHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { id } = req.params;

    try {

        const module = await Module.findByPk(id, {
            include: [
                {
                    model: Course, as: 'course',
                    attributes: ['id', 'courseName']
                }
            ]
        });

        if (!module) {
            res.status(404).json({ message: MODULE_NOT_FOUND })
            return;
        }

        res.status(200).json({ module });
    } catch (error) {
        res.status(500).json({ message: MODULE_GET_ERROR })
    }
};

//update module
export const updateModuleHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { id } = req.params;
    const { user } = req;
    const { courseId, moduleName, moduleDescription, sequence } = req.body;

    try {
        const updateModule = await Module.findByPk(id);
        if (!updateModule) {
            res.status(404).json({ message: MODULE_NOT_FOUND });
            return;
        }

        if (!courseId) {
            res.status(404).json({ message: COURSE_NOT_FOUND });
            return;
        }

        const previousData = { 
            courseId: updateModule.courseId,
            moduleName: updateModule.moduleName,
            moduleDescription: updateModule.moduleDescription,
            sequence: updateModule.sequence,
        };

        updateModule.set({
            courseId: courseId,
            moduleName: moduleName,
            moduleDescription: moduleDescription,
            sequence: sequence ?? updateModule.sequence
        });

        await Audit.create({
            entityType: 'Module',
            entityId: updateModule.id,
            action: 'UPDATE',
            oldData: previousData,
            newData: updateModule,
            performedBy: user?.id,
        });

        await updateModule.save();

        res.status(200).json({ message: 'Module updated successfully', updateModule });
    } catch (error) {
        res.status(500).json({ message: MODULE_UPDATE_ERROR, error });
    }
};

export const deleteModuleHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { user } = req;
    const { id } = req.params;

    try {
        const deleteModule = await Module.findByPk(id);
        if (!deleteModule) {
            res.status(404).json({ message: MODULE_NOT_FOUND });
            return;
        }

        await Audit.create({
            entityType: 'Module',
            entityId: deleteModule.id,
            action: 'DELETE',
            oldData: deleteModule,
            performedBy: user?.id,
        });

        await deleteModule.destroy();

        res.status(200).json({ message: 'Module deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: MODULE_DELETION_ERROR, error });
    }
};