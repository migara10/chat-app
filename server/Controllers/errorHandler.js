const handleError = (error, res) => {
  const code = error.code;
  const keyPattern = error.keyPattern;
  if (code && keyPattern.name === 1 && code === 11000) {
    return res.status(400).json({
      message: "Name is already exists.",
    });
  } else if (code && keyPattern.email === 1 && code === 11000) {
    return res.status(400).json({
      message: "Email is already exists.",
    });
  } else if (error.message.includes("User validation failed")) {
    let errors = ""
    Object.values(error.errors).forEach(properties => {
        errors = properties.message
    })
    return res.status(400).json({
      message: errors,
    });
  }
  console.log(error)
  return res.status(500).json({ message: "Internal Server Error" });
};

export default handleError;