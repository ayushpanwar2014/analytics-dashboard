export const validate = (schema) => async (req, res, next) => {
  try {

    // Combine body + file into one object
    const dataToValidate = {
      ...req.body,
      ...(req.file && { image: req.file }),
    };

    // Run Zod validation
    const parsedData = await schema.parseAsync(dataToValidate);

    req.body = parsedData;
    next();
  } catch (err) {
    const status = 422;

    console.log(err);
    
    const message = err.errors?.[0]?.message || 'Validation error';

    next({ status, message });
  }
};
