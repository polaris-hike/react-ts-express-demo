import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Switch,Route,Redirect} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from './store';
import {ConfigProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import './assets/style/common.less';
import {ConnectedRouter} from 'connected-react-router';
import history from '@/history';
import Home from '@/routes/Home';
import Mine from '@/routes/Mine';
import Profile from '@/routes/Profile';
import Tabs from "@/components/Tabs";
import Login from "@/routes/Login";
import Register from "@/routes/Register";
import Detail from "@/routes/Detail";
import Cart from "@/routes/Cart";

ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
      <ConfigProvider locale={zh_CN}>
        <main className="main-container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/mine" exact component={Mine} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/detail/:id" exact component={Detail} />
            <Route path="/cart" exact component={Cart} />
          </Switch>
        </main>
        <Tabs />
      </ConfigProvider>
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));
