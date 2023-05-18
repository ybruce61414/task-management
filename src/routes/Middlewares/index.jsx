import RedirectMiddleware from './RedirectMiddleware.jsx'

// eslint-disable-next-line react/display-name
export const MiddlewareHOC = (WrappedComponent, wrapperProps) => (ChildComponent, childProps = {}) => {
  return (
    <WrappedComponent {...wrapperProps}>
      <ChildComponent {...childProps} />
    </WrappedComponent>
  )
}

const Middlewares = { RedirectMiddleware }

export default Middlewares