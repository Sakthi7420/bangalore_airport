import multer from 'multer';

// Multer storage configuration for in-memory storage (for binary data)
const storage = multer.memoryStorage();  // Use memory storage to handle image data in memory

// Set up file size limit and file filter (optional)
const fileFilter = (req: any, file: any, cb: any) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(file.originalname.toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(new Error('Only image files are allowed'), false);
  }
};

// Multer instance to handle the image upload
    const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 3 * 1024 * 1024 },  // Limit file size to 3MB
  });
  

  export default upload;