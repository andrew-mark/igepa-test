import velocity from 'velocity-animate'

export default (ctx, inject) => {
  ctx.$velocity = velocity
  inject('velocity', velocity)
}
