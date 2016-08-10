const checkAuth = function(req, res, next){
  if(!req.user) {
    res.status(400).send( 'no authenticated user for current session' )
  }
  else next()
}

const errorHandler = function(err, req, res, next) {
  console.log(err)
  res.render(err);
  return
} 

const cookifyUser = function(req,res,next) {
  if (req.user) {
    res.cookie(global.PROJECT_NAME + '_user',JSON.stringify(req.user))
    res.cookie('tiy_full_stack_app_name', global.PROJECT_NAME)
    next()
  }
  else {
    console.log('no user')
    res.cookie(global.PROJECT_NAME + '_user','null')
    res.cookie('tiy_full_stack_app_name', global.PROJECT_NAME)
    next()
  }
}

const cookifyEnv = function(req,res,next) {
  if (process.env.NODE_ENV === 'development') {
    res.cookie(global.PROJECT_NAME + '_ENV','dev')
  }
  else {
    res.cookie(global.PROJECT_NAME + '_ENV','prod')
  }
  next()
}

module.exports = {
  checkAuth: checkAuth,
  errorHandler: errorHandler,
  cookifyUser: cookifyUser,
  cookifyEnv: cookifyEnv
}