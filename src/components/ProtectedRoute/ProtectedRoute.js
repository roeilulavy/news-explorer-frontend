import { Navigate } from "react-router-dom"

export function ProtectedRoute({ isLoggedIn, component: Component, ...props }) {
  return (
    <>
      {
        isLoggedIn ? <Component {...props} isLoggedIn={isLoggedIn} /> : <Navigate to='/' />
      }
    </>
  )
}
