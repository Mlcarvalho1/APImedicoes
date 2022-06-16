import multer from 'multer';
import multerConfig from '../config/multer';
import FotoService from '../services/FotoService';
import BaseController from './BaseController';

const upload = multer(multerConfig).single('foto');

class FotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      try {
        if (error) {
          return res.status(400).json({
            errors: [error.code],
          });
        }

        const { patient_id } = req.body;

        const profilepic = await FotoService.storeFoto(req.file, patient_id, req.userId);

        return res.json(profilepic);
      } catch (e) {
        return BaseController.handleError(res, e);
      }
    });
  }
}

export default new FotoController();
