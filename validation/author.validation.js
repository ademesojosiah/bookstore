const Joi = require("joi");

const addAuthorValidator = Joi.object({
  firstname: Joi.string().max(255).required().trim(),
  lastname: Joi.string().max(255).required().trim(),
  dob: Joi.date().greater("1-01-1990").less("1-1-2020").required(),
  country: Joi.string().optional().trim(),
  books: Joi.array().items(Joi.string()),
  createdAt: Joi.date().default(Date.now),
  lastUpdatdAt: Joi.date().default(Date.now),
});

const updateAuthorValidator = Joi.object({
    firstname: Joi.string().max(255).trim(),
    lastname: Joi.string().max(255).trim(),
    dob: Joi.date().min(1900).max(2023),
    country: Joi.string().trim(),
    books: Joi.array().items(Joi.string()),
  })

async function addAuthorValidationMiddleware(req, res, next) {
  const authorPayload = req.body;
  try {
    await addAuthorValidator.validateAsync(authorPayload);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

async function updateAuthorValidationMiddleware(req, res, next) {
    const authorPayload = req.body;
    try {
      await updateAuthorValidator.validateAsync(authorPayload);
      next();
    } catch (error) {
      next({
        message: error.details[0].message,
        status: 400,
      });
    }
  }

module.exports = {addAuthorValidationMiddleware, updateAuthorValidationMiddleware};
