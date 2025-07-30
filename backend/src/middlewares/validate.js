export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(
      {
        ...req.body,
        ...req.params,
        ...req.query,
      },
      { abortEarly: false }
    );

    if (error) {
      // Collect all validation errors
      const errors = error.details.map((ele) => ({
        message: ele.message,
        field: ele.path[0],
      }));

      // Send a single response with all errors
      return res.status(400).json({ errors });
    }

    // Proceed if no validation errors
    next();
  };
};
