import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { Route, Switch} from 'react-router';

import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';
import FacilityPage from './pages/FacilityPage/FacilityPage';
import { ROUTE_FACILITY_URL } from './common/constants';
import { FacilityProvider } from './contexts/FacilityContext';

function App() {
  return (
    <Router>
        <FacilityProvider>
          <Header></Header>
          <Switch>
            <Route path={ROUTE_FACILITY_URL}>
              <FacilityPage></FacilityPage>
            </Route>
            <Route path="/">
              <FacilityPage></FacilityPage>
            </Route>
          </Switch>
          <Footer></Footer>
        </FacilityProvider>
    </Router>
  );
}

export default App;
