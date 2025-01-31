import {
    EndpointAuthType,
    EndpointHandler,
    EndpointRequestType
  } from 'node-server-engine';
  import { BatchTrainee } from 'db';
  import { Response } from 'express';
  
  // Get batch IDs by trainee ID
  export const getBatchIdsByTraineeIdHandler: EndpointHandler<
    EndpointAuthType.JWT
  > = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
  ): Promise<void> => {
    try {
      // Log request params for debugging
      console.log('Request Params:', req.params);
  
      const { id } = req.params;
      console.log('Trainee ID:', id);
  
      // Validate trainee ID
      if (!id) {
        res.status(400).json({ message: 'Trainee ID is required' });
        return;
      }
  
      // Fetch all batch IDs for the given trainee ID
      const batchRecords = await BatchTrainee.findAll({
        where: { traineeId: id },
        attributes: ['batchId'] // Ensure only batchId is retrieved
      });
  
      // Log the retrieved records
      console.log('Batch Records:', batchRecords);
  
      // If no records are found
      if (!batchRecords || batchRecords.length === 0) {
        res.status(404).json({ message: 'No Batch IDs found for the given Trainee ID' });
        return;
      }
  
      // Extract batch IDs from the records, filtering out null values
   
      const batchIds = batchRecords.map(record => record.dataValues.batchId);


      // Log extracted batch IDs
      console.log('Extracted Batch IDs:', batchIds);
  
      // If all batch IDs are null
      if (batchIds.length === 0) {
        res.status(404).json({ message: 'No valid Batch IDs found for the given Trainee ID' });
        return;
      }
  
      // Return the list of batch IDs
      res.status(200).json({ batchIds });
    } catch (error) {
      console.error('Error fetching batch IDs:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  