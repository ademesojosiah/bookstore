const Joi = require("joi");

const bookValidator = Joi.object({
  title: Joi.string().min(5).max(255).required().trim(),
  shortDescription: Joi.string().min(5).max(500).optional().trim(),
  longDescription: Joi.string().min(10).optional().trim(),
  year: Joi.number().integer().required().min(2022),
  isbn: Joi.string().min(10).max(13).required(),
  price: Joi.number().min(0).required(),
  createdAt: Joi.date().default(Date.now),
  lastUpdatdAt: Joi.date().default(Date.now),
});

async function BookValidationMiddleware(req, res, next) {
  const bookPayload = req.body;
  try {
    await bookValidator.validateAsync(bookPayload);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

module.exports = BookValidationMiddleware;
