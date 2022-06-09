module.exports = (req, res, next) => {
  const { cookies } = req;
  if ('session_id' in cookies) {
    console.log('session id exixst');
    if (cookies.session_id === '123456') {
      next();
    } else {
      res.status(403).send({ message: 'Not autintificated' });
    }
  } else {
    res.status(403).send({ message: 'Not autintificated' });
  }
};
