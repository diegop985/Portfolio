import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../UI/components/CheckingAuth';

export const AppRouter = () => {
  const status = useCheckAuth();

  if ( status === 'checking' ) {
    return <CheckingAuth/>;
  }

  return (
    <Routes>

    {
      ( status === 'authenticated' )
        ? <Route path='/*' element={ <JournalRoutes/> } />
        : <Route path='/auth/*' element={ <AuthRoutes/> } />
    }

    <Route path='/*' element={ <Navigate to="/auth/login"/> } />

    { /* Login y Regis */ }
    { /* <Route path='/auth/*' element={ <AuthRoutes/> } /> */ }

    { /* App */ }
    { /* <Route path='/*' element={ <JournalRoutes/> } /> */ }

    </Routes>

  );
};
