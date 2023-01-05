const Joi = require("joi");

const addBookValidator = Joi.object({
  title: Joi.string().min(5).max(255).required().trim(),
  shortDescription: Joi.string().min(5).max(500).optional().trim(),
  longDescription: Joi.string().min(10).optional().trim(),
  year: Joi.number().integer().required().max(2022),
  isbn: Joi.string().min(10).max(13).required(),
  price: Joi.number().min(0).required(),
  createdAt: Joi.date().default(Date.now),
  lastUpdatdAt: Joi.date().default(Date.now),
});

const updateBookValidator = Joi.object({
    title: Joi.string().min(5).max(255).optional().trim(),
    shortDescription: Joi.string().min(5).max(500).optional().trim(),
    longDescription: Joi.string().min(10).optional().trim(),
    year: Joi.number().integer().optional().max(2022),
    isbn: Joi.string().min(10).max(13).required(),
    price: Joi.number().min(0).optional(),
    createdAt: Joi.date().default(Date.now),
    lastUpdatdAt: Joi.date().default(Date.now),
  })

async function addBookValidationMiddleware(req, res, next) {
  const bookPayload = req.body;
  try {
    await addBookValidator.validateAsync(bookPayload);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

async function updateBookValidationMiddleware(req, res, next) {
    const bookPayload = req.body;
    try {
      await updateBookValidator.validateAsync(bookPayload);
      next();
    } catch (error) {
      next({
        message: error.details[0].message,
        status: 400,
      });
    }
  }

module.exports = {addBookValidationMiddleware, updateBookValidationMiddleware};
