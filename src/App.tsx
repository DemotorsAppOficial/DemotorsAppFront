import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ECommerce from './pages/Dashboard/ECommerce';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import DefaultLayout from './layout/DefaultLayout';
import GeneralDataForm from './pages/ServiceOrder/GeneralData/GeneralDataForm';
import GeneralDataReportClient from './pages/reportClients/GeneralData/GeneralDataTable'
import EmployeeType from './pages/Personal/EmployeeType/EmployeeType';
import SurveyQuestion from './pages/Configuration/SurveyQuestion/SurveyQuestion';
import Service from './pages/Configuration/Services/Services';
import SearchOrder from './pages/ServiceOrder/SearchOrder/SearchOrder';
import NavBarLayout from './layout/NavBarLayout ';
import SignIn from './pages/Authentication/SignIn';
import NotFoundComponent from './components/NotFound/NotFoundComponent';
import ImageType from './pages/Configuration/ImageType/ImageType';
import GeneralDataTableServicesOrder from './pages/reportClients/reportServicesOrder/GeneralDataTableServicesOrder';
import GeneralData from './pages/newServicesOrder/GeneralData';
import CustomerForm from './pages/ServiceOrder/GeneralData/CustomerForm';
import EquipamentForm from './pages/ServiceOrder/GeneralData/EquipmentForm';
import ServicesOrderUploadImage from './pages/newServicesOrder/servicesOrderUploadImage';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>

      <Route element={<NavBarLayout />}>
        {/* Redirige la ruta raíz a /auth/login */}
        <Route path="/" element={<Navigate to="/auth/login" />} />

        <Route
          path="/auth/login"
          element={
            <>
              <PageTitle title="Login" />
              <SignIn />
            </>
          }
        />
      </Route>

      {/* Rutas que SÍ están envueltas en DefaultLayout */}
      <Route element={<DefaultLayout />}>
        <Route
          element={
            <>
              <PageTitle title="DEMOTORS APP" />
              <ECommerce />
            </>
          }
        />

        <Route
          path="/profile"

          element={
            <>
              <PageTitle title="Profile | fasf - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/service-order/formulario-ingreso"
          element={
            <>
              <PageTitle title="Orden de Servicio" />
              <GeneralDataForm />
            </>
          }
        />
        <Route 
          path='/services-order/general'
          element={
            <>
              <PageTitle title='Orden de Servicio' />
              <GeneralData />
            </>
          }
        />
        <Route
          path="/service-order/search-order"
          element={
            <>
              <PageTitle title="Búsqueda de Orden" />
              <SearchOrder />
            </>
          }
        />
        <Route
          path='/service-order/cliente/:servicesOrder'
          element={
            <>
              <PageTitle title='Orden de Servicio | Cliente' />
              <CustomerForm />
            </>
          }
        />
        <Route
          path='/service-order/equipo/:servicesOrder'
          element={
            <>
              <PageTitle title='Orden de Servicio | Cliente' />
              <EquipamentForm />
            </>
          }
        />
        <Route
          path='/service-order/imagen/:servicesOrder'
          element={
            <>
              <PageTitle title='Subida de Imagenes' />
              <ServicesOrderUploadImage />
            </>
          }
        />
        <Route
          path='/clientes'
          element={
            <>
              <PageTitle title='Reporte de clientes' />
              <GeneralDataReportClient />
            </>
          }
        />
        <Route
          path='/reporte-ordenes-servicios'
          element={
            <>
              <PageTitle title='Reporte de ordenes de servicios' />
              <GeneralDataTableServicesOrder />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/personal/employee-type"
          element={
            <>
              <PageTitle title="Tipo de Empleado" />
              <EmployeeType />
            </>
          }
        />
        <Route
          path="/configuracion/survey-question"
          element={
            <>
              <PageTitle title="Preguntas de Encuesta" />
              <SurveyQuestion />
            </>
          }
        />
        <Route
          path="/configuracion/services"
          element={
            <>
              <PageTitle title="Servicios" />
              <Service />
            </>
          }
        />

        <Route
          path="/configuracion/image-type"
          element={
            <>
              <PageTitle title="Tipo de Imágenes" />
              <ImageType />
            </>
          }
        />

      </Route>
      <Route element={<NavBarLayout />}>
        {/* Redirige la ruta raíz a /auth/login */}

        <Route
          path="*"
          element={
            <>
              <PageTitle title="Error 404" />
              <NotFoundComponent />
            </>
          }
        />
      </Route>

    </Routes>
  );
}

export default App;
