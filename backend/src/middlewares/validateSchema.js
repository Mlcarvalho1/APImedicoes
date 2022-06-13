const Validate = (schema) => async (req, res, next) => {
  try {
    req.data = Object.keys(req.body).length ? await schema.body.validate(req.body) : null;
    req.filter = Object.keys(req.params).length ? await schema.params.validate(req.params) : null;
    req.filter = Object.keys(req.query).length ? {
      ...req.filter, ...await schema.query.validate(req.query),
    } : req.filter || null;
    next();
  } catch (e) {
    res.status(401).json({ e });
  }
};

export default Validate;
