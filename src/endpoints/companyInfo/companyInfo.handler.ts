import {
    EndpointAuthType,
    EndpointHandler,
    EndpointRequestType
} from 'node-server-engine';
import { CompanyInfo, Audit } from 'db';
import { Response } from 'express';
import { 
    COMPANYINFO_NOT_FOUND,
    COMPANYINFO_CREATION_ERROR,
    COMPANYINFO_UPDATE_ERROR,
    COMPANYINFO_DELETION_ERROR,
    COMPANYINFO_GET_ERROR
} from './companyInfo.const';


function isValidBase64(base64String: string): boolean {
    // Regular expression to check if the string is a valid base64 image string (with a data URI scheme)
    const base64Regex = /^data:image\/(png|jpeg|jpg|gif);base64,/;
    return base64Regex.test(base64String);
}

//Get All Company Info
export const getAllCompanyInfoHandler: EndpointHandler<EndpointAuthType> = async (
    req: EndpointRequestType[EndpointAuthType],
    res: Response
): Promise<void> => {

    try {

        const companyInfo = await CompanyInfo.findAll();

        if (companyInfo.length === 0) {
            res.status(404).json({ message: COMPANYINFO_NOT_FOUND });
            return;
        }

        res.status(200).json({ companyInfo: companyInfo  });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching companyInfo', data: error });
    }
};

// create Company Info
export const createCourseCategoryHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {
    const { user } = req;
    const { companyName, companyImg } = req.body;
 
    // Validate base64 image format
    if (!isValidBase64(companyImg)) {
        res.status(400).json({ message: 'Invalid base64 image format.' });
        return;
    }
 
    try {
        // Create the new course category with the base64 image string
        const newCompanyInfo = await CompanyInfo.create({
            companyName,
            companyImg, // Store base64 string directly in DB
        });
 
        // Log the action in the audit table
        await Audit.create({
            entityType: 'CompanyInfo',
            entityId: newCompanyInfo.id,
            action: 'CREATE',
            newData: newCompanyInfo,
            performedBy: user?.id,
        });
 
        // Respond with success
        res.status(201).json({ message: 'CompanyInfo created successfully', data: newCompanyInfo });
    } catch (error) {
        res.status(500).json({ message: COMPANYINFO_CREATION_ERROR, error });
    }
};

// Get companyInfo by ID
export const getCompanyInfoByIdHandler: EndpointHandler<EndpointAuthType> = async (
    req: EndpointRequestType[EndpointAuthType],
    res: Response
): Promise<void> => {

    const { id } = req.params;

    try {
        const companyInfo = await CompanyInfo.findByPk(id);

        if (!companyInfo) {
            res.status(404).json({ message: 'companyInfoId not found' })
            return;
        }
        res.status(200).json({ companyInfo });
    } catch (error) {
        res.status(500).json({ message: COMPANYINFO_GET_ERROR, data: error });
    }
};

//Update companyInfo
export const updateCompanyInfoHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { id } = req.params;
    const { user } = req;
    const { companyName, companyImg } = req.body;
    
    try {

        const updateCompanyInfo = await CompanyInfo.findByPk(id);

        if (!updateCompanyInfo) {
            res.status(404).json({ message: 'CompanyInfo not found' });
            return;
        }

        const previousData = {
            companyName: updateCompanyInfo.companyName,
            companyImg: updateCompanyInfo.companyImg   
          }

          updateCompanyInfo.set({
            companyName: companyName,
            companyImg: companyImg
        });

        await updateCompanyInfo.save();

        await Audit.create({
            entityType: 'CompanyInfo',
            entityId: updateCompanyInfo.id,
            action: 'UPDATE',
            OldData: previousData,
            newData: updateCompanyInfo,
            performedBy: user?.id
          });

        res.status(200).json({ message: 'CompanyInfo updated successfully', updateCompanyInfo });
    } catch (error) {
        res.status(500).json({ message: COMPANYINFO_UPDATE_ERROR, error });
    }
};


//Delete a companyInfo
export const deleteCompanyInfoHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { id } = req.params;
    const { user } = req;

    try {
        const deleteCompanyInfo = await CompanyInfo.findByPk(id);

        if (!deleteCompanyInfo) {
            res.status(404).json({ message: 'CompanyInfo not found' });
            return;
        }

        await Audit.create({ 
            entityType: 'CompanyInfo',
            entityId: deleteCompanyInfo.id,
            action: 'DELETE',
            oldData: deleteCompanyInfo, // Old data before deletion
            performedBy: user?.id
          });

        await deleteCompanyInfo.destroy();

        res.status(200).json({ message: 'CompanyInfo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: COMPANYINFO_DELETION_ERROR, error });
    }
};